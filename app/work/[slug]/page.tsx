import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { Arrow } from "@/components/portfolio/Icons";
import { projects } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata(project.name, project.summary, `/work/${slug}`);
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${siteUrl}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteUrl}/work/${project.slug}`,
      },
    ],
  };
  return (
    <>
      <div className="case-intro container">
        <Link prefetch={false} className="back-link" href="/work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <div className="section-label">{project.category}</div>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p className="case-summary">{project.summary}</p>
        <div className="case-facts">
          <div>
            <span>MY ROLE</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>CONTEXT</span>
            <p>{project.context}</p>
          </div>
          <div>
            <span>FOCUS</span>
            <p>{project.tags.join(" · ")}</p>
          </div>
        </div>
        {project.link && (
          <a
            className="button button-primary"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            Visit public website <Arrow diagonal />
          </a>
        )}
      </div>
      {project.visual !== "kidz" && (
        <div className="container case-visual">
          <ProjectVisual kind={project.visual} large />
        </div>
      )}
      <div className="container case-body">
        <aside>
          <span className="section-label">PROJECT NOTES</span>
          <nav aria-label="Case study sections">
            <a href="#overview">The goal</a>
            <a href="#contribution">My contribution</a>
            <a href="#technology">Technology & approach</a>
            <a href="#considerations">Engineering considerations</a>
          </nav>
        </aside>
        <div>
          <section id="overview">
            <div className="section-label">01 / THE GOAL</div>
            <h2>Software with a purpose.</h2>
            <p>{project.goal}</p>
            {project.slug === "invo-pk" && (
              <p>
                An independently developed SaaS product I built for managing
                sales, inventory, and accounts.
              </p>
            )}
          </section>
          <section id="contribution">
            <div className="section-label">02 / MY CONTRIBUTION</div>
            <h2>The work behind it.</h2>
            <ul className="contribution-list">
              {project.contributions.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
          <section id="technology">
            <div className="section-label">03 / TECHNOLOGY & APPROACH</div>
            <h2>Connecting the pieces.</h2>
            <p>{project.technical}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
          <section id="considerations">
            <div className="section-label">04 / ENGINEERING CONSIDERATIONS</div>
            <h2>Looking past the interface.</h2>
            <p>{project.consideration}</p>
          </section>
          {project.confidential && (
            <p className="case-confidential">
              This is an anonymized overview of professional work. No client
              endorsement, private data, or proprietary architecture is implied.
            </p>
          )}
        </div>
      </div>
      <section className="container section related-work">
        <div className="section-heading">
          <h2>
            A little more <span>to explore.</span>
          </h2>
          <Link prefetch={false} className="text-link" href="/work">
            All work <Arrow diagonal />
          </Link>
        </div>
        <div className="related-grid">
          {projects
            .filter((p) => p.slug !== project.slug)
            .slice(0, 2)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
