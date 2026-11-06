import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const BLUE = [91, 124, 255];
const GOLD = [242, 181, 68];

// Interactive constellation: stars drift, link when close, and reach toward the pointer.
// Colour blends from developer blue (left) to stage gold (right). Pauses off-screen / hidden tab.
export default function UniverseCanvas({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, pts = [], visible = true;
    const ptr = { x: -9999, y: -9999, on: false };

    const rgba = (x, a) => {
      const t = Math.min(1, Math.max(0, x / (w || 1)));
      const c = BLUE.map((v, i) => Math.round(v + (GOLD[i] - v) * t));
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = rgba(p.x, 0.85);
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.strokeStyle = rgba(p.x, (1 - d / 12000) * 0.24);
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        if (ptr.on) {
          const dx = p.x - ptr.x, dy = p.y - ptr.y, d = dx * dx + dy * dy;
          if (d < 28000) {
            ctx.strokeStyle = rgba(p.x, (1 - d / 28000) * 0.6);
            ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(ptr.x, ptr.y); ctx.stroke();
          }
        }
      }
      if (ptr.on) {
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, 170);
        g.addColorStop(0, rgba(ptr.x, 0.16));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(ptr.x - 170, ptr.y - 170, 340, 340);
      }
    };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(78, Math.max(24, (w * h) / 26000)));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.3 + 0.5 }));
      draw();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      ptr.on = ptr.x >= 0 && ptr.x <= w && ptr.y >= 0 && ptr.y <= h;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      const loop = () => { if (visible && !document.hidden) draw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
