import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Tilt from "./Tilt";

// 3D flip card. `front` and `back` are render functions receiving { flip, flipped }.
// The hidden face is removed from the tab order and the accessibility tree via visibility.
export default function FlipCard({ front, back, className }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const flip = () => setFlipped((v) => !v);
  const api = { flip, flipped };
  const face = (hide) => ({ visibility: hide ? "hidden" : "visible", transition: `visibility 0s linear ${hide ? "0.32s" : "0s"}` });

  return (
    <Tilt className={className} max={6}>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 64, damping: 15 }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]" style={face(flipped)}>
          {front(api)}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateY(180deg)]" style={face(!flipped)}>
          {back(api)}
        </div>
      </motion.div>
    </Tilt>
  );
}
