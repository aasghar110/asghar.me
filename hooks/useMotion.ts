"use client";

import { useEffect } from "react";

/**
 * Premium scroll & interaction animation layer.
 * - IntersectionObserver entrance reveals (staggered)
 * - rAF parallax on bg-text & project numbers
 * - Magnetic micro-interactions on controls
 * - Mockup 3D tilt on hover
 * - Respects prefers-reduced-motion + skips on mobile
 */
export function useMotion() {
  useEffect(() => {
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = matchMedia("(max-width: 760px)").matches;
    const hasFinePointer =
      matchMedia("(hover: hover) and (pointer: fine)").matches && !isMobile;

    const $$ = (s: string, c: ParentNode = document) =>
      Array.from(c.querySelectorAll<HTMLElement>(s));

    // IntersectionObserver reveals
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    function tag(el: HTMLElement | null, mode: string, delayMs = 0) {
      if (!el || el.dataset.anim) return;
      el.dataset.anim = mode;
      if (delayMs) el.style.transitionDelay = `${delayMs}ms`;
      io.observe(el);
    }

    function stagger(els: HTMLElement[], mode: string, step = 70, base = 0) {
      els.forEach((el, i) => tag(el, mode, base + i * step));
    }

    // Word-split for section h2s
    function splitHeading(h2: HTMLElement) {
      if (!h2 || h2.dataset.split === "1") return;
      h2.dataset.split = "1";
      const out = document.createDocumentFragment();
      h2.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = (node.textContent || "").split(/(\s+)/);
          words.forEach((w) => {
            if (!w.trim()) {
              out.appendChild(document.createTextNode(w));
              return;
            }
            const span = document.createElement("span");
            span.className = "head-word";
            const inner = document.createElement("i");
            inner.textContent = w;
            span.appendChild(inner);
            out.appendChild(span);
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const clone = (node as HTMLElement).cloneNode(false) as HTMLElement;
          const text = (node as HTMLElement).textContent || "";
          text.split(/(\s+)/).forEach((w) => {
            if (!w.trim()) {
              clone.appendChild(document.createTextNode(w));
              return;
            }
            const span = document.createElement("span");
            span.className = "head-word";
            const inner = document.createElement("i");
            inner.textContent = w;
            span.appendChild(inner);
            clone.appendChild(span);
          });
          out.appendChild(clone);
        }
      });
      h2.innerHTML = "";
      h2.appendChild(out);

      const words = $$(".head-word", h2);
      const onIn = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              words.forEach((w, i) => {
                setTimeout(() => w.classList.add("in"), i * 55);
              });
              onIn.unobserve(e.target);
            }
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
      );
      onIn.observe(h2);
    }

    // Parallax
    const pItems: { el: HTMLElement; speed: number; _centerY: number; _init: boolean; _sample: number }[] = [];
    let rafId: number | null = null;

    function parallaxTick() {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      for (const p of pItems) {
        p._sample = (p._sample || 0) + 1;
        if (p._sample % 8 === 0 || !p._init) {
          const rect = p.el.getBoundingClientRect();
          p._centerY = rect.top + sy + rect.height / 2;
          p._init = true;
        }
        const offset = ((sy + vh / 2) - p._centerY) * p.speed;
        p.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
      rafId = requestAnimationFrame(parallaxTick);
    }

    function registerParallax() {
      if (isMobile) return;
      $$(".bg-text").forEach((el) => {
        el.classList.add("parallax-y");
        pItems.push({ el, speed: -0.12, _centerY: 0, _init: false, _sample: 0 });
      });
      $$(".project .pnum").forEach((el) => {
        el.classList.add("parallax-y");
        pItems.push({ el, speed: -0.18, _centerY: 0, _init: false, _sample: 0 });
      });
      if (pItems.length) rafId = requestAnimationFrame(parallaxTick);
    }

    // Magnetic
    function magnetize(el: HTMLElement, strength = 0.32) {
      let tx = 0, ty = 0, cx = 0, cy = 0;
      let raf: number | null = null;
      const animate = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`;
        if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
          raf = requestAnimationFrame(animate);
        } else {
          el.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
          raf = null;
        }
      };
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * strength;
        ty = (e.clientY - (r.top + r.height / 2)) * strength;
        if (!raf) raf = requestAnimationFrame(animate);
      };
      const onLeave = () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(animate);
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }

    function registerMagnetic() {
      if (!hasFinePointer) return;
      $$(".cta, .nav-pill, .theme-toggle, .scroll-top, .copy-btn").forEach((el) => {
        el.classList.add("magnetic");
        magnetize(el, 0.32);
      });
      $$(".footer .icons a, .nav-overlay .lk").forEach((el) => magnetize(el, 0.22));
    }

    // Mockup 3D tilt
    function registerMockTilt() {
      if (!hasFinePointer) return;
      $$(".mock-wrap").forEach((el) => {
        let tx = 0, ty = 0, cx = 0, cy = 0;
        let raf: number | null = null;
        let hovering = false;
        const lerp = () => {
          cx += (tx - cx) * 0.1;
          cy += (ty - cy) * 0.1;
          const lift = hovering ? -6 : 0;
          el.style.transform = `translateY(${lift}px) perspective(1100px) rotateX(${(-cy).toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
          if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
            raf = requestAnimationFrame(lerp);
          } else {
            if (!hovering) el.style.transform = "";
            raf = null;
          }
        };
        el.addEventListener("mouseenter", () => { hovering = true; });
        el.addEventListener("mousemove", (e: Event) => {
          const me = e as MouseEvent;
          const r = el.getBoundingClientRect();
          tx = ((me.clientX - (r.left + r.width / 2)) / r.width) * 8;
          ty = ((me.clientY - (r.top + r.height / 2)) / r.height) * 6;
          if (!raf) raf = requestAnimationFrame(lerp);
        });
        el.addEventListener("mouseleave", () => {
          hovering = false;
          tx = 0; ty = 0;
          if (!raf) raf = requestAnimationFrame(lerp);
        });
      });
    }

    // Setup all reveal targets
    function setup() {
      // Section heads
      $$(".head-wrap").forEach((hw) => {
        const kicker = hw.querySelector<HTMLElement>(".kicker, .label");
        const h2 = hw.querySelector<HTMLElement>("h2");
        const sub = hw.querySelector<HTMLElement>(".sub");
        if (kicker) tag(kicker, "up-sm", 0);
        if (h2) splitHeading(h2);
        if (sub) tag(sub, "up-sm", 280);
      });

      stagger($$(".stat"), "up", 100);
      stagger($$(".service-card:not(.clone)").slice(0, 6), "up", 80);
      stagger($$(".tech-grid .col"), "up-sm", 65);

      // Tech conveyor layers
      $$(".conveyor .tlayer").forEach((row, ri) => {
        const label = row.querySelector<HTMLElement>(".tlayer-label");
        const rail = row.querySelector<HTMLElement>(".tlayer-rail");
        if (label) tag(label, "left", ri * 80);
        if (rail) tag(rail, "fade", ri * 80 + 120);
      });
      tag(document.querySelector<HTMLElement>(".conveyor-readout"), "up", 480);

      // Projects
      $$(".project").forEach((proj) => {
        $$(".mock-wrap, .invo-stage, .dual-mocks", proj).forEach((m, i) =>
          tag(m, isMobile ? "up" : "blur", i * 100)
        );
        const info = proj.querySelector(".project-info");
        if (info) {
          Array.from(info.children).forEach((c, i) =>
            tag(c as HTMLElement, "up", i * 90)
          );
        }
        const tog = proj.querySelector<HTMLElement>(".invo-stage .ph-toggle");
        if (tog) tag(tog, "up-sm", 400);
      });

      // Timeline
      $$(".tl-entry").forEach((e) => {
        const side = e.classList.contains("left") ? "left" : "right";
        const card = e.querySelector<HTMLElement>(".card");
        if (card) tag(card, isMobile ? "up" : side);
      });

      // Contact
      stagger($$(".contact-grid form .field"), "up", 100);
      tag(document.querySelector<HTMLElement>(".contact-grid form .cta"), "up", 420);
      $$(".channels a").forEach((a, i) => tag(a, "left", i * 90));

      // Footer
      stagger($$(".footer > *"), "up-sm", 90);
      $$(".photo-blob").forEach((p) => tag(p, "scale"));
    }

    // Boot after React hydrates
    const t = setTimeout(() => {
      setup();
      registerParallax();
      registerMagnetic();
      registerMockTilt();
    }, 100);

    return () => {
      clearTimeout(t);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);
}
