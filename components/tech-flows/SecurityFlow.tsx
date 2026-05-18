"use client";

import { FlowShell, DatabaseIcon } from "./shared";

const MODULES = [
  { n: "Guard Assignment", angle: -150 },
  { n: "Roster Scheduling", angle: -90 },
  { n: "Check-Call Verify", angle: -30, icon: "clock" },
  { n: "Incident Logging", angle: 30, icon: "alert" },
  { n: "Report Generation", angle: 90 },
  { n: "Dashboard", angle: 150, icon: "browser" },
];

const CX = 300, CY = 250, R = 130;
const polar = (a: number, r: number) => ({
  x: CX + Math.cos((a * Math.PI) / 180) * r,
  y: CY + Math.sin((a * Math.PI) / 180) * r,
});

export default function SecurityFlow() {
  return (
    <FlowShell aspect="16/10" mobileAspect="4/5">
      {(C) => (
        <>
          <div className="corner-meta"><span className="dot" /><span>03 / MODULAR MONOLITH &middot; OPS</span></div>
          <div className="bottom-strip">
            <span>UK OPERATIONS</span>
            <span>AZURE &middot; .NET CORE</span>
          </div>
          <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* Concentric depth rings */}
            {[60, 200].map((r, i) => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={C.white10} strokeWidth="0.6" opacity={0.4 - i * 0.1} />
            ))}

            {/* Modular Monolith boundary */}
            <circle cx={CX} cy={CY} r={210} fill="none" stroke={C.violetLine} strokeOpacity={0.35} strokeDasharray="4 6" />
            <g transform={`translate(${CX - 60}, ${CY - 220})`}>
              <rect width="120" height="14" rx="3" fill={C.chipBg} />
              <text x="60" y="10" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.violet}>MODULAR MONOLITH</text>
            </g>

            {/* Central hexagonal shield */}
            <g transform={`translate(${CX}, ${CY})`}>
              <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
                       fill={C.violetBg10} stroke={C.violet} strokeWidth="1.2" />
              <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16"
                       fill="none" stroke={C.violet} strokeWidth="0.6" strokeOpacity="0.5" />
              <path d="M -10 0 L -3 8 L 12 -8" fill="none" stroke={C.violet} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text y="60" textAnchor="middle" fontFamily="Clash Display" fontWeight="600" fontSize="14" fill={C.text}>.NET CORE</text>
              <text y="74" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing={2} fill={C.white50}>CORE PLATFORM</text>
            </g>

            {/* Module nodes */}
            {MODULES.map((m, i) => {
              const p = polar(m.angle, R);
              return (
                <g key={i}>
                  {/* Spoke */}
                  <line
                    x1={CX + Math.cos((m.angle * Math.PI) / 180) * 50}
                    y1={CY + Math.sin((m.angle * Math.PI) / 180) * 50}
                    x2={p.x - Math.cos((m.angle * Math.PI) / 180) * 30}
                    y2={p.y - Math.sin((m.angle * Math.PI) / 180) * 12}
                    stroke={C.white20} strokeDasharray="2 3" className="flowline"
                  />
                  {/* Node pill */}
                  <g transform={`translate(${p.x - 64}, ${p.y - 14})`}>
                    <rect width="128" height="28" rx="14" fill={C.surface025} stroke={C.white20} />
                    {m.icon === "clock" && (
                      <g transform="translate(12, 14)">
                        <circle r="6" fill="none" stroke={C.white50} />
                        <path d="M 0 -3 L 0 0 L 3 1" stroke={C.white70} strokeWidth="1" strokeLinecap="round" />
                      </g>
                    )}
                    {m.icon === "alert" && (
                      <g transform="translate(12, 14)">
                        <polygon points="0,-7 6,5 -6,5" fill="none" stroke={C.gold} strokeWidth="1" />
                        <line x1="0" y1="-2" x2="0" y2="2" stroke={C.gold} />
                        <circle cy="4" r="0.8" fill={C.gold} />
                      </g>
                    )}
                    {m.icon === "browser" && (
                      <g transform="translate(8, 7)">
                        <rect width="14" height="11" rx="1.5" fill="none" stroke={C.white50} />
                        <line x1="0" y1="3.5" x2="14" y2="3.5" stroke={C.white50} />
                      </g>
                    )}
                    <text x={m.icon ? 28 : 14} y="18" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={1} fill={C.white70}>{m.n}</text>
                  </g>
                </g>
              );
            })}

            {/* SQL Server at bottom */}
            <DatabaseIcon x={CX - 38} y={CY + 180} label="SQL SERVER" />

            {/* Azure DevOps CI/CD pipeline on right edge */}
            <g transform="translate(620, 140)">
              <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.white50}>AZURE DEVOPS</text>
              {["BUILD", "TEST", "DEPLOY"].map((step, i) => (
                <g key={step} transform={`translate(0, ${20 + i * 40})`}>
                  <rect width="80" height="28" rx="6" fill={C.surface03} stroke={C.white20} />
                  <text x="40" y="18" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={1.4} fill={C.white70}>{step}</text>
                  {i < 2 && (
                    <line x1="40" y1="28" x2="40" y2="40" stroke={C.white40} strokeDasharray="2 3" className="flowline" />
                  )}
                </g>
              ))}
            </g>
          </svg>
        </>
      )}
    </FlowShell>
  );
}
