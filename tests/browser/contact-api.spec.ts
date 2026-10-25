import { test, expect } from "@playwright/test";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import { POST } from "../../app/api/contact/route";

test("contact endpoint rejects abuse and handles provider failures and acceptance", async () => {
  const originalFetch = global.fetch;
  const originalTransport = nodemailer.createTransport;
  const keys = [
    "SMTP_USER",
    "SMTP_PASS",
    "EMAIL_USER",
    "EMAIL_PASS",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "CONTACT_RATE_LIMIT_SECRET",
  ];
  const previous = Object.fromEntries(
    keys.map((key) => [key, process.env[key]]),
  );
  const valid = {
    name: "Test Person",
    email: "test@example.com",
    subject: "Project discussion",
    message: "This is a test enquiry, not a real email.",
    website: "",
    startedAt: Date.now() - 5000,
  };
  function request(body: unknown, origin = "https://asghar.me") {
    return new NextRequest("https://asghar.me/api/contact", {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  try {
    expect(
      (await POST(request(valid, "https://untrusted.example"))).status,
    ).toBe(403);
    expect((await POST(request({ ...valid, email: "invalid" }))).status).toBe(
      400,
    );
    expect(
      (
        await POST(
          request({ ...valid, subject: "injected\r\nBcc: bad@example.com" }),
        )
      ).status,
    ).toBe(400);
    expect(
      (await POST(request({ ...valid, message: "x".repeat(17000) }))).status,
    ).toBe(413);
    expect((await POST(request({ ...valid, website: "spam" }))).status).toBe(
      400,
    );
    expect(
      (await POST(request({ ...valid, startedAt: Date.now() }))).status,
    ).toBe(400);
    for (const key of keys) delete process.env[key];
    expect((await POST(request(valid))).status).toBe(503);
    for (const key of keys) process.env[key] = "test-only-not-a-real-secret";
    process.env.UPSTASH_REDIS_REST_URL = "https://rate-limit.example";
    global.fetch = async () => Response.json({ result: 6 });
    const limited = await POST(request(valid));
    expect(limited.status).toBe(429);
    expect(limited.headers.get("Retry-After")).toBe("600");
    global.fetch = async () => {
      throw new Error("provider failure");
    };
    expect((await POST(request(valid))).status).toBe(503);
    global.fetch = async () => Response.json({ result: 1 });
    nodemailer.createTransport = (() => ({
      sendMail: async () => ({ accepted: [] }),
    })) as unknown as typeof nodemailer.createTransport;
    expect((await POST(request(valid))).status).toBe(502);
    nodemailer.createTransport = (() => ({
      sendMail: async () => {
        throw new Error("SMTP authentication failed");
      },
    })) as unknown as typeof nodemailer.createTransport;
    expect((await POST(request(valid))).status).toBe(503);
    let sent = false;
    nodemailer.createTransport = ((options: unknown) => {
      expect(options).toMatchObject({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
      });
      return {
        sendMail: async (payload: Record<string, unknown>) => {
          expect(payload.to).toBe("aasghar5445@gmail.com");
          expect(payload.replyTo).toBe(valid.email);
          expect(payload.from).toMatchObject({
            address: process.env.SMTP_USER,
          });
          expect(payload.text).toContain(valid.message);
          expect(payload).not.toHaveProperty("html");
          sent = true;
          return { accepted: ["aasghar5445@gmail.com"] };
        },
      };
    }) as unknown as typeof nodemailer.createTransport;
    const accepted = await POST(request(valid));
    expect(accepted.status).toBe(200);
    expect((await accepted.json()).ok).toBe(true);
    expect(sent).toBe(true);
    // Existing EMAIL_* deployments work without adding another email provider.
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.CONTACT_RATE_LIMIT_SECRET;
    nodemailer.createTransport = ((options: unknown) => {
      expect(options).toMatchObject({
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      return {
        sendMail: async () => ({ accepted: ["aasghar5445@gmail.com"] }),
      };
    }) as unknown as typeof nodemailer.createTransport;
    for (let attempt = 0; attempt < 5; attempt++)
      expect((await POST(request(valid))).status).toBe(200);
    expect((await POST(request(valid))).status).toBe(429);
  } finally {
    global.fetch = originalFetch;
    nodemailer.createTransport = originalTransport;
    for (const key of keys)
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
  }
});
