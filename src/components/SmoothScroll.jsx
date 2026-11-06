import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

// Lenis owns scroll smoothing; GSAP's ticker drives it so ScrollTrigger stays in sync.
// Touch devices keep native scrolling (Lenis does not smooth touch by default).
export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (reduce) { setLenis(null); return undefined; }
    const instance = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
