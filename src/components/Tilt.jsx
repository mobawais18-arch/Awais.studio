import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Perspective tilt that follows the pointer. Children may use translateZ for depth.
export default function Tilt({ children, className, max = 9 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 170, damping: 18 });
  const sy = useSpring(ry, { stiffness: 170, damping: 18 });

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
    ref.current.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div ref={ref} className={className} style={{ perspective: 1300 }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="relative h-full w-full" style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}>
        {children}
        <div className="tilt-glare" />
      </motion.div>
    </div>
  );
}
