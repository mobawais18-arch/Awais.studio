import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "./SmoothScroll";

const WORD = "AWAIS STUDIO".split("");

// First-visit intro: letters rise, a line fills, then the screen splits open like stage curtains.
export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("in");
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const a = setTimeout(() => setPhase("out"), 1900);
    const b = setTimeout(onDone, 2750);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [onDone]);

  const out = phase === "out";
  const ease = [0.76, 0, 0.24, 1];
  return (
    <div role="status" className="fixed inset-0 z-[100] overflow-hidden">
      <span className="sr-only">Loading Awais Studio</span>
      <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-ink" style={{ boxShadow: "inset -120px 0 160px -100px rgba(91,124,255,.55)" }} animate={{ x: out ? "-100%" : 0 }} transition={{ duration: 0.85, ease }} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-ink" style={{ boxShadow: "inset 120px 0 160px -100px rgba(242,181,68,.5)" }} animate={{ x: out ? "100%" : 0 }} transition={{ duration: 0.85, ease }} />
      <motion.div className="absolute inset-0 grid place-content-center justify-items-center gap-6" animate={{ opacity: out ? 0 : 1 }} transition={{ duration: 0.3 }}>
        <div aria-hidden="true" className="flex font-display text-[clamp(1.8rem,7vw,4.2rem)] font-extrabold tracking-[.12em]">
          {WORD.map((c, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                {c === " " ? "\u00A0" : c}
              </motion.span>
            </span>
          ))}
        </div>
        <div className="h-px w-48 overflow-hidden bg-white/15 sm:w-72">
          <motion.div className="bg-grad-brand h-full origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.7, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </div>
  );
}
