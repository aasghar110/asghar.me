"use client";

import { useEffect, useRef, useCallback } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const label = useRef("");

  const onMove = useCallback((e: MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onClick = useCallback((e: MouseEvent) => {
    const r = document.createElement("div");
    r.className = "cursor-ripple";
    r.style.left = `${e.clientX}px`;
    r.style.top = `${e.clientY}px`;
    document.body.appendChild(r);
    r.addEventListener("animationend", () => r.remove());
  }, []);

  useEffect(() => {
    // Only on desktop with fine pointer
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-active");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.left = `${target.current.x}px`;
        dotRef.current.style.top = `${target.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Detect hover targets
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const ring = ringRef.current;
      if (!ring) return;

      if (
        el.closest("a, button, [role='button'], .cta, .nav-pill, .theme-toggle, .scroll-top, .pill, .copy-btn, .link-arrow, .service-card, .invo-stage .ph-toggle button")
      ) {
        ring.classList.add("hover");
        ring.classList.remove("text");
        const linkLabel = el.closest("a")?.getAttribute("data-cursor") || "View";
        ring.textContent = linkLabel;
        label.current = linkLabel;
      } else if (
        el.closest("p, h1, h2, h3, h4, span, li, .word-reveal, .about-text, .project-info")
      ) {
        ring.classList.add("text");
        ring.classList.remove("hover");
        ring.textContent = "";
        label.current = "";
      } else {
        ring.classList.remove("hover", "text");
        ring.textContent = "";
        label.current = "";
      }
    };

    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [onMove, onClick]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
