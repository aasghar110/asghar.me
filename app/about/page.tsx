import Link from "next/link";
import PageIntro from "@/components/portfolio/PageIntro";
import Portrait from "@/components/portfolio/Portrait";
import { ContactCTA } from "@/components/portfolio/Footer";
import { Arrow, SymbolIcon } from "@/components/portfolio/Icons";
import { strengths, education } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About",
  "Meet Ali Asghar, a Karachi-based software engineer focused on backend systems, full-stack applications, and thoughtful product development.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE ABOUT ME"
        title="Good software starts"
        accent="with understanding."
      >
        <p>
          I’m Ali Asghar. A software engineer who likes asking the right
          questions, understanding how things connect, and building something
          useful.
        </p>
      </PageIntro>
      <section className="container biography-grid">
        <Portrait compact />
        <div className="biography-copy">
          <div className="section-label">
            KARACHI, PAKISTAN / WORKING ACROSS CONTEXTS
          </div>
          <h2>
            The details matter.
            <br />
            <span>So does the bigger picture.</span>
          </h2>
          <p>
            My work spans backend systems, full-stack applications, and
            cloud-based solutions. I’m currently a Software Engineer at Digital
            Dividend Global, following my earlier work at GentecSoft.
          </p>
          <p>
            I enjoy the space between a real-world problem and its
            implementation: understanding the workflow, making practical
            technical decisions, and connecting the parts into a coherent
            product.
          </p>
          <p>
            Alongside professional work, I independently developed{" "}
            <Link prefetch={false} className="inline-link" href="/work/invo-pk">
              Invo.pk
            </Link>
            , a SaaS product for managing sales, inventory, and accounts.
          </p>
          <Link prefetch={false} className="text-link" href="/experience">
            Explore my experience <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <div className="section-label">WHERE I FOCUS</div>
            <h2>
              Different tools.
              <br />
              <span>The same thoughtful approach.</span>
            </h2>
          </div>
          <p className="section-aside">
            Backend engineering is my primary focus. My experience with other
            technologies varies by project and role.
          </p>
        </div>
        <div className="strength-grid">
          {strengths.map((item, i) => (
            <article key={item.name} className="strength-card">
              <div className="strength-top">
                <SymbolIcon
                  kind={i === 0 ? "layers" : i === 1 ? "code" : "globe"}
                />
                <span>0{i + 1}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="strength-tools">{item.tools}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="container philosophy-grid">
        <div>
          <div className="section-label">HOW I WORK</div>
          <h2>
            Understand first.
            <br />
            <span>Build with intention.</span>
          </h2>
        </div>
        <div className="principles">
          <article>
            <span>01</span>
            <div>
              <h3>Start with the actual problem.</h3>
              <p>
                Understand who will use the software, what they need to do, and
                where the current process gets in their way.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Keep the structure clear.</h3>
              <p>
                Choose an approach that fits the work. Prefer understandable
                systems and decisions the next engineer can follow.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Care about what ships.</h3>
              <p>
                Consider the interface, implementation, and day-to-day operation
                together. The details shape the whole experience.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="container education-card">
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
        <Link prefetch={false} className="text-link" href="/work/kidzsearch">
          Explore my final-year project <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA />
    </>
  );
}
