"use client";

import { useState, useEffect, useCallback } from "react";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "services", label: "Services", num: "02" },
  { id: "tech", label: "Tech", num: "03" },
  { id: "work", label: "Work", num: "04" },
  { id: "experience", label: "Experience", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  const goto = useCallback(
    (id: string) => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? (y / h) * 100 : 0);
      setShowTop(y > window.innerHeight);

      // Determine active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          setActive(sections[i].id);
          return;
        }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger pill */}
      <button
        className={`nav-pill ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <div className="lines" />
      </button>

      {/* Side section indicator */}
      <div className="nav-side">
        <span className="sec">
          {sections.find((s) => s.id === active)?.num || "00"} / {active.toUpperCase()}
        </span>
      </div>

      {/* Scroll progress */}
      <div className="scroll-track">
        <div className="fill" style={{ height: `${scrollPct}%` }} />
      </div>

      {/* Overlay */}
      <div className={`nav-overlay ${open ? "open" : ""}`}>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id} style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}>
              <span className="num">{s.num}</span>
              <button className="lk" onClick={() => goto(s.id)}>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Scroll to top */}
      <button
        className={`scroll-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
