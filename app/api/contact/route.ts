import { NextRequest } from "next/server";
import { allowContact, contactConfigured } from "@/lib/contact";
import { sendContactMail } from "@/lib/contact-mail";
import { validateContact } from "@/lib/contact-validation";
export const runtime = "nodejs";

function reply(
  body: object,
  status: number,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function boundedBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 16000)
    throw new Error("too-large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  let size = 0;
  let value = "";
  const decoder = new TextDecoder();
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.length;
    if (size > 16000) {
      await reader.cancel();
      throw new Error("too-large");
    }
    value += decoder.decode(part.value, { stream: true });
  }
  return JSON.parse(value + decoder.decode());
}

export async function POST(request: NextRequest) {
  // Same-origin JSON only; do not permit an arbitrary Origin to relay email.
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin)
    return reply(
      { error: "Please send your message from the contact page." },
      403,
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "Expected a JSON request." }, 415);
  let body: Record<string, unknown>;
  try {
    body = await boundedBody(request);
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error && error.message === "too-large"
            ? "Your message is too large."
            : "Please check your message and try again.",
      },
      error instanceof Error && error.message === "too-large" ? 413 : 400,
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return reply({ error: "Please check your message." }, 400);
  const { fields, errors } = validateContact(body);
  if (Object.keys(errors).length)
    return reply(
      { error: "Please check the highlighted fields.", errors },
      400,
    );
  if (
    body.website ||
    typeof body.startedAt !== "number" ||
    Date.now() - body.startedAt < 2000 ||
    Date.now() - body.startedAt > 86400000
  )
    return reply({ error: "Please wait a moment, then try again." }, 400);
  if (!contactConfigured())
    return reply(
      {
        error:
          "The form is temporarily unavailable. Please email Ali directly.",
      },
      503,
    );
  try {
    // Vercel overwrites this header. Outside Vercel use a shared bucket, rather than trusting spoofable proxy headers.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "self-hosted-shared";
    if (!(await allowContact(ip)))
      return reply(
        {
          error:
            "Too many messages. Please try again in 10 minutes or email Ali directly.",
        },
        429,
        { "Retry-After": "600" },
      );
    if (!(await sendContactMail(fields)))
      return reply(
        {
          error:
            "Your message could not be sent. Please try again or email Ali directly.",
        },
        502,
      );
    return reply(
      {
        ok: true,
        message:
          "Your message has been accepted for delivery. Thank you for getting in touch.",
      },
      200,
    );
  } catch {
    // Do not log message content, email addresses, tokens, or provider payloads.
    return reply(
      {
        error:
          "The delivery service is unavailable. Please email Ali directly.",
      },
      503,
    );
  }
}
