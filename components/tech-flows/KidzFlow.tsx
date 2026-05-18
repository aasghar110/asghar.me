"use client";

import { FlowShell, FlowNode, FlowArrow } from "./shared";

export default function KidzFlow() {
  return (
    <FlowShell aspect="16/10" mobileAspect="4/5">
      {(C) => (
        <>
          <div className="corner-meta"><span className="dot" /><span>05 / FACE RECOGNITION PIPELINE</span></div>
          <div className="bottom-strip">
            <span>FYP PROJECT</span>
            <span>AI / ML &middot; REAL-TIME</span>
          </div>
          <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* Step 01: Phone frame at top */}
            <g transform="translate(120, 30)">
              <text x="0" y="-6" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.white50}>STEP 01</text>
              <rect x="0" y="0" width="100" height="180" rx="18" fill={C.surface03} stroke={C.white20} />
              <rect x="6" y="6" width="88" height="168" rx="14" fill={C.surface025} />
              {/* Notch */}
              <rect x="30" y="10" width="40" height="8" rx="4" fill={C.chipBg} />
              {/* Upload UI hint */}
              <rect x="20" y="40" width="60" height="50" rx="6" fill="none" stroke={C.white20} strokeDasharray="3 3" />
              <text x="50" y="70" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill={C.white40}>PHOTO</text>
              <text x="50" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" letterSpacing={1.2} fill={C.white50}>CHILD INFO</text>
              <text x="50" y="130" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" letterSpacing={1.2} fill={C.white50}>LAST SEEN</text>
              <text x="50" y="160" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing={1.4} fill={C.violet}>FLUTTER</text>
            </g>

            {/* Arrow from phone to face encoder */}
            <FlowArrow x1={220} y1={140} x2={300} y2={140} />

            {/* Step 02: Face encoding box */}
            <g transform="translate(300, 60)">
              <text x="0" y="-6" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.white50}>STEP 02</text>
              <rect width="200" height="160" rx="14" fill={C.surface03} stroke={C.warn} strokeOpacity="0.4" />
              {/* Face oval with landmark dots */}
              <ellipse cx="100" cy="70" rx="30" ry="40" fill="none" stroke={C.white40} />
              {/* 5 facial landmarks */}
              <circle cx="88" cy="58" r="2" fill={C.warn} />
              <circle cx="112" cy="58" r="2" fill={C.warn} />
              <circle cx="100" cy="70" r="1.5" fill={C.warn} />
              <circle cx="92" cy="82" r="1.5" fill={C.warn} />
              <circle cx="108" cy="82" r="1.5" fill={C.warn} />
              {/* Scan lines */}
              {[48, 58, 68, 78, 88, 98].map((sy) => (
                <line key={sy} x1="65" y1={sy} x2="135" y2={sy} stroke={C.warn} strokeOpacity="0.2" strokeWidth="0.5" />
              ))}
              {/* Animated scan line */}
              <line x1="65" y1="75" x2="135" y2="75" stroke={C.warn} strokeWidth="1.5" opacity="0.6" className="pulse-ring" />

              <text x="100" y="126" textAnchor="middle" fontFamily="Clash Display" fontWeight="600" fontSize="12" fill={C.text}>DLIB ENCODER</text>
              <text x="100" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing={1.6} fill={C.white50}>.NET CORE BACKEND</text>
            </g>

            {/* Arrow from encoder to matcher */}
            <FlowArrow x1={400} y1={220} x2={400} y2={270} />

            {/* Step 03: AI/ML Matching bar */}
            <g transform="translate(140, 270)">
              <rect width="520" height="40" rx="10" fill={C.violetBg10} stroke={C.violetLine} strokeOpacity="0.5" />
              <text x="260" y="24" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" letterSpacing={2} fill={C.violet}>AI / ML &middot; COSINE MATCHING</text>
            </g>

            {/* Sightings map on right */}
            <g transform="translate(560, 60)">
              <text x="0" y="-6" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.white50}>SIGHTINGS DB</text>
              <rect width="200" height="160" rx="14" fill={C.surface03} stroke={C.white20} />
              {/* Grid background */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line key={`h${i}`} x1="10" y1={20 + i * 20} x2="190" y2={20 + i * 20} stroke={C.white10} strokeWidth="0.5" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <line key={`v${i}`} x1={10 + i * 22} y1="10" x2={10 + i * 22} y2="150" stroke={C.white10} strokeWidth="0.5" />
              ))}
              {/* Map pins */}
              {[
                { x: 50, y: 40, pct: "94%" },
                { x: 120, y: 70, pct: "87%" },
                { x: 80, y: 110, pct: "72%" },
                { x: 160, y: 50, pct: "68%" },
              ].map((pin, i) => (
                <g key={i} transform={`translate(${pin.x}, ${pin.y})`}>
                  <circle r="8" fill={C.warnBg08} stroke={C.warn} strokeWidth="1" />
                  <circle r="3" fill={C.warn} />
                  <text x="14" y="4" fontFamily="JetBrains Mono" fontSize="7" fill={C.warn}>{pin.pct}</text>
                </g>
              ))}
            </g>

            {/* Arrow from map to matcher */}
            <FlowArrow x1={660} y1={220} x2={660} y2={270} />

            {/* Step 04: Alert outputs */}
            <g transform="translate(200, 350)">
              <text x="0" y="-6" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.white50}>STEP 04 · ALERTS</text>
              <FlowArrow x1={200} y1={-20} x2={100} y2={10} />
              <FlowArrow x1={200} y1={-20} x2={300} y2={10} />
            </g>

            {/* Authorities alert */}
            <FlowNode x={220} y={370} w={140} h={44} label="Authorities" sub="DISPATCH" accent="gold" highlight />

            {/* Parents alert */}
            <FlowNode x={440} y={370} w={140} h={44} label="Parents" sub="APP NOTIFY" accent="gold" highlight />

            {/* Bell icons */}
            {[290, 510].map((bx) => (
              <g key={bx} transform={`translate(${bx - 8}, 420)`}>
                <path d="M 0 8 Q 0 0 8 0 Q 16 0 16 8 L 18 14 H -2 Z" fill="none" stroke={C.warn} strokeWidth="1" />
                <circle cx="8" cy="16" r="2" fill={C.warn} />
              </g>
            ))}
          </svg>
        </>
      )}
    </FlowShell>
  );
}
