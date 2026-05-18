"use client";

import { FlowShell, FlowNode, FlowArrow, DatabaseIcon } from "./shared";

export default function InvestFlow() {
  return (
    <FlowShell aspect="16/10" mobileAspect="4/5">
      {(C) => (
        <>
          <div className="corner-meta"><span className="dot" /><span>04 / DEAL PIPELINE</span></div>
          <div className="bottom-strip">
            <span>BUILT IN &lt; 30 DAYS</span>
            <span>AI-ASSISTED DEV</span>
          </div>
          <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* React + TypeScript header */}
            <g transform="translate(320, 30)">
              <rect width="160" height="24" rx="12" fill={C.surface03} stroke={C.white20} />
              <text x="80" y="16" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={1.4} fill={C.white70}>REACT + TYPESCRIPT</text>
            </g>

            {/* AWS cloud badge */}
            <g transform="translate(700, 30)">
              <path d="M 8 14 Q 0 14 0 8 Q 0 2 8 2 Q 12 -2 18 2 Q 28 2 28 8 Q 28 14 20 14 Z"
                    fill={C.surface03} stroke={C.white40} />
              <text x="36" y="11" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={1.6} fill={C.white70}>AWS</text>
            </g>

            {/* SME side (warm tint) */}
            <rect x="40" y="80" width="260" height="280" rx="16" fill={C.warnBg08} stroke="none" />
            <text x="170" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={2} fill={C.warn}>SME SIDE</text>
            <FlowNode x={80} y={130} w={180} h={44} label="Application" sub="SME PROFILE" />
            <FlowNode x={80} y={200} w={180} h={44} label="Documents" sub="UPLOAD" />
            <FlowNode x={80} y={270} w={180} h={44} label="Due Diligence" sub="REVIEW" />
            <FlowArrow x1={170} y1={174} x2={170} y2={200} />
            <FlowArrow x1={170} y1={244} x2={170} y2={270} />

            {/* Central funnel / matching engine */}
            <g transform="translate(340, 160)">
              <polygon points="60,0 120,0 100,160 20,160"
                       fill={C.violetBg10} stroke={C.violetLine} strokeWidth="1" />
              <text x="60" y="70" textAnchor="middle" fontFamily="Clash Display" fontWeight="600" fontSize="13" fill={C.text}>Matching</text>
              <text x="60" y="86" textAnchor="middle" fontFamily="Clash Display" fontWeight="600" fontSize="13" fill={C.text}>Engine</text>
              <text x="60" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing={1.6} fill={C.violet}>AI-ASSISTED</text>
              {/* Filter lines inside funnel */}
              {[40, 70, 100, 130].map((fy) => {
                const inset = (fy / 160) * 20;
                return (
                  <line key={fy} x1={20 + inset} y1={fy} x2={100 - inset} y2={fy}
                        stroke={C.white10} strokeWidth="0.5" />
                );
              })}
            </g>

            {/* Arrows into funnel */}
            <FlowArrow x1={260} y1={240} x2={340} y2={240} />
            <FlowArrow x1={460} y1={240} x2={540} y2={240} dotted={false} color={C.violetLine} />

            {/* Investor side (cool tint) */}
            <rect x="500" y="80" width="260" height="280" rx="16" fill={C.violetBg10} stroke="none" />
            <text x="630" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={2} fill={C.violet}>INVESTOR SIDE</text>
            <FlowNode x={540} y={130} w={180} h={44} label="Investor Match" sub="PROFILE" />
            <FlowNode x={540} y={200} w={180} h={44} label="Funding Round" sub="COMMITMENT" accent="gold" highlight />
            <FlowNode x={540} y={270} w={180} h={44} label="Portfolio" sub="TRACKING" />
            <FlowArrow x1={630} y1={174} x2={630} y2={200} />
            <FlowArrow x1={630} y1={244} x2={630} y2={270} />

            {/* Dollar sign near Funding */}
            <text x={730} y={226} fontFamily="JetBrains Mono" fontSize="14" fill={C.gold} fontWeight="600">$</text>

            {/* Chart icon at Portfolio */}
            <g transform="translate(726, 278)">
              <rect width="4" height="12" rx="1" fill={C.white40} />
              <rect x="6" width="4" height="8" rx="1" fill={C.white40} y="4" />
              <rect x="12" width="4" height="16" rx="1" fill={C.violet} y="-4" />
            </g>

            {/* PostgreSQL at bottom */}
            <DatabaseIcon x={362} y={400} label="POSTGRESQL" w={76} />

            {/* Connection lines to DB */}
            <line x1={170} y1={314} x2={170} y2={420} stroke={C.white10} strokeDasharray="1 3" />
            <line x1={400} y1={320} x2={400} y2={400} stroke={C.white10} strokeDasharray="1 3" />
            <line x1={630} y1={314} x2={630} y2={420} stroke={C.white10} strokeDasharray="1 3" />
          </svg>
        </>
      )}
    </FlowShell>
  );
}
