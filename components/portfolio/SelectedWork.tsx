import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import { Arrow } from "./Icons";

export default function SelectedWork() {
  const [lead, ...supporting] = projects.slice(0, 3);
  return (
    <section
      className="section container selected-work"
      id="projects"
      aria-labelledby="selected-work-title"
    >
      <span id="work" className="anchor-marker" />
      <div className="work-section-heading">
        <div>
          <div className="section-label">01 / SELECTED WORK</div>
          <h2 id="selected-work-title">
            Software,
            <br />
            <span>in practice.</span>
          </h2>
        </div>
        <div className="work-section-intro">
          <p>
            A closer look at independent products, professional work, and the
            problems behind them.
          </p>
          <Link prefetch={false} className="work-all-link" href="/work">
            Explore all work{" "}
            <span>{projects.length.toString().padStart(2, "0")}</span>
            <Arrow diagonal />
          </Link>
        </div>
      </div>
      <div className="featured-grid">
        <article className="project-card work-case work-case-featured">
          <div className="work-feature-copy">
            <div className="work-case-kicker">
              <span className="work-feature-badge">Independent product</span>
              <span>01 / FEATURED</span>
            </div>
            <div className="work-feature-story">
              <h3>
                <Link
                  prefetch={false}
                  className="selected-project-link"
                  href={"/work/" + lead.slug}
                  aria-label={"Read " + lead.name + " case study"}
                >
                  {lead.name}
                  <span>.</span>
                </Link>
              </h3>
              <p className="work-feature-summary">{lead.summary}</p>
              <p className="work-feature-detail">
                An independently developed SaaS product, connecting a .NET
                backend with a React interface.
              </p>
              <div className="work-case-tags">
                {lead.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="work-feature-action" aria-hidden="true">
              <span>View case study</span>
              <span className="work-case-arrow">
                <Arrow diagonal />
              </span>
            </div>
          </div>
          <div className="work-feature-preview">
            <div className="work-preview-window">
              <div className="work-preview-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>invo.pk</p>
                <span className="work-preview-lock">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="6" y="10" width="12" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
              </div>
              <Image
                src="/projects/invo-public.webp"
                alt="Public Invo.pk website presenting its POS, inventory and accounts product"
                width={1440}
                height={1050}
                sizes="(max-width: 799px) 90vw, (max-width: 1440px) 56vw, 720px"
              />
            </div>
            <span className="work-preview-caption">
              A look at the public product website
            </span>
          </div>
        </article>
        {supporting.map((project, index) => (
          <article
            key={project.slug}
            className={
              "project-card work-case work-case-row" +
              (project.visual === "kidz" ? " selected-project-academic" : "")
            }
          >
            <span className="work-row-number" aria-hidden="true">
              0{index + 2}
            </span>
            <div className="work-row-title">
              <p>
                {project.visual === "kidz"
                  ? "Final-year project · Hamdard University"
                  : "Professional work · Anonymized"}
              </p>
              <h3>
                <Link
                  prefetch={false}
                  className="selected-project-link"
                  href={"/work/" + project.slug}
                  aria-label={"Read " + project.name + " case study"}
                >
                  {project.name}
                </Link>
              </h3>
            </div>
            <div className="work-row-description">
              <p>{project.summary}</p>
              <div className="work-case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <span className="work-case-arrow" aria-hidden="true">
              <Arrow diagonal />
            </span>
          </article>
        ))}
      </div>
      <div className="work-section-footnote">
        <span>Products. Platforms. Practical engineering.</span>
        <p>
          Professional work is anonymized. Case studies explain my role and
          approach.
        </p>
      </div>
    </section>
  );
}
