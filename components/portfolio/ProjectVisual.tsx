import Image from "next/image";
import type { Project } from "@/lib/content";
import { SymbolIcon } from "./Icons";
import SystemsIllustration from "./SystemsIllustration";
export default function ProjectVisual({
  kind,
  large = false,
}: {
  kind: Exclude<Project["visual"], "kidz">;
  large?: boolean;
}) {
  if (kind === "invo")
    return (
      <div
        className={`project-visual visual-invo ${large ? "visual-large" : ""}`}
      >
        <div className="visual-grid" aria-hidden="true" />
        <span className="visual-caption">
          ONE BUSINESS. EVERYTHING CONNECTED.
        </span>
        <div className="browser-frame">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <div>invo.pk</div>
          </div>
          <div className="browser-image">
            <Image
              src="/projects/invo-public.webp"
              alt="Public Invo.pk website showing its POS, inventory and accounts product"
              width={1440}
              height={1050}
              sizes={
                large
                  ? "(max-width: 799px) 92vw, 1100px"
                  : "(max-width: 799px) 92vw, 700px"
              }
            />
          </div>
        </div>
        <span className="visual-footnote">Public product website</span>
      </div>
    );
  if (kind === "security") return <SystemsIllustration large={large} />;
  const labels = {
    education: {
      title: "Behind better learning.",
      eyebrow: "EDUCATION PLATFORM",
      items: ["Learning", "Services", "Support"],
      icon: "code" as const,
    },
    investment: {
      title: "From information to possibility.",
      eyebrow: "INVESTMENT PORTAL",
      items: ["Business", "Review", "Investor"],
      icon: "layers" as const,
    },
  }[kind];
  return (
    <div
      className={`project-visual visual-${kind} ${large ? "visual-large" : ""}`}
    >
      <div className="visual-grid" aria-hidden="true" />
      <span className="visual-caption">{labels.eyebrow}</span>
      <div className="system-art" aria-hidden="true">
        <div className="system-orbit orbit-a" />
        <div className="system-orbit orbit-b" />
        <div className="system-center">
          <SymbolIcon kind={labels.icon} />
        </div>
        <div className="system-nodes">
          {labels.items.map((item, i) => (
            <div key={item} className={`system-node node-${i}`}>
              <span>0{i + 1}</span>
              {item}
              <i />
            </div>
          ))}
        </div>
      </div>
      <div className="visual-title">{labels.title}</div>
      <span className="visual-footnote">
        Illustrative workflow · Not a product screenshot
      </span>
    </div>
  );
}
