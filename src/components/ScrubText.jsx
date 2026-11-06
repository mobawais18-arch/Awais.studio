import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }} className="mr-[.28em] inline-block">{children}</motion.span>;
}

// Scroll-scrubbed paragraph: each word lights up as you read down the page.
export default function ScrubText({ text, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} range={[start, start + 1 / words.length]} progress={scrollYProgress}>
            <span aria-hidden="true">{w}</span>
          </Word>
        );
      })}
    </p>
  );
}
