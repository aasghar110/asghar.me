"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/content";
import { Arrow } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background =
      document.querySelectorAll<HTMLElement>("main, .site-footer");
    background.forEach((element) => {
      element.inert = true;
    });
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          menu.current?.querySelectorAll<HTMLElement>("a") ?? [],
        );
        const first = links[0];
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          button.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          button.current?.focus();
        } else if (document.activeElement === button.current) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  useEffect(() => {
    const media = matchMedia("(min-width: 800px)");
    const handle = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link
          prefetch={false}
          href="/"
          className="wordmark"
          aria-label="Ali Asghar home"
          onClick={() => setOpen(false)}
        >
          ali asghar<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link prefetch={false} className="header-contact" href="/contact">
          Let’s talk <Arrow diagonal />
        </Link>
        <button
          ref={button}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        ref={menu}
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, i) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
            >
              <span className="nav-number">0{i + 1}</span>
              {item.label}
              <Arrow diagonal />
            </Link>
          ))}
        </nav>
        <p>
          Ali Asghar · Software Engineer
          <br />
          Karachi, Pakistan
        </p>
      </div>
    </header>
  );
}
