import Link from "next/link";
import { projects } from "@/lib/content";
import { Arrow } from "./Icons";
import ProjectVisual from "./ProjectVisual";

export default function SelectedWork() {
  return (
    <section
      className="section container selected-work"
      id="projects"
      aria-labelledby="selected-work-title"
    >
      <span id="work" className="anchor-marker" />
      <div className="section-heading selected-work-heading">
        <div>
          <div className="section-label">01 / SELECTED WORK</div>
          <h2 id="selected-work-title">
            Built with purpose.
            <br />
            <span>Designed for real life.</span>
          </h2>
        </div>
        <div className="selected-work-intro">
          <p>
            Independent products, professional contributions, and the
            engineering decisions behind them.
          </p>
          <Link prefetch={false} className="selected-work-all" href="/work">
            Explore all work{" "}
            <span>{projects.length.toString().padStart(2, "0")}</span>
            <Arrow diagonal />
          </Link>
        </div>
      </div>
      <div className="featured-grid">
        {projects.slice(0, 3).map((project, index) => (
          <article
            key={project.slug}
            className={`project-card selected-project${index === 0 ? " selected-project-lead" : ""}${project.visual === "kidz" ? " selected-project-academic" : ""}`}
          >
            {project.visual !== "kidz" && (
              <div className="selected-project-visual">
                <ProjectVisual kind={project.visual} />
              </div>
            )}
            <div className="selected-project-body">
              <div className="selected-project-meta">
                <span>
                  {project.visual === "kidz"
                    ? "Final-year project"
                    : project.confidential
                      ? "Professional contribution"
                      : "Independent product"}
                </span>
                <span className="selected-project-number">0{index + 1}</span>
              </div>
              {project.visual === "kidz" && (
                <p className="selected-project-context">
                  MOBILE REPORTING / FACE MATCHING
                </p>
              )}
              <h3>
                <Link
                  prefetch={false}
                  className="selected-project-link"
                  href={`/work/${project.slug}`}
                  aria-label={`Read ${project.name} case study`}
                >
                  {project.name}
                  <span>.</span>
                </Link>
              </h3>
              <p className="selected-project-summary">{project.summary}</p>
              {project.visual === "kidz" && (
                <p className="selected-project-institution">
                  Hamdard University
                </p>
              )}
              <div
                className="selected-project-tags"
                aria-label="Technologies and focus"
              >
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="selected-project-action" aria-hidden="true">
                <span>Read case study</span>
                <span className="selected-project-arrow">
                  <Arrow diagonal />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="selected-work-note">
        Professional work is anonymized. Each case study outlines my role,
        approach, and engineering considerations.
      </p>
    </section>
  );
}
