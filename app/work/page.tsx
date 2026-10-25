import PageIntro from "@/components/portfolio/PageIntro";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { ContactCTA } from "@/components/portfolio/Footer";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Selected Work",
  "Explore Ali Asghar’s selected software projects, including Invo.pk, KidzSearch, and anonymized professional engineering work.",
  "/work",
);
export default function Work() {
  return (
    <>
      <PageIntro
        eyebrow="SELECTED WORK / SOFTWARE IN PRACTICE"
        title="Real problems."
        accent="Thoughtful solutions."
      >
        <p>
          Independent products, professional contributions, and a little
          curiosity put into practice. A selection of the work behind the
          experience.
        </p>
      </PageIntro>
      <section className="container work-list" aria-label="Project portfolio">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>
      <div className="container disclosure-note">
        <span aria-hidden="true">↳</span>
        <p>
          Professional projects are anonymized. Diagrams illustrate the problem
          domain; private screenshots and proprietary implementation details are
          not published.
        </p>
      </div>
      <ContactCTA />
    </>
  );
}
