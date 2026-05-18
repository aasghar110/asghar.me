"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Scene from "./Scene";

const NAME = "ALI ASGHAR";
const TAGLINE = "I don\u2019t build pages. I engineer platforms.";
const ROLE = "Software Engineer \u2014 .NET / Spring Boot / Node.js / React / Cloud";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState("");
  const [showCaret, setShowCaret] = useState(false);

  // Pre-compute random offsets for SSR consistency
  const letterOffsets = useMemo(() => {
    const seed = 42;
    const mulberry32 = (s: number) => {
      return () => {
        s |= 0; s = s + 0x6D2B79F5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    };
    const rng = mulberry32(seed);
    return NAME.split("").map(() => ({
      tx: Math.round((rng() - 0.5) * 240),
      ty: Math.round((rng() - 0.5) * 180),
      rot: Math.round((rng() - 0.5) * 60),
    }));
  }, []);

  useEffect(() => {
    // Trigger letter animation after brief delay
    const t1 = setTimeout(() => setReady(true), 300);

    // Start typing after letters assemble
    const t2 = setTimeout(() => {
      setShowCaret(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(TAGLINE.slice(0, i));
        if (i >= TAGLINE.length) clearInterval(iv);
      }, 40);
      return () => clearInterval(iv);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <Scene />
      <div className={`hero-stack ${ready ? "ready" : ""}`}>
        <div className="kicker" style={{ marginBottom: 24, opacity: ready ? 1 : 0, transition: "opacity 0.6s 0.1s" }}>
          Software Engineer &middot; Karachi, Pakistan
        </div>
        <div className="hero-name">
          {NAME.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="gap" />
            ) : (
              <span
                key={i}
                className="ltr"
                style={{
                  ["--tx" as string]: `${letterOffsets[i].tx}px`,
                  ["--ty" as string]: `${letterOffsets[i].ty}px`,
                  ["--rot" as string]: `${letterOffsets[i].rot}deg`,
                  animation: ready
                    ? `letterIn 1.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s forwards`
                    : "none",
                }}
              >
                {ch}
              </span>
            )
          )}
        </div>
        <div className="hero-tagline">
          {typed}
          {showCaret && <span className="caret" />}
        </div>
        <div
          className="hero-line"
          style={{
            width: ready ? 100 : 0,
            transition: "width 0.6s 2.8s var(--ease-out-expo)",
          }}
        />
        <div className="hero-role">{ROLE}</div>
      </div>
      <div className="scroll-ind">
        <div className="mouse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
