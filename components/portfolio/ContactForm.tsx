"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { person } from "@/lib/content";
import {
  limits,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact-validation";
import { Arrow } from "./Icons";
const empty = { name: "", email: "", subject: "", message: "" };
const subscribeHydration = () => () => {};
export default function ContactForm({ configured }: { configured: boolean }) {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const [fields, setFields] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const startedAt = useRef(0);
  const website = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    const result = validateContact(fields);
    setErrors(result.errors);
    setStatus(null);
    if (Object.keys(result.errors).length) {
      form.current
        ?.querySelector<HTMLElement>(
          `[name="${Object.keys(result.errors)[0]}"]`,
        )
        ?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.fields,
          startedAt: startedAt.current,
          website: website.current?.value || "",
        }),
        signal: AbortSignal.timeout(18000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(
          data.error ||
            "Your message could not be sent. Please email Ali directly.",
        );
      }
      setStatus({ type: "success", text: data.message });
      setFields(empty);
      startedAt.current = 0;
      window.dispatchEvent(new Event("portfolio:contact-sent"));
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error instanceof Error && error.name !== "TimeoutError"
            ? error.message
            : "Sending took too long. Please email Ali directly.",
      });
    } finally {
      setPending(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  return (
    <form
      ref={form}
      className="contact-form"
      onSubmit={submit}
      method="post"
      action="/api/contact"
      onFocus={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      noValidate
      aria-labelledby="form-heading"
      aria-busy={pending}
    >
      <h2 id="form-heading">A note is all it takes.</h2>
      <p className="form-intro">
        A little context helps start a useful conversation.
      </p>
      <noscript>
        <p className="form-status">
          Please <a href={`mailto:${person.email}`}>email me directly</a> to get
          in touch.
        </p>
      </noscript>
      {!configured && (
        <div className="form-status">
          The form is temporarily unavailable. Please{" "}
          <a href={`mailto:${person.email}`}>email me directly</a> to get in
          touch.
        </div>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          ref={website}
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {(Object.keys(empty) as (keyof ContactFields)[]).map((key) => (
        <div className="form-field" key={key}>
          <label htmlFor={`contact-${key}`}>
            {key === "name"
              ? "Your name"
              : key === "email"
                ? "Email address"
                : key === "subject"
                  ? "Subject"
                  : "Your message"}
          </label>
          {key === "message" ? (
            <textarea
              id={`contact-${key}`}
              name={key}
              value={fields[key]}
              onChange={(event) =>
                setFields({ ...fields, [key]: event.target.value })
              }
              maxLength={limits[key]}
              required
              rows={5}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              placeholder="Tell me a little about what you have in mind…"
            />
          ) : (
            <input
              id={`contact-${key}`}
              name={key}
              type={key === "email" ? "email" : "text"}
              autoComplete={
                key === "name" ? "name" : key === "email" ? "email" : "off"
              }
              value={fields[key]}
              onChange={(event) =>
                setFields({ ...fields, [key]: event.target.value })
              }
              maxLength={limits[key]}
              required
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              placeholder={
                key === "name"
                  ? "How should I address you?"
                  : key === "email"
                    ? "you@example.com"
                    : "What’s the conversation about?"
              }
            />
          )}
          {errors[key] && (
            <p className="form-error" id={`${key}-error`}>
              {errors[key]}
            </p>
          )}
        </div>
      ))}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={status ? `form-status ${status.type}` : undefined}
      >
        {status?.text}
      </div>
      <button
        className="button button-primary"
        type="submit"
        disabled={pending || !configured || !hydrated}
      >
        {pending ? "Sending your message…" : "Send message"}
        <Arrow diagonal />
      </button>
      <p className="form-privacy">
        Your details are used to respond to your enquiry.{" "}
        <Link prefetch={false} href="/privacy">
          Privacy & cookies
        </Link>
      </p>
    </form>
  );
}
