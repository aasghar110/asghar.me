"use client";

import { useState } from "react";

const groups = [
  "All tools",
  "Backend",
  "Frontend",
  "Platforms",
  "Cloud & delivery",
] as const;
const tools = [
  { name: ".NET Core", icon: "dotnet", group: "Backend", mark: ".NET" },
  { name: "Spring Boot", icon: "springboot", group: "Backend", mark: "SB" },
  { name: "Node.js", icon: "nodedotjs", group: "Backend", mark: "JS" },
  { name: "React", icon: "react", group: "Frontend", mark: "R" },
  { name: "Next.js", icon: "nextdotjs", group: "Frontend", mark: "N" },
  { name: "Angular", icon: "angular", group: "Frontend", mark: "A" },
  { name: "Supabase", icon: "supabase", group: "Platforms", mark: "S" },
  { name: "Umbraco", icon: "umbraco", group: "Platforms", mark: "U" },
  { name: "Sitefinity", icon: "sitefinity", group: "Platforms", mark: "Sf" },
  { name: "AWS", icon: "aws", group: "Cloud & delivery", mark: "aws" },
  { name: "Azure", icon: "azure", group: "Cloud & delivery", mark: "Az" },
  { name: "OCI", icon: "oci", group: "Cloud & delivery", mark: "OCI" },
  {
    name: "IaC",
    detail: "Infrastructure as Code",
    group: "Cloud & delivery",
    mark: "{ }",
  },
];

export default function TechnologyStack() {
  const [selected, setSelected] =
    useState<(typeof groups)[number]>("All tools");
  const visible = tools.filter(
    (tool) => selected === "All tools" || tool.group === selected,
  );

  return (
    <section className="technology-section" aria-labelledby="technology-title">
      <div className="container technology-panel">
        <div className="technology-intro">
          <div>
            <p className="technology-eyebrow">THE TOOLS BEHIND THE WORK</p>
            <h2 id="technology-title">
              Different tools. <span>One thoughtful approach.</span>
            </h2>
          </div>
          <p className="technology-description">
            From application logic to cloud delivery. The stack follows the
            needs of the project.
          </p>
        </div>
        <div className="technology-toolbar">
          <div
            className="technology-filters"
            role="group"
            aria-label="Filter technologies"
          >
            {groups.map((group) => (
              <button
                key={group}
                type="button"
                aria-pressed={selected === group}
                aria-controls="technology-list"
                onClick={() => setSelected(group)}
              >
                {group}
                <span aria-hidden="true">
                  {group === "All tools"
                    ? tools.length
                    : tools.filter((tool) => tool.group === group).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <ul
          className="technology-grid"
          id="technology-list"
          aria-label={`${selected} technologies`}
        >
          {visible.map((tool) => (
            <li className="technology-card" key={tool.name}>
              <span className="technology-icon" aria-hidden="true">
                {tool.icon ? (
                  // Small local SVGs need no image transformation or client runtime.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/icons/${tool.icon}.${tool.icon === "oci" ? "png" : "svg"}`}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    alt=""
                  />
                ) : (
                  <span>{tool.mark}</span>
                )}
              </span>
              <div>
                <span className="technology-name">{tool.name}</span>
                <span className="technology-category">
                  {tool.detail ?? tool.group}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="technology-footnote">
          <p>Experience varies by project and role.</p>
          <p role="status" aria-live="polite" aria-atomic="true">
            {visible.length} {visible.length === 1 ? "tool" : "tools"}
            {selected !== "All tools" ? ` · ${selected}` : " across the stack"}
          </p>
        </div>
      </div>
    </section>
  );
}
