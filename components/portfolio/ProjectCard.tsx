import Link from "next/link";
import type { Project } from "@/lib/content";
import { Arrow } from "./Icons";
import ProjectVisual from "./ProjectVisual";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  if (project.visual === "kidz") {
    return (
      <article className="project-card project-card-kidz project-card-editorial">
        <div className="editorial-project-top">
          <span className="section-label">FINAL-YEAR PROJECT</span>
          <span className="editorial-project-index">0{index + 1}</span>
        </div>
        <div className="editorial-project-body">
          <span className="editorial-project-subject">
            MOBILE REPORTING / FACE MATCHING
          </span>
          <h3>
            <Link
              prefetch={false}
              href={`/work/${project.slug}`}
              data-event="view_project"
              data-project={project.slug}
            >
              {project.name}
              <span>.</span>
            </Link>
          </h3>
          <p>{project.summary}</p>
        </div>
        <div className="editorial-project-bottom">
          <div>
            <p>Hamdard University</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <Link
            prefetch={false}
            href={`/work/${project.slug}`}
            className="project-arrow"
            aria-label="Read about KidzSearch final-year project"
            data-event="view_project"
            data-project={project.slug}
          >
            <Arrow diagonal />
          </Link>
        </div>
      </article>
    );
  }
  return (
    <article className={`project-card project-card-${project.visual}`}>
      <div className="project-image-link">
        <ProjectVisual kind={project.visual} />
      </div>
      <div className="project-card-info">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>0{index + 1}</span>
        </div>
        <div className="project-card-heading">
          <h3>
            <Link
              prefetch={false}
              href={`/work/${project.slug}`}
              data-event="view_project"
              data-project={project.slug}
            >
              {project.name}
            </Link>
          </h3>
          <Link
            prefetch={false}
            href={`/work/${project.slug}`}
            className="project-arrow"
            aria-label={`Read about ${project.name}`}
          >
            <Arrow diagonal />
          </Link>
        </div>
        <p>{project.summary}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
