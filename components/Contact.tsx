"use client";

import { useState, useEffect, useRef } from "react";

const CHANNELS = [
  { kind: "Email", val: "aasghar5445@gmail.com", href: "mailto:aasghar5445@gmail.com", copyable: true },
  { kind: "LinkedIn", val: "in/asghar110", href: "https://linkedin.com/in/asghar110" },
  { kind: "GitHub", val: "aasghar110", href: "https://github.com/aasghar110" },
  { kind: "WhatsApp", val: "+92 345 6173681", href: "https://wa.me/923456173681" },
];

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
);
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
);
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
);

const ICONS: Record<string, () => React.JSX.Element> = {
  Email: MailIcon, LinkedIn: LinkedInIcon, GitHub: GitHubIcon, WhatsApp: WhatsAppIcon,
};

export default function Contact() {
  const [vals, setVals] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  // Listen for ask-project event
  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent).detail;
      setVals((p) => ({
        ...p,
        message: `Hi Ali, I'd like to know more about your "${name}" project.`,
      }));
      setTimeout(() => msgRef.current?.focus(), 100);
    };
    window.addEventListener("ask-project", handler);
    return () => window.removeEventListener("ask-project", handler);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vals.name || !vals.email || !vals.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aasghar5445@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="contact-stage" id="contact">
      <div className="contact-head">
        <h2>
          Let&apos;s build<br />
          <em>something extraordinary.</em>
        </h2>
        <p>
          Whether it&apos;s a product, a platform, or a wild idea &mdash; I&apos;m one message away.
        </p>
      </div>
      <div className="contact-grid">
        <form onSubmit={onSubmit}>
          {(["name", "email", "message"] as const).map((field) => (
            <div
              key={field}
              className={`field ${vals[field] ? "filled" : ""}`}
            >
              {field === "message" ? (
                <textarea
                  ref={msgRef}
                  value={vals.message}
                  onChange={(e) => setVals({ ...vals, message: e.target.value })}
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  value={vals[field]}
                  onChange={(e) => setVals({ ...vals, [field]: e.target.value })}
                />
              )}
              <label>
                {field === "name" ? "Your name" : field === "email" ? "Your email" : "Your message"}
              </label>
              <span className="underfill" />
            </div>
          ))}
          <button type="submit" className={`cta ${sent ? "sent" : ""}`}>
            {sent ? "Message sent \u2713" : "Send Message"}
          </button>
        </form>

        <div>
          <div className="channels">
            {CHANNELS.map((ch) => {
              const Icon = ICONS[ch.kind];
              return (
                <a key={ch.kind} href={ch.href} target="_blank" rel="noreferrer">
                  <span className="ic"><Icon /></span>
                  <div>
                    <span className="lab">{ch.kind}</span>
                    <span className="val">{ch.val}</span>
                  </div>
                  {ch.copyable && (
                    <button
                      className={`copy-btn ${copied ? "done" : ""}`}
                      onClick={(e) => { e.preventDefault(); copyEmail(); }}
                    >
                      {copied ? "\u2713 Copied" : "Copy"}
                    </button>
                  )}
                  <span className="arr"><ArrowIcon /></span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
