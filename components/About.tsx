"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BIO =
  "I'm a tech-adaptive engineer who thrives in complexity — whether it's architecting microservices for enterprise platforms, shipping a full SaaS product solo, or integrating payment systems under tight deadlines. I've built systems serving thousands across Saudi Arabia, the UK, and Pakistan, working across .NET Core, Spring Boot, Node.js, and React. I care deeply about clean architecture, scalable design, and code that outlives the sprint it was written in.";

const STATS = [
  { n: 3, suffix: "+", label: "Years Building", extra: "Production work since 2023", flagship: false },
  { n: 10, suffix: "+", label: "Projects Shipped", extra: "KSA \u00B7 UK \u00B7 Pakistan", flagship: false },
  { n: 1, suffix: "", label: "Live SaaS Product", extra: "invo.pk \u2014 solo-built & generating revenue", flagship: true },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const ease = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(target * ease));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <div ref={ref} className="n">{val}{suffix}</div>;
}

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Word reveal on scroll
  const wordRevealRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = wordRevealRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLSpanElement>(".w");
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight * 0.7)));
      words.forEach((w, i) => {
        const wordProgress = (progress * words.length - i) / 1.5;
        w.style.opacity = String(Math.max(0.2, Math.min(1, wordProgress)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="bg-text" style={{ top: "10%", left: "-5%" }}>ABOUT</div>
        <div className="about-grid">
          <div style={{ position: "relative" }}>
            <div className="photo-blob" />
            <div className="photo-frame">
              <Image
                src="/ali-portrait.png"
                alt="Ali Asghar"
                fill
                sizes="(max-width: 980px) 340px, 420px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          <div className="about-text" ref={textRef}>
            <div className="kicker">
              <span className="eyebrow-violet">02 &mdash; ABOUT</span>
            </div>
            <h2>
              <span className="reveal-line"><span>Engineer by trade.</span></span>
              <span className="reveal-line"><span>Builder by instinct.</span></span>
            </h2>
            <div className="word-reveal" ref={wordRevealRef}>
              {BIO.split(" ").map((word, i) => (
                <span key={i} className="w">
                  {word}{" "}
                </span>
              ))}
            </div>
            <div className="stats-row">
              {STATS.map((s, i) => (
                <div key={i} className={`stat ${s.flagship ? "flagship" : ""}`}>
                  <CountUp target={s.n} suffix={s.suffix} />
                  <div className="l">{s.label}</div>
                  <div className="lx">{s.extra}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
