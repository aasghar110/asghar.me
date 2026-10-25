"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const enabled = Boolean(id && /^G-[A-Z0-9]+$/.test(id));
const key = "asghar-analytics-consent";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio:consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio:consent", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export default function Analytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, snapshot, () => "pending");
  const [preferences, setPreferences] = useState(false);
  const [ready, setReady] = useState(false);
  function choose(value: "allowed" | "denied") {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Browsers may disable storage. */
    }
    if (id) window[`ga-disable-${id}`] = value !== "allowed";
    if (value === "denied") {
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (name.startsWith("_ga"))
          for (const domain of [
            "",
            location.hostname,
            `.${location.hostname}`,
            ".asghar.me",
          ])
            document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
    window.dispatchEvent(new Event("portfolio:consent"));
    setPreferences(false);
  }
  useEffect(() => {
    if (!enabled || !id) return;
    window[`ga-disable-${id}`] = consent !== "allowed";
    if (consent !== "allowed") return;
    window[`ga-disable-${id}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        // Google Tag's documented queue expects the arguments object rather than a plain array.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    let script = document.querySelector<HTMLScriptElement>(
      "script[data-portfolio-ga]",
    );
    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.dataset.portfolioGa = "true";
      window.gtag("js", new Date());
      window.gtag("config", id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      document.head.appendChild(script);
    }
    const loaded = () => {
      if (script) script.dataset.loaded = "true";
      setReady(true);
    };
    if (script.dataset.loaded) {
      queueMicrotask(loaded);
    } else script.addEventListener("load", loaded);
    return () => script?.removeEventListener("load", loaded);
  }, [consent]);
  useEffect(() => {
    if (!enabled || consent !== "allowed" || !ready) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: `${location.origin}${pathname}`,
      page_title: document.title,
    });
  }, [pathname, consent, ready]);
  useEffect(() => {
    if (!enabled || consent !== "allowed") return;
    const click = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-event]")
          : null;
      if (!target) return;
      const name = target.dataset.event;
      if (name === "view_project")
        window.gtag?.("event", name, { project_slug: target.dataset.project });
      if (name === "contact_click")
        window.gtag?.("event", name, {
          contact_channel: target.dataset.channel,
        });
    };
    const sent = () =>
      window.gtag?.("event", "contact_form_submit", {
        delivery_status: "accepted",
      });
    document.addEventListener("click", click);
    window.addEventListener("portfolio:contact-sent", sent);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("portfolio:contact-sent", sent);
    };
  }, [consent]);
  if (!enabled) return null;
  return (
    <>
      {(consent === null || preferences) && (
        <section className="consent-banner" aria-label="Analytics preferences">
          <h2>A small privacy choice.</h2>
          <p>
            May I use optional analytics to understand which pages are useful?
            Your contact message stays private.{" "}
            <Link prefetch={false} href="/privacy">
              Read more
            </Link>
          </p>
          <div className="consent-buttons">
            <button type="button" onClick={() => choose("denied")}>
              No thanks
            </button>
            <button type="button" onClick={() => choose("allowed")}>
              Allow analytics
            </button>
          </div>
        </section>
      )}
      <button
        type="button"
        className="cookie-preferences"
        onClick={() => setPreferences(true)}
      >
        Cookie preferences
      </button>
    </>
  );
}
