"use client";

import { FlowShell, FlowNode, FlowArrow, Boundary, DatabaseIcon } from "./shared";

export default function EdTechFlow() {
  return (
    <FlowShell aspect="16/10" mobileAspect="4/5">
      {(C) => (
        <>
          <div className="corner-meta"><span className="dot" /><span>02 / MICROSERVICES PIPELINE</span></div>
          <div className="bottom-strip">
            <span>18 BRANCHES &middot; 3,000+ LEARNERS &middot; KSA</span>
            <span>EVENT-DRIVEN &middot; DOCKER</span>
          </div>
          <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* API Gateway */}
            <g transform="translate(20, 60)">
              <rect width="132" height="38" rx="7" fill={C.surface03} stroke={C.white20} />
              <circle cx="14" cy="19" r="3" fill={C.violet} />
              <text x="26" y="17" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={1.6} fill={C.white50}>API GATEWAY</text>
              <text x="26" y="30" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={1.2} fill={C.white70}>SPRING BOOT</text>
            </g>

            {/* Microservices boundary */}
            <Boundary x={172} y={172} w={460} h={106} label="MICROSERVICES" />

            {/* RabbitMQ label */}
            <text x="400" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing={2} fill={C.violet}>&middot; RABBITMQ EVENT BUS &middot;</text>

            {/* Gateway connection */}
            <path d="M 86 98 L 86 186 L 100 186 L 100 196" fill="none" stroke={C.white40} strokeDasharray="3 4" className="flowline" />

            {/* Pipeline nodes */}
            {[
              { x: 40, l: "Enrollment", s: "STUDENTS" },
              { x: 188, l: "Courses", s: "ASSIGNMENT" },
              { x: 336, l: "Assessment", s: "GRADING" },
              { x: 484, l: "Wallet", s: "BALANCE" },
              { x: 632, l: "Transfer", s: "PAYOUT" },
            ].map((n, i, arr) => (
              <g key={i}>
                <FlowNode x={n.x} y={200} w={120} h={50} label={n.l} sub={n.s}
                          highlight={i === 4} accent={i === 4 ? "gold" : "violet"} />
                <text x={n.x + 110} y={212} fontFamily="JetBrains Mono" fontSize="8" letterSpacing={1.4} fill={C.white20} textAnchor="end">0{i + 1}</text>
                {i < arr.length - 1 && (
                  <>
                    <FlowArrow x1={n.x + 124} y1={225} x2={arr[i + 1].x - 4} y2={225} />
                    {/* MQ badge */}
                    <g transform={`translate(${(n.x + 120 + arr[i + 1].x) / 2 - 10}, ${176})`}>
                      <rect x="-4" y="-2" width="22" height="14" rx="2" fill={C.chipBg} stroke={C.violetLine} strokeOpacity={0.4} />
                      <rect x="0" y="0" width="14" height="2" rx="1" fill={C.violet} opacity="0.9" />
                      <rect x="0" y="4" width="10" height="2" rx="1" fill={C.violet} opacity="0.6" />
                      <rect x="0" y="8" width="14" height="2" rx="1" fill={C.violet} opacity="0.9" />
                    </g>
                  </>
                )}
              </g>
            ))}

            {/* Redis cache icons */}
            {[366, 514].map((x) => (
              <g key={x} transform={`translate(${x}, 296)`}>
                <rect width="16" height="16" rx="3" fill="none" stroke={C.white40} />
                <path d="M 8 3 L 4 9 H 8 L 6 13" fill="none" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="22" y="12" fontFamily="JetBrains Mono" fontSize="8" letterSpacing={1.6} fill={C.gold}>REDIS</text>
              </g>
            ))}

            {/* MySQL data plane */}
            <line x1="60" y1="386" x2="740" y2="386" stroke={C.white20} strokeDasharray="2 4" />
            {[40, 188, 336, 484, 632].map((x) => (
              <line key={x} x1={x + 60} y1={250} x2={x + 60} y2={386} stroke={C.white10} strokeDasharray="1 3" />
            ))}
            <DatabaseIcon x={362} y={388} label="MYSQL · SHARED DATA" w={76} />

            {/* Payments highlight */}
            <text x={692} y={272} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing={2} fill={C.gold}>PAYMENTS · LIVE</text>
            <text x={598} y={242} fontFamily="JetBrains Mono" fontSize="11" fill={C.gold} fontWeight="600">$</text>
          </svg>
        </>
      )}
    </FlowShell>
  );
}
