"use client";

import { useEffect, useRef } from "react";

const ENTRIES = [
  {
    side: "left" as const,
    date: "Oct 2024 \u2014 Present",
    role: "Software Engineer",
    company: "Digital Dividend Global",
    location: "Karachi, Pakistan",
    gold: false,
    bullets: [
      "Owned ASP.NET Core Microservices system for Saudi EdTech platform serving 3,400+ learners",
      "Architected Modular Monolith .NET Core with full Azure infrastructure for UK security operations",
      "Integrated Stripe payments, event-driven messaging (RabbitMQ), distributed caching (Redis)",
      "Optimized SQL Server queries \u2014 achieved 60% load time reduction",
      "Delivered SME investment portal from zero in under 1 month",
    ],
  },
  {
    side: "right" as const,
    date: "Jun 2023 \u2014 Sep 2024",
    role: "Associate Software Engineer",
    company: "GentecSoft",
    location: "Karachi, Pakistan",
    gold: false,
    bullets: [
      "Led legacy desktop ERP migration to .NET Core web application",
      "Built real-time logistics tracking system with .NET Core + Angular",
      "Delivered zero-data-loss cutover for 300+ active clients",
      "Maintained documentation and followed Agile SDLC practices",
    ],
  },
  {
    side: "left" as const,
    date: "2020 \u2014 2024",
    role: "BS Computer Science",
    company: "Hamdard University",
    location: "Karachi, Pakistan",
    gold: true,
    bullets: [
      "Final Year Project: KidzSearch \u2014 AI-powered missing child recovery platform",
      "Focus: Software Engineering, Data Structures, Algorithms, Database Systems",
    ],
  },
];

export default function Experience() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;
    const onScroll = () => {
      const rect = spine.parentElement!.getBoundingClientRect();
      const top = Math.max(0, -rect.top);
      const height = rect.height;
      const pct = Math.min(100, (top / height) * 100);
      spine.style.setProperty("--mask", `${100 - pct}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="head-wrap">
          <div className="label">06 &mdash; EXPERIENCE</div>
          <h2>The <em>Journey</em></h2>
        </div>
        <div className="tl">
          <div className="tl-spine" ref={spineRef} />
          {ENTRIES.map((entry, i) => (
            <div key={i} className={`tl-entry ${entry.side}`}>
              <div className={`node ${entry.gold ? "gold" : ""}`} />
              <div className="card">
                <div className="date">{entry.date}</div>
                <div className="role">{entry.role}</div>
                <div className="co">{entry.company}</div>
                <div className="loc">{entry.location}</div>
                <ul>
                  {entry.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
