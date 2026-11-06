import { motion, useReducedMotion } from "framer-motion";

// Word-by-word masked text reveal. `inView` triggers on scroll, otherwise on `ready`.
export default function RevealText({ text, as = "h2", className, delay = 0, stagger = 0.07, inView = false, ready = true }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
    : { animate: ready ? "show" : "hidden" };
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true" className="mr-[.26em] inline-block overflow-hidden pb-[.14em] align-bottom -mb-[.14em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", rotate: 5 },
              show: { y: 0, rotate: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
