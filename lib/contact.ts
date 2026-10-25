import { createHmac, randomBytes } from "node:crypto";
import { person } from "./content";

export function contactConfigured() {
  return Boolean(gmailCredentials().user && gmailCredentials().pass);
}

export function gmailCredentials() {
  return {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  };
}

const localSecret = randomBytes(32).toString("hex");
const localLimits = new Map<string, { count: number; expires: number }>();

// Redis provides a shared limit across serverless instances. Without Redis,
// apply a best-effort instance-local limit rather than disable Gmail delivery.
export async function allowContact(ip: string): Promise<boolean> {
  const identifier = createHmac(
    "sha256",
    process.env.CONTACT_RATE_LIMIT_SECRET || localSecret,
  )
    .update(ip)
    .digest("hex");
  const redisSettings = [
    process.env.UPSTASH_REDIS_REST_URL,
    process.env.UPSTASH_REDIS_REST_TOKEN,
    process.env.CONTACT_RATE_LIMIT_SECRET,
  ];
  if (!redisSettings.some(Boolean)) {
    const now = Date.now();
    for (const [key, bucket] of localLimits)
      if (bucket.expires <= now) localLimits.delete(key);
    let bucket = localLimits.get(identifier);
    if (!bucket) {
      if (localLimits.size >= 1000) return false;
      bucket = { count: 0, expires: now + 600000 };
      localLimits.set(identifier, bucket);
    }
    return ++bucket.count <= 5;
  }
  if (!redisSettings.every(Boolean))
    throw new Error("Incomplete rate limit configuration");
  const script =
    "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 600) end; return n";
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      script,
      "1",
      `portfolio:contact:${identifier}`,
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok || result.error || typeof result.result !== "number")
    throw new Error("Rate limit service unavailable");
  return result.result <= 5;
}

export const contactDestination = person.email;
