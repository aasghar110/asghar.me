import Link from "next/link";
import Portrait from "@/components/portfolio/Portrait";
import TechnologyMarquee from "@/components/portfolio/TechnologyMarquee";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { ContactCTA } from "@/components/portfolio/Footer";
import { Arrow, SymbolIcon } from "@/components/portfolio/Icons";
import { projects, person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Software Engineer",
    "Ali Asghar is a software engineer in Karachi building backend systems, full-stack applications, and cloud-based products. Explore selected work and experience.",
    "/",
  ),
  title: { absolute: "Ali Asghar | Software Engineer" },
};
export default function Home() {
  return (
    <>
      <section className="hero-section container" id="hero">
        <div className="hero-copy">
          <div className="section-label hero-eyebrow">
            <span /> ALI ASGHAR · SOFTWARE ENGINEER
          </div>
          <h1>
            Ideas, meet
            <br />
            <span className="hero-engineering">
              engineering<span className="blue-period">.</span>
            </span>
          </h1>
          <p className="hero-description">
            I build the systems behind useful software.
            <br className="desktop-break" /> From dependable backends to
            thoughtful
            <br className="desktop-break" /> full-stack products.
          </p>
          <div className="hero-actions">
            <Link
              prefetch={false}
              className="button button-primary"
              href="/work"
            >
              View projects <Arrow diagonal />
            </Link>
            <Link
              prefetch={false}
              className="button button-secondary"
              href="/contact"
            >
              Contact me <Arrow />
            </Link>
          </div>
          <div className="hero-current">
            <span className="current-line" />
            <p>
              Currently engineering at
              <br />
              <strong>{person.employer}</strong>
            </p>
          </div>
        </div>
        <Portrait />
        <div className="hero-bottom">
          <span>THOUGHTFUL SYSTEMS. REAL-WORLD SOFTWARE.</span>
          <a href="#projects">
            Explore the work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <TechnologyMarquee />
      <section className="section container selected-work" id="projects">
        <span id="work" className="anchor-marker" />
        <div className="section-heading">
          <div>
            <div className="section-label">01 / SELECTED WORK</div>
            <h2>
              Built with purpose.
              <br />
              <span>Designed for real life.</span>
            </h2>
          </div>
          <Link prefetch={false} className="text-link" href="/work">
            Explore all work <Arrow diagonal />
          </Link>
        </div>
        <div className="featured-grid">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
      <section className="section about-preview container" id="about">
        <div className="section-label">02 / THE ENGINEER BEHIND THE WORK</div>
        <div className="about-preview-grid">
          <div className="about-preview-copy">
            <h2>
              Curious by nature.
              <br />
              <span>Practical by design.</span>
            </h2>
            <p>
              I’m Ali, a software engineer based in Karachi. I enjoy turning a
              complicated problem into software that feels straightforward to
              use and makes sense to maintain.
            </p>
            <p>
              My focus is backend and full-stack engineering, with experience
              across business applications, cloud platforms, and independently
              developed products.
            </p>
            <Link prefetch={false} className="text-link" href="/about">
              A little more about me <Arrow diagonal />
            </Link>
          </div>
          <div className="experience-preview" id="experience">
            <div className="experience-preview-top">
              <SymbolIcon kind="layers" />
              <span>ALWAYS BUILDING, ALWAYS LEARNING</span>
            </div>
            <div className="mini-job">
              <span className="mini-date">2024 — NOW</span>
              <h3>Software Engineer</h3>
              <p>Digital Dividend Global</p>
            </div>
            <div className="mini-job">
              <span className="mini-date">2023 — 2024</span>
              <h3>Associate Software Engineer</h3>
              <p>GentecSoft</p>
            </div>
            <Link prefetch={false} className="text-link" href="/experience">
              The full experience <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
