import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "../lib/gsap";
import { toneColors, useTone } from "../lib/tone";
import { useLenis } from "./SmoothScroll";

const cover = { clipPath: "inset(0% 0% 0% 0%)" };
const open = { clipPath: "inset(0% 0% 100% 0%)" };
const t = { duration: 0.55, ease: [0.76, 0, 0.24, 1] };

// Two-layer shutter that wears the destination's tone color and names the destination.
function Curtain() {
  const { tone, label } = useTone();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div className="absolute inset-0 bg-ink" initial={cover} animate={{ ...open, transition: { ...t, delay: 0.1 } }} exit={{ ...cover, transition: { ...t, delay: 0.1 } }} />
      <motion.div className="absolute inset-0" style={{ background: toneColors[tone] }} initial={cover} animate={{ ...open, transition: { ...t, delay: 0.02 } }} exit={{ ...cover, transition: t }} />
      <motion.div className="absolute inset-0 grid place-items-center" initial={{ opacity: 1 }} animate={{ opacity: 0, transition: { duration: 0.2 } }} exit={{ opacity: 1, transition: { delay: 0.32, duration: 0.2 } }}>
        <span className="font-display text-3xl font-extrabold text-ink sm:text-6xl">{label}</span>
      </motion.div>
    </div>
  );
}

// Direct child of AnimatePresence. Only opacity is animated on <main>: transforms here would
// break pinned ScrollTrigger scenes.
export default function PageShell({ children }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 750);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.main
        id="main"
        className="min-h-screen"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.5, duration: 0.45 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.4 } }}
      >
        {children}
      </motion.main>
      {!reduce && <Curtain />}
    </>
  );
}
