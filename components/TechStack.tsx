"use client";

import { useState, useCallback } from "react";

const LAYERS = [
  { name: "Frontend", num: "01", color: "violet", dir: "left", techs: [
    { name: "React", ctx: "Daily driver — invo.pk dashboard, KidzSearch admin" },
    { name: "Angular", ctx: "UK Security Management System, logistics tracking" },
    { name: "Blazor", ctx: "ERP migration — desktop-to-web with .NET stack" },
    { name: "Flutter", ctx: "KidzSearch mobile app — cross-platform face recognition" },
  ]},
  { name: "Backend", num: "02", color: "gold", dir: "right", techs: [
    { name: ".NET Core", ctx: "Primary backend — 5+ production systems" },
    { name: "Spring Boot", ctx: "Saudi EdTech platform — microservices backbone" },
    { name: "Node.js", ctx: "SME Investment Portal — Express + PostgreSQL" },
    { name: "ASP.NET", ctx: "Enterprise APIs — REST, gRPC, SignalR" },
    { name: "Express", ctx: "Rapid prototyping + API scaffolding" },
  ]},
  { name: "Data", num: "03", color: "teal", dir: "left", techs: [
    { name: "SQL Server", ctx: "Primary RDBMS — query optimization, 60% load reduction" },
    { name: "PostgreSQL", ctx: "Investment portal — complex financial queries" },
    { name: "Redis", ctx: "Distributed caching — EdTech, invo.pk" },
    { name: "RabbitMQ", ctx: "Event-driven messaging — microservices communication" },
  ]},
  { name: "Cloud", num: "04", color: "emerald", dir: "right", techs: [
    { name: "Azure", ctx: "Full infrastructure — App Services, DevOps, Functions" },
    { name: "AWS", ctx: "invo.pk hosting — EC2, S3, CloudFront" },
    { name: "Docker", ctx: "Containerized deployments — all production services" },
    { name: "CI/CD", ctx: "Azure DevOps + GitHub Actions pipelines" },
  ]},
  { name: "Languages", num: "05", color: "rose", dir: "left", techs: [
    { name: "C#", ctx: "Core language — 3+ years daily" },
    { name: "Java", ctx: "Spring Boot microservices" },
    { name: "TypeScript", ctx: "Frontend + Node.js — type-safe throughout" },
    { name: "JavaScript", ctx: "Legacy codebases + scripting" },
    { name: "SQL", ctx: "Complex queries, stored procedures, optimization" },
  ]},
];

type FocusState = { layer: string; tech: string; ctx: string } | null;

export default function TechStack() {
  const [focus, setFocus] = useState<FocusState>(null);

  const onChipHover = useCallback(
    (layer: string, tech: string, ctx: string) => {
      setFocus({ layer, tech, ctx });
    },
    []
  );

  const onChipLeave = useCallback(() => {
    setFocus(null);
  }, []);

  return (
    <section className="section" id="tech">
      <div className="wrap">
        <div className="head-wrap">
          <div className="label">04 &mdash; TECH</div>
          <h2>The <em>Stack</em></h2>
          <div className="sub">Tools I ship with daily.</div>
        </div>
        <div className="conveyor">
          {LAYERS.map((layer) => (
            <div
              key={layer.name}
              className={`tlayer tlayer-${layer.color}`}
              data-dir={layer.dir}
            >
              <div className="tlayer-label">
                <div className="line" />
                <div className="meta">
                  <div className="n">{layer.num}</div>
                  <div className="name">{layer.name}</div>
                </div>
              </div>
              <div className="tlayer-rail">
                <div className="tlayer-track">
                  {[0, 1, 2].map((set) => (
                    <div key={set} className="tlayer-set">
                      {layer.techs.map((tech) => (
                        <div
                          key={`${set}-${tech.name}`}
                          className="tlayer-chip"
                          onMouseEnter={() => onChipHover(layer.name, tech.name, tech.ctx)}
                          onMouseLeave={onChipLeave}
                          onClick={() => onChipHover(layer.name, tech.name, tech.ctx)}
                        >
                          <span className="dot" />
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`conveyor-readout ${focus ? "has-focus" : ""}`}>
          <div className="ro-label">
            <div className="dotbox"><div className="d" /></div>
            FOCUS
          </div>
          <div className="ro-content">
            {focus ? (
              <>
                <span className={`ro-tag ro-tag-${LAYERS.find(l => l.name === focus.layer)?.color || "violet"}`}>
                  {focus.layer}
                </span>
                <span className="ro-name">{focus.tech}</span>
                <span className="ro-divider" />
                <span className="ro-ctx">{focus.ctx}</span>
              </>
            ) : (
              <span className="ro-idle">Hover a chip to see context</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
