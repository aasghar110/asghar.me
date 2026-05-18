"use client";

import { useEffect, useRef, useState } from "react";

function ServiceIllo({ idx }: { idx: number }) {
  const illos = [
    // 01 Backend — stacked layers
    <svg key="0" viewBox="0 0 200 120" fill="none">
      <path d="M 20 30 H 180 M 20 60 H 180 M 20 90 H 180" stroke="#8B5CF6" strokeWidth="1.3"/>
      <circle cx="40" cy="30" r="3" fill="#8B5CF6"/><circle cx="100" cy="60" r="3" fill="#F5C542"/><circle cx="160" cy="90" r="3" fill="#8B5CF6"/>
      <path d="M 40 30 L 100 60 L 160 90" stroke="#F5C542" strokeWidth="1" strokeDasharray="2 3"/>
    </svg>,
    // 02 Full stack — bracket
    <svg key="1" viewBox="0 0 200 120" fill="none">
      <path d="M 50 20 Q 20 20 20 60 Q 20 100 50 100" stroke="#8B5CF6" strokeWidth="1.3"/>
      <path d="M 150 20 Q 180 20 180 60 Q 180 100 150 100" stroke="#8B5CF6" strokeWidth="1.3"/>
      <path d="M 70 50 L 90 70 L 130 30" stroke="#F5C542" strokeWidth="1.3"/>
    </svg>,
    // 03 Cloud — orbit
    <svg key="2" viewBox="0 0 200 120" fill="none">
      <ellipse cx="100" cy="60" rx="70" ry="25" stroke="#8B5CF6" strokeWidth="1.3"/>
      <ellipse cx="100" cy="60" rx="40" ry="50" stroke="#8B5CF6" strokeWidth="1" opacity="0.6"/>
      <circle cx="100" cy="60" r="6" fill="#F5C542"/>
    </svg>,
    // 04 SaaS — building blocks
    <svg key="3" viewBox="0 0 200 120" fill="none">
      <rect x="60" y="30" width="80" height="60" stroke="#8B5CF6" strokeWidth="1.3"/>
      <rect x="40" y="50" width="40" height="40" stroke="#8B5CF6" strokeWidth="1.3"/>
      <rect x="120" y="50" width="40" height="40" stroke="#F5C542" strokeWidth="1.3"/>
    </svg>,
    // 05 Microservices — nodes
    <svg key="4" viewBox="0 0 200 120" fill="none">
      <circle cx="50" cy="40" r="10" stroke="#8B5CF6" strokeWidth="1.3"/>
      <circle cx="150" cy="40" r="10" stroke="#8B5CF6" strokeWidth="1.3"/>
      <circle cx="100" cy="85" r="12" stroke="#F5C542" strokeWidth="1.3"/>
      <path d="M 60 45 L 92 80 M 140 45 L 108 80 M 60 40 L 140 40" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 3"/>
    </svg>,
    // 06 Database — cylinders
    <svg key="5" viewBox="0 0 200 120" fill="none">
      <ellipse cx="100" cy="30" rx="40" ry="10" stroke="#8B5CF6" strokeWidth="1.3"/>
      <line x1="60" y1="30" x2="60" y2="90" stroke="#8B5CF6" strokeWidth="1.3"/>
      <line x1="140" y1="30" x2="140" y2="90" stroke="#8B5CF6" strokeWidth="1.3"/>
      <ellipse cx="100" cy="60" rx="40" ry="10" stroke="#8B5CF6" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="100" cy="90" rx="40" ry="10" stroke="#F5C542" strokeWidth="1.3"/>
    </svg>,
  ];
  return illos[idx] || null;
}

const SERVICES = [
  { title: "Backend Systems", desc: ".NET Core, Spring Boot, Node.js \u2014 high-performance APIs that handle real load.", tags: ["C#", ".NET Core", "Spring Boot", "Node.js"], num: "01" },
  { title: "Full Stack Applications", desc: "React, Angular, Blazor \u2014 from database to pixel, end to end.", tags: ["React", "Angular", "Blazor", "TypeScript"], num: "02" },
  { title: "Cloud Architecture", desc: "Azure, AWS, Docker \u2014 infrastructure that scales with the business.", tags: ["Azure", "AWS", "Docker", "CI/CD"], num: "03" },
  { title: "SaaS Products", desc: "Multi-tenant, billing-ready, production-grade platforms built from zero.", tags: ["Multi-Tenant", "Stripe", "SaaS", "invo.pk"], num: "04" },
  { title: "Microservices & APIs", desc: "REST, gRPC, event-driven \u2014 systems that talk to each other cleanly.", tags: ["REST", "gRPC", "RabbitMQ", "Redis"], num: "05" },
  { title: "Database & Performance", desc: "SQL Server, PostgreSQL, Redis \u2014 optimized queries, smart caching.", tags: ["SQL Server", "PostgreSQL", "Redis", "EF Core"], num: "06" },
];

export default function Services() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 760);
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Rail-in effect on scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) rail.classList.add("rail-in"); },
      { threshold: 0.1 }
    );
    io.observe(rail);
    return () => io.disconnect();
  }, []);

  // Auto-scroll marquee (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let paused = false;
    const speed = 0.76; // ~46px/s at 60fps
    const cardW = 360 + 28; // card width + gap
    const total = SERVICES.length;
    const setWidth = total * cardW;

    let raf: number;
    const loop = () => {
      if (!paused) {
        x -= speed;
        if (Math.abs(x) >= setWidth) x += setWidth;
        track.style.transform = `translate3d(${x}px, 0, 0)`;

        // Update active card index
        const idx = Math.floor(Math.abs(x) / cardW) % total;
        setActiveIdx(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="section" id="services">
        <div className="wrap">
          <div className="head-wrap">
            <div className="label">03 &mdash; SERVICES</div>
            <h2>What I <em>Engineer</em></h2>
            <div className="sub">Capabilities I bring to every project.</div>
          </div>
          <div className="services-rail is-stack" ref={railRef}>
            <div className="services-stack">
              {SERVICES.map((s) => (
                <div key={s.num} className="service-card">
                  <div className="num">{s.num}</div>
                  <div className="illo"><ServiceIllo idx={SERVICES.indexOf(s)} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="tags">
                    {s.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const cards = [...SERVICES, ...SERVICES, ...SERVICES]; // triple for seamless loop

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="head-wrap">
          <div className="label">03 &mdash; SERVICES</div>
          <h2>What I <em>Engineer</em></h2>
          <div className="sub">Capabilities I bring to every project.</div>
        </div>
      </div>
      <div className="services-rail" ref={railRef}>
        <div className="rail-edge rail-edge-l" />
        <div className="rail-edge rail-edge-r" />
        <div className="services-viewport">
          <div className="services-track" ref={trackRef}>
            {cards.map((s, i) => (
              <div
                key={`${s.num}-${i}`}
                className={`service-card ${i >= SERVICES.length * 2 ? "clone" : ""}`}
              >
                <div className="num">{s.num}</div>
                <div className="illo"><ServiceIllo idx={i % SERVICES.length} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tags">
                  {s.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="services-progress">
          <div className="sp-meta">
            <span className="sp-num">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span className="sp-sep">/</span>
            <span className="sp-total">{String(SERVICES.length).padStart(2, "0")}</span>
          </div>
          <div className="sp-track">
            <div className="sp-rail" />
            {SERVICES.map((_, i) => {
              const pct = ((i + 0.5) / SERVICES.length) * 100;
              return (
                <div
                  key={i}
                  className={`sp-tick ${i < activeIdx ? "past" : ""} ${i === activeIdx ? "on" : ""}`}
                  style={{
                    left: `${pct}%`,
                    animationDelay: `${280 + i * 80}ms`,
                  }}
                />
              );
            })}
            <div
              className="sp-fill"
              style={{
                left: `${(activeIdx / SERVICES.length) * 100}%`,
                width: `${(1 / SERVICES.length) * 100}%`,
              }}
            />
          </div>
          <div className="sp-name">{SERVICES[activeIdx]?.title}</div>
        </div>
      </div>
    </section>
  );
}
