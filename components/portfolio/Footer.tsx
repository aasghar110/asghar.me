import Link from "next/link";
import { person } from "@/lib/content";
import { Arrow, SymbolIcon } from "./Icons";
export function ContactCTA() {
  return (
    <section className="contact-cta container" id="contact">
      <div className="cta-orbit" aria-hidden="true" />
      <div className="section-label">A GOOD PLACE TO START</div>
      <div className="contact-cta-row">
        <h2>
          Something in mind?
          <br />
          Let’s make it <span>real.</span>
        </h2>
        <Link
          prefetch={false}
          className="round-link"
          href="/contact"
          aria-label="Contact Ali Asghar"
        >
          <Arrow diagonal />
        </Link>
      </div>
      <div className="contact-cta-bottom">
        <p>Thoughtful software starts with a conversation.</p>
        <a
          href={`mailto:${person.email}`}
          data-event="contact_click"
          data-channel="email"
        >
          {person.email} <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
export default function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link prefetch={false} href="/" className="wordmark">
          ali asghar<span>.</span>
        </Link>
        <p>
          Software Engineer.
          <br />
          From Karachi, with care.
        </p>
        <nav aria-label="Footer navigation">
          <Link prefetch={false} href="/work">
            Selected work
          </Link>
          <Link prefetch={false} href="/about">
            About me
          </Link>
          <Link prefetch={false} href="/contact">
            Contact
          </Link>
        </nav>
        <div className="social-links">
          <a
            href={person.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (opens in a new tab)"
          >
            <SymbolIcon kind="github" />
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
          >
            <SymbolIcon kind="linkedin" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ali Asghar</span>
        <span>Built with purpose. Made to last.</span>
        <Link prefetch={false} href="/privacy">
          Privacy & cookies
        </Link>
      </div>
    </footer>
  );
}
