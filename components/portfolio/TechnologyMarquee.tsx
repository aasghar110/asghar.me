import MarqueeControls from "./MarqueeControls";
const technologies = [
  [".NET Core", "dotnet"],
  ["Spring Boot", "springboot"],
  ["Node.js", "nodedotjs"],
  ["React", "react"],
  ["Next.js", "nextdotjs"],
  ["Angular", "angular"],
  ["Supabase", "supabase"],
  ["Umbraco", "umbraco"],
  ["Sitefinity", ""],
  ["AWS", ""],
  ["Azure", ""],
  ["OCI", ""],
  ["IaC", ""],
];
export default function TechnologyMarquee() {
  return (
    <MarqueeControls>
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {technologies.map(([name, icon]) => (
                <li key={name}>
                  {icon ? (
                    // SVGs are already optimized; native images need no client image runtime.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/icons/${icon}.svg`}
                      width={28}
                      height={28}
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                  ) : (
                    <span className="tech-letter" aria-hidden="true">
                      {name === "Sitefinity"
                        ? "S"
                        : name === "AWS"
                          ? "aws"
                          : name === "Azure"
                            ? "Az"
                            : name === "IaC"
                              ? "{ }"
                              : "O"}
                    </span>
                  )}
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <span className="sr-only">
        Technology breadth reflects different project experience, not equal
        expertise in every tool.
      </span>
    </MarqueeControls>
  );
}
