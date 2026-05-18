"use client";

import { useState } from "react";
import EdTechFlow from "./tech-flows/EdTechFlow";
import SecurityFlow from "./tech-flows/SecurityFlow";
import InvestFlow from "./tech-flows/InvestFlow";
import KidzFlow from "./tech-flows/KidzFlow";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const PROJECTS = [
  {
    num: "01",
    tag: "SAAS PRODUCT",
    title: "invo.pk",
    sub: "Multi-Tenant Invoicing, Billing & POS SaaS",
    desc: "Solo-built production SaaS serving businesses across Pakistan. Complete invoicing, billing, POS, and inventory management with Stripe integration, multi-tenancy, and real-time dashboards.",
    pills: [".NET Core 8", "React 19", "SQL Server", "AWS", "Tailwind", "Flutter"],
    link: { label: "Visit Live Project", href: "https://invo.pk" },
    layout: "invo" as const,
  },
  {
    num: "02",
    tag: "ENTERPRISE",
    title: "Enterprise EdTech Platform",
    sub: "Large-Scale Microservices Backend for Saudi Education Sector",
    desc: "Owned the backend microservices architecture for a platform serving 3,400+ learners across Saudi Arabia. Built student enrollment, course management, assessment engine, and digital wallet with direct bank transfers.",
    pills: ["ASP.NET Core", "Microservices", "RabbitMQ", "Redis", "Docker", "MySQL"],
    layout: "left" as const,
  },
  {
    num: "03",
    tag: "ENTERPRISE",
    title: "UK Security Management System",
    sub: "Modular Monolith for Guard Operations & Compliance",
    desc: "Architected a modular monolith system for managing guard assignments, roster scheduling, check-call verification, incident logging, and automated compliance reporting across UK security operations.",
    pills: [".NET Core", "Modular Monolith", "Azure", "Azure DevOps", "SQL Server", "Angular"],
    layout: "right" as const,
  },
  {
    num: "04",
    tag: "FINTECH",
    title: "SME Investment Portal",
    sub: "Deal Pipeline Platform Connecting SMEs & Investors",
    desc: "Built from zero in under 30 days. Platform matching engine connects SMEs seeking funding with investors, featuring document management, due diligence workflows, and portfolio tracking.",
    pills: ["Node.js", "Express", "React", "PostgreSQL", "AWS", "AI-Assisted"],
    layout: "center" as const,
  },
  {
    num: "05",
    tag: "AI / ML \u00B7 FYP",
    title: "KidzSearch",
    sub: "AI-Powered Missing Child Recovery Platform",
    desc: "Face recognition platform using Dlib for encoding and cosine similarity matching. Parents report via Flutter app, authorities access sighting maps and match alerts through a real-time admin dashboard.",
    pills: ["Flutter", ".NET Core", "Dlib Face Recognition", "AI/ML", "Real-Time Alerts"],
    layout: "left" as const,
  },
];

function InvoMockup() {
  const [screen, setScreen] = useState<"home" | "pos">("home");

  return (
    <div className="invo-stage">
      <div className="lap-pos">
        <div className="lap-frame">
          <div className="lid">
            <div className="screen wide">
              <div
                className="invo-real"
                style={{ backgroundImage: "url(/invo-dashboard.png)" }}
              >
                <div className="url-bar">
                  <span className="lock">&#128274;</span>
                  <span>invo.pk</span>
                  <span className="path">/dashboard</span>
                </div>
                <div className="live-tag">
                  <span className="d" />
                  LIVE &middot; PRODUCTION
                </div>
              </div>
            </div>
          </div>
          <div className="bar" />
        </div>
      </div>
      <div className="ph-pos">
        <div className="phone-frame">
          <div className="pscreen">
            <div className="notch" />
            <div
              className="invo-phone-real"
              style={{
                backgroundImage: `url(/invo-mobile-${screen}.jpeg)`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="ph-toggle">
        <button className={screen === "home" ? "on" : ""} onClick={() => setScreen("home")}>
          Home
        </button>
        <button className={screen === "pos" ? "on" : ""} onClick={() => setScreen("pos")}>
          POS
        </button>
      </div>
    </div>
  );
}

const FLOW_MAP: Record<string, React.ComponentType> = {
  "Enterprise EdTech Platform": EdTechFlow,
  "UK Security Management System": SecurityFlow,
  "SME Investment Portal": InvestFlow,
  "KidzSearch": KidzFlow,
};

function ProjectFlow({ title }: { title: string }) {
  const Flow = FLOW_MAP[title];
  return Flow ? <Flow /> : null;
}

function ProjectCard({
  project,
  onAsk,
}: {
  project: (typeof PROJECTS)[0];
  onAsk: (name: string) => void;
}) {
  const info = (
    <div className="project-info">
      <div className="ptag">{project.tag}</div>
      <h3>{project.title}</h3>
      <div className="psub">{project.sub}</div>
      <p>{project.desc}</p>
      <div className="pills">
        {project.pills.map((p) => (
          <span key={p} className="pill">
            <span className="dot" />
            {p}
          </span>
        ))}
      </div>
      {project.link ? (
        <a
          className="link-arrow"
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
        >
          {project.link.label}
          <span className="arr"><Arrow /></span>
        </a>
      ) : (
        <button
          className="link-arrow"
          onClick={() => {
            onAsk(project.title);
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ask about this project
          <span className="arr"><Arrow /></span>
        </button>
      )}
    </div>
  );

  const mock = (
    <div className="mock-wrap">
      <div className="mock-glow" />
      {project.layout === "invo" ? (
        <InvoMockup />
      ) : (
        <ProjectFlow title={project.title} />
      )}
    </div>
  );

  const gridClass =
    project.layout === "center"
      ? "project-grid center"
      : project.layout === "right"
        ? "project-grid reverse"
        : "project-grid";

  return (
    <div className="project">
      <div className="pnum">{project.num}</div>
      <div className="wrap">
        <div className={gridClass}>
          {project.layout === "center" ? (
            <>
              {mock}
              <div style={{ textAlign: "center" }}>{info}</div>
            </>
          ) : project.layout === "right" ? (
            <>
              {info}
              {mock}
            </>
          ) : (
            <>
              {mock}
              {info}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const askProject = (name: string) => {
    window.dispatchEvent(
      new CustomEvent("ask-project", { detail: name })
    );
  };

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="bg-text" style={{ top: "4%", left: "50%", transform: "translateX(-50%)" }}>
          WORK
        </div>
        <div className="head-wrap">
          <div className="label">05 &mdash; WORK</div>
          <h2>Selected <em>Work</em></h2>
          <div className="sub">Five projects I&apos;ve built and shipped.</div>
        </div>
      </div>
      {PROJECTS.map((p) => (
        <ProjectCard key={p.num} project={p} onAsk={askProject} />
      ))}
    </section>
  );
}
