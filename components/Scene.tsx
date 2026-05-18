"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; o: number;
}

interface Shape {
  cx: number; cy: number; r: number; hue: number;
  ax: number; ay: number; az: number;
  spin: number; phase: number;
  v: number[][]; e: number[][];
}

function makeIcosahedron(): { v: number[][]; e: number[][] } {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]];
  const s = Math.sqrt(1+t*t);
  v.forEach(p => { p[0]/=s; p[1]/=s; p[2]/=s; });
  const e = [[0,11],[0,5],[0,1],[0,7],[0,10],[1,5],[5,11],[11,10],[10,7],[7,1],[3,9],[3,4],[3,2],[3,6],[3,8],[4,9],[2,4],[6,2],[8,6],[9,8],[1,9],[5,4],[11,2],[10,6],[7,8]];
  return { v, e };
}

function makeOctahedron(): { v: number[][]; e: number[][] } {
  const v = [[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];
  const e = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]];
  return { v, e };
}

function makeTetrahedron(): { v: number[][]; e: number[][] } {
  const v = [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]];
  const s = Math.sqrt(3);
  v.forEach(p => { p[0]/=s; p[1]/=s; p[2]/=s; });
  const e = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
  return { v, e };
}

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, devicePixelRatio);
    let w = 0, h = 0;
    let mouseX = 0.5, mouseY = 0.5;
    let scrollY = 0;
    let isMobile = window.innerWidth <= 760;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      isMobile = window.innerWidth <= 760;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const pCount = isMobile ? 80 : 220;
    const particles: Particle[] = Array.from({ length: pCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.06,
      vy: -(0.1 + Math.random() * 0.15),
      r: Math.random() < 0.7 ? 0.7 : 1.4,
      o: 0.08 + Math.random() * 0.18,
    }));

    // Shapes
    const ico = makeIcosahedron();
    const oct = makeOctahedron();
    const tet = makeTetrahedron();

    const shapes: Shape[] = isMobile
      ? [
          { cx: 0.10, cy: 0.10, r: 44, hue: 48, ax: 0, ay: 0, az: 0, spin: 0.0009, phase: 0, ...ico },
          { cx: 0.92, cy: 0.86, r: 40, hue: 268, ax: 0, ay: 0, az: 0, spin: -0.0008, phase: 1, ...oct },
          { cx: 1.04, cy: 0.40, r: 30, hue: 280, ax: 0, ay: 0, az: 0, spin: 0.0007, phase: 2, ...tet },
        ]
      : [
          { cx: 0.25, cy: 0.45, r: 110, hue: 270, ax: 0, ay: 0, az: 0, spin: 0.0008, phase: 0, ...ico },
          { cx: 0.78, cy: 0.55, r: 90, hue: 280, ax: 0, ay: 0, az: 0, spin: -0.0007, phase: 1, ...oct },
          { cx: 0.55, cy: 0.35, r: 70, hue: 48, ax: 0, ay: 0, az: 0, spin: 0.001, phase: 2, ...tet },
          { cx: 0.18, cy: 0.78, r: 60, hue: 268, ax: 0, ay: 0, az: 0, spin: -0.0006, phase: 3, ...oct },
          { cx: 0.86, cy: 0.22, r: 55, hue: 50, ax: 0, ay: 0, az: 0, spin: 0.0009, phase: 4, ...ico },
        ];

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / w;
      mouseY = (e.clientY - rect.top) / h;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const isLight = () => document.documentElement.classList.contains("theme-light");

    let raf: number;
    const render = (time: number) => {
      const t = time * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const heroFade = Math.max(0, 1 - scrollY / 800);
      if (heroFade <= 0) { raf = requestAnimationFrame(render); return; }

      const light = isLight();
      const pR = light ? 20 : 240;
      const pG = light ? 20 : 237;
      const pB = light ? 40 : 232;

      // Draw particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Mouse repulsion
        const dx = p.x - mouseX * w;
        const dy = p.y - mouseY * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const f = (100 - dist) / 100 * 0.5;
          p.x += (dx / dist) * f;
          p.y += (dy / dist) * f;
        }

        ctx.globalAlpha = p.o * heroFade;
        ctx.fillStyle = `rgb(${pR},${pG},${pB})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw shapes
      ctx.globalCompositeOperation = light ? "multiply" : "lighter";
      for (const s of shapes) {
        s.ax += s.spin;
        s.ay += s.spin * 0.7;
        s.az += s.spin * 0.3;

        const breathe = 1 + Math.sin(t * 0.8 + s.phase) * 0.04;
        const drift = 0.04;
        const cx = s.cx * w + (mouseX - 0.5) * w * drift;
        const cy = s.cy * h + (mouseY - 0.5) * h * drift;
        const r = s.r * breathe;

        const cosA = Math.cos(s.ax), sinA = Math.sin(s.ax);
        const cosB = Math.cos(s.ay), sinB = Math.sin(s.ay);
        const cosC = Math.cos(s.az), sinC = Math.sin(s.az);

        const project = (v: number[]) => {
          let [x, y, z] = v;
          let y1 = y * cosA - z * sinA; let z1 = y * sinA + z * cosA;
          let x2 = x * cosB + z1 * sinB; let z2 = -x * sinB + z1 * cosB;
          let x3 = x2 * cosC - y1 * sinC; let y3 = x2 * sinC + y1 * cosC;
          const persp = 1 / (2 - z2);
          return [cx + x3 * r * persp, cy + y3 * r * persp, z2];
        };

        const projected = s.v.map(project);
        const alpha = heroFade * (isMobile ? 0.7 : 1);
        const sat = light ? 60 : 80;
        const lVert = light ? 40 : 50;
        const lEdge = light ? 50 : 65;

        // Glow
        ctx.globalAlpha = alpha * 0.15;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.5);
        grad.addColorStop(0, `hsla(${s.hue}, ${sat}%, ${lVert}%, 0.3)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Edges
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = `hsla(${s.hue}, ${sat}%, ${lEdge}%, 0.7)`;
        ctx.lineWidth = 0.8;
        for (const [a, b] of s.e) {
          ctx.beginPath();
          ctx.moveTo(projected[a][0], projected[a][1]);
          ctx.lineTo(projected[b][0], projected[b][1]);
          ctx.stroke();
        }

        // Vertices
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = `hsla(${s.hue}, ${sat}%, ${lVert}%, 0.8)`;
        for (const p of projected) {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
