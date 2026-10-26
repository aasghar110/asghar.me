import Link from "next/link";
import PageIntro from "@/components/portfolio/PageIntro";
import { ContactCTA } from "@/components/portfolio/Footer";
import { Arrow } from "@/components/portfolio/Icons";
import { experience, education } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Experience",
  "Ali Asghar’s software engineering experience at Digital Dividend Global and GentecSoft, with a background in backend and full-stack applications.",
  "/experience",
);
export default function Experience() {
  return (
    <>
      <PageIntro
        eyebrow="EXPERIENCE / A CONTINUING JOURNEY"
        title="Built on experience."
        accent="Driven by curiosity."
      >
        <p>
          Working across applications, teams, and industries. Each project
          brings a different problem—and another opportunity to build with care.
        </p>
      </PageIntro>
      <section
        className="container career-timeline"
        aria-label="Career timeline"
      >
        {experience.map((job, i) => (
          <article className="career-entry" key={job.company}>
            <div className="career-date">
              <span className="timeline-dot" />
              <span>0{i + 1}</span>
              <p>
                <time dateTime={job.start}>{job.dates.split(" — ")[0]}</time> —{" "}
                {job.end ? (
                  <time dateTime={job.end}>{job.dates.split(" — ")[1]}</time>
                ) : (
                  "Present"
                )}
              </p>
              <span>Karachi, Pakistan</span>
            </div>
            <div className="career-content">
              <div className="section-label">{job.company}</div>
              <h2>{job.role}</h2>
              <p className="career-summary">{job.summary}</p>
              <ul className="contribution-list">
                {job.contributions.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <div className="project-tags">
                {job.technologies.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="container experience-end">
        <div>
          <div className="section-label">EDUCATION</div>
          {education.map((item) => (
            <div key={item.degree}>
              <h3>{item.degree}</h3>
              <p>
                {item.institution} &middot; {item.dates}
                {item.status ? " - " + item.status : ""}
              </p>
            </div>
          ))}
        </div>
        <Link prefetch={false} className="text-link" href="/work">
          See the work behind the experience <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA />
    </>
  );
}
