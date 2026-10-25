import PageIntro from "@/components/portfolio/PageIntro";
import ContactForm from "@/components/portfolio/ContactForm";
import { Arrow, SymbolIcon } from "@/components/portfolio/Icons";
import { person } from "@/lib/content";
import { contactConfigured } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Contact",
  "Contact Ali Asghar about a software project, engineering role, or professional collaboration. Find email, LinkedIn, and GitHub details.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT / LET’S START A CONVERSATION"
        title="Something in mind?"
        accent="I’d love to hear it."
      >
        <p>
          A product to build, a system to improve, or an engineering role to
          discuss. Tell me a little about what you’re thinking.
        </p>
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-details">
          <div className="contact-email">
            <span className="section-label">THE DIRECT ROUTE</span>
            <a
              href={`mailto:${person.email}`}
              data-event="contact_click"
              data-channel="email"
            >
              {person.email}
              <Arrow diagonal />
            </a>
            <p>Prefer email? My inbox is a good place to start.</p>
          </div>
          <div className="contact-social">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              data-event="contact_click"
              data-channel="linkedin"
            >
              <SymbolIcon kind="linkedin" />
              <div>
                LinkedIn<span>Connect professionally</span>
              </div>
              <Arrow diagonal />
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              data-event="contact_click"
              data-channel="github"
            >
              <SymbolIcon kind="github" />
              <div>
                GitHub<span>Explore the code</span>
              </div>
              <Arrow diagonal />
            </a>
          </div>
          <div className="contact-location">
            <SymbolIcon kind="globe" />
            <p>
              Based in Karachi, Pakistan.
              <br />
              <span>Good conversations travel well.</span>
            </p>
          </div>
        </div>
        <ContactForm configured={contactConfigured()} />
      </section>
    </>
  );
}
