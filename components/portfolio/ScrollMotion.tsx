"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".section-heading",
  ".featured-grid > .project-card",
  ".work-list > .project-card",
  ".related-grid > .project-card",
  ".about-preview-copy",
  ".experience-preview",
  ".strength-card",
  ".career-entry",
  ".biography-copy",
  ".principles > article",
  ".education-card",
  ".contact-cta",
  ".contact-details",
  ".contact-form",
  ".experience-end",
  ".case-body section",
  ".disclosure-note",
].join(",");

export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main");
    if (!main) return;
    const root = main;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let idle: number | undefined;
    let release = () => {};

    const reset = () => {
      generation++;
      clearTimeout(timeout);
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      release();
      release = () => {};
      delete root.dataset.scrollMotion;
    };

    async function initialize(version: number) {
      try {
        const { gsap } = await import("gsap");
        if (disposed || version !== generation || reducedMotion.matches) return;
        const context = gsap.context(() => {}, root);
        const active = new Map<HTMLElement, ReturnType<typeof gsap.to>>();
        const marked: HTMLElement[] = [];
        const mobile = matchMedia("(max-width: 799px)").matches;
        const duration = mobile ? 0.58 : 0.76;

        const finish = (element: HTMLElement) => {
          observer.unobserve(element);
          active.get(element)?.progress(1);
          element.dataset.scrollReveal = "complete";
          element.style.removeProperty("--scroll-reveal-distance");
        };
        const focus = (event: FocusEvent) => {
          if (!(event.target instanceof Element)) return;
          marked.forEach((element) => {
            if (element.contains(event.target as Element)) finish(element);
          });
        };

        const reveal = (element: HTMLElement) => {
          if (element.dataset.scrollReveal !== "armed") return;
          observer.unobserve(element);
          const group = element.parentElement;
          const grid = group?.matches(
            ".featured-grid,.work-list,.related-grid,.strength-grid",
          );
          const index = grid ? Array.from(group!.children).indexOf(element) : 0;
          const delay = mobile ? 0 : (index % 2) * 0.09;
          context.add(() => {
            const tween = gsap.to(element, {
              y: 0,
              opacity: 1,
              duration,
              delay,
              ease: "power2.out",
              onComplete: () => {
                element.dataset.scrollReveal = "complete";
                element.style.removeProperty("--scroll-reveal-distance");
                gsap.set(element, { clearProps: "opacity,transform" });
              },
            });
            active.set(element, tween);

            const illustration = element.querySelector(".systems-illustration");
            if (illustration) {
              const columns = illustration.querySelectorAll(".systems-column");
              const path = illustration.querySelector<SVGPathElement>(
                ".systems-wiring path",
              );
              const timeline = gsap.timeline({ delay: delay + 0.1 });
              timeline.fromTo(
                columns,
                { y: 8, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.1,
                  duration: 0.58,
                  ease: "power2.out",
                },
              );
              if (path) {
                const length = path.getTotalLength();
                timeline.fromTo(
                  path,
                  { strokeDasharray: length, strokeDashoffset: length },
                  {
                    strokeDashoffset: 0,
                    duration: 0.95,
                    ease: "power1.inOut",
                  },
                  0.1,
                );
              }
            }
          });
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target as HTMLElement);
            });
          },
          { threshold: 0.06, rootMargin: `0px 0px -${mobile ? 32 : 48}px 0px` },
        );

        release = () => {
          observer.disconnect();
          root.removeEventListener("focusin", focus);
          context.revert();
          marked.forEach((element) => {
            delete element.dataset.scrollReveal;
            element.style.removeProperty("--scroll-reveal-distance");
          });
        };

        // Batch all geometry reads before any writes. Offscreen tweens are created
        // only when needed, rather than forcing layout for every section on load.
        const candidates = Array.from(
          root.querySelectorAll<HTMLElement>(revealSelector),
        ).filter(
          (element) => element.getBoundingClientRect().top >= innerHeight - 32,
        );
        candidates.forEach((element) => {
          element.style.setProperty(
            "--scroll-reveal-distance",
            mobile ? "14px" : "24px",
          );
          element.dataset.scrollReveal = "armed";
          marked.push(element);
          observer.observe(element);
        });
        root.addEventListener("focusin", focus);
        root.dataset.scrollMotion = "gsap";

        // ScrollTrigger is unnecessary for mobile reveal animations. Load it only
        // for the two decorative desktop parallax elements.
        if (matchMedia("(min-width: 1000px) and (pointer: fine)").matches) {
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          if (disposed || version !== generation || reducedMotion.matches)
            return;
          gsap.registerPlugin(ScrollTrigger);
          context.add(() => {
            const orbit = root.querySelector(".portrait-orbit");
            if (orbit && root.querySelector(".hero-section"))
              gsap.to(orbit, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: ".hero-section",
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.1,
                },
              });
            const ctaOrbit = root.querySelector(".cta-orbit");
            if (ctaOrbit)
              gsap.fromTo(
                ctaOrbit,
                { y: -12 },
                {
                  y: 12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".contact-cta",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                },
              );
          });
        }
      } catch {
        // Failed optional downloads must never leave content hidden.
        if (!disposed && version === generation) reset();
      }
    }

    const schedule = () => {
      reset();
      if (reducedMotion.matches) {
        root.dataset.scrollMotion = "reduced";
        return;
      }
      const version = generation;
      timeout = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(
            () => {
              void initialize(version);
            },
            { timeout: 1800 },
          );
        } else void initialize(version);
      }, 700);
    };

    schedule();
    reducedMotion.addEventListener("change", schedule);
    return () => {
      disposed = true;
      reset();
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [pathname]);

  return null;
}
