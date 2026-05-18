"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const PALETTE_DARK = {
  white50: "rgba(240,237,232,0.5)",
  white70: "rgba(240,237,232,0.78)",
  white40: "rgba(240,237,232,0.4)",
  white20: "rgba(240,237,232,0.2)",
  white10: "rgba(240,237,232,0.1)",
  violet: "#8B5CF6",
  violetSoft: "rgba(139,92,246,0.18)",
  violetLine: "rgba(139,92,246,0.55)",
  violetBg10: "rgba(139,92,246,0.10)",
  gold: "#F5C542",
  goldSoft: "rgba(245,197,66,0.18)",
  goldBg12: "rgba(245,197,66,0.12)",
  green: "#22d39a",
  warn: "#F5A72B",
  warnBg08: "rgba(245,167,43,0.08)",
  surface025: "rgba(255,255,255,0.025)",
  surface03: "rgba(255,255,255,0.03)",
  surface04: "rgba(255,255,255,0.04)",
  chipBg: "#0a0a14",
  text: "#F0EDE8",
};

export const PALETTE_LIGHT = {
  white50: "rgba(26,26,36,0.55)",
  white70: "rgba(26,26,36,0.82)",
  white40: "rgba(26,26,36,0.42)",
  white20: "rgba(26,26,36,0.22)",
  white10: "rgba(26,26,36,0.10)",
  violet: "#6D28D9",
  violetSoft: "rgba(109,40,217,0.12)",
  violetLine: "rgba(109,40,217,0.55)",
  violetBg10: "rgba(109,40,217,0.10)",
  gold: "#B97A0A",
  goldSoft: "rgba(185,122,10,0.14)",
  goldBg12: "rgba(185,122,10,0.13)",
  green: "#0F8A5C",
  warn: "#C77419",
  warnBg08: "rgba(199,116,25,0.10)",
  surface025: "rgba(20,20,40,0.03)",
  surface03: "rgba(20,20,40,0.04)",
  surface04: "rgba(20,20,40,0.05)",
  chipBg: "#FFFCF6",
  text: "#1A1A24",
};

type Palette = typeof PALETTE_DARK;
export const PaletteCtx = createContext<Palette>(PALETTE_DARK);
export function usePalette() { return useContext(PaletteCtx); }

export function useThemeLight() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setLight(el.classList.contains("theme-light"));
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    sync();
    return () => obs.disconnect();
  }, []);
  return light;
}

export function FlowShell({
  aspect,
  mobileAspect,
  children,
}: {
  aspect?: string;
  mobileAspect?: string;
  children: (C: Palette) => React.ReactNode;
}) {
  const light = useThemeLight();
  const C = light ? PALETTE_LIGHT : PALETTE_DARK;
  const style: Record<string, string> = {};
  if (aspect) style["--flow-aspect"] = aspect;
  if (mobileAspect) style["--flow-aspect-mobile"] = mobileAspect;
  return (
    <PaletteCtx.Provider value={C}>
      <div className="flow-panel" style={style}>
        {children(C)}
      </div>
    </PaletteCtx.Provider>
  );
}

export function FlowNode({
  x, y, w, h = 44, label, sub, accent = "violet", highlight = false,
}: {
  x: number; y: number; w: number; h?: number;
  label: string; sub?: string; accent?: string; highlight?: boolean;
}) {
  const C = usePalette();
  const stroke = accent === "gold" ? C.gold : accent === "green" ? C.green : C.violet;
  return (
    <g>
      {highlight && (
        <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={12}
              fill="none" stroke={stroke} strokeWidth={0.6} opacity={0.4} />
      )}
      <rect x={x} y={y} width={w} height={h} rx={9}
            fill={C.surface025} stroke={highlight ? stroke : C.white20} strokeWidth={1} />
      <text x={x + 12} y={y + (sub ? h / 2 - 2 : h / 2 + 3)}
            fontFamily="JetBrains Mono" fontSize={10} letterSpacing={1.2}
            fill={C.white70} fontWeight={500}>{label}</text>
      {sub && (
        <text x={x + 12} y={y + h / 2 + 11}
              fontFamily="JetBrains Mono" fontSize={8} letterSpacing={1.4}
              fill={C.white40}>{sub}</text>
      )}
    </g>
  );
}

export function FlowArrow({
  x1, y1, x2, y2, dotted = true, color,
}: {
  x1: number; y1: number; x2: number; y2: number;
  dotted?: boolean; color?: string;
}) {
  const C = usePalette();
  const col = color || C.white40;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const L = 5;
  const a1 = angle + Math.PI - 0.45;
  const a2 = angle + Math.PI + 0.45;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={col} strokeWidth={1}
            strokeDasharray={dotted ? "3 4" : "0"}
            className={dotted ? "flowline" : ""} />
      <polyline fill="none" stroke={col} strokeWidth={1} strokeLinecap="round"
        points={`${x2 + Math.cos(a1) * L},${y2 + Math.sin(a1) * L} ${x2},${y2} ${x2 + Math.cos(a2) * L},${y2 + Math.sin(a2) * L}`} />
    </g>
  );
}

export function Boundary({
  x, y, w, h, label, accent = "violet",
}: {
  x: number; y: number; w: number; h: number; label?: string; accent?: string;
}) {
  const C = usePalette();
  const stroke = accent === "gold" ? C.gold : C.violet;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14}
            fill="none" stroke={stroke} strokeOpacity={0.35}
            strokeDasharray="4 5" strokeWidth={0.8} />
      {label && (
        <g>
          <rect x={x + 12} y={y - 8} width={label.length * 5.6 + 16} height={14} rx={3} fill={C.chipBg} />
          <text x={x + 20} y={y + 2} fontFamily="JetBrains Mono" fontSize={8.5}
                letterSpacing={1.8} fill={stroke}>{label}</text>
        </g>
      )}
    </g>
  );
}

export function DatabaseIcon({ x, y, label, w = 76 }: { x: number; y: number; label?: string; w?: number }) {
  const C = usePalette();
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={w / 2} cy={6} rx={w / 2} ry={6} fill={C.surface04} stroke={C.white40} />
      <line x1={0} y1={6} x2={0} y2={28} stroke={C.white40} />
      <line x1={w} y1={6} x2={w} y2={28} stroke={C.white40} />
      <ellipse cx={w / 2} cy={18} rx={w / 2} ry={6} fill="none" stroke={C.white20} />
      <ellipse cx={w / 2} cy={28} rx={w / 2} ry={6} fill={C.surface04} stroke={C.white40} />
      {label && (
        <text x={w / 2} y={46} textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize={9} letterSpacing={1.6} fill={C.white70}>{label}</text>
      )}
    </g>
  );
}
