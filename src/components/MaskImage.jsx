import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../lib/cx";

const hidden = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

// Clip-path mask reveal with an inner scale settle. Children = image or placeholder.
export default function MaskImage({ children, direction = "up", delay = 0, className, duration = 1.1 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cx("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: hidden[direction] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: duration + 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
