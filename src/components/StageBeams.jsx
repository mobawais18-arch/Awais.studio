import { cx } from "../lib/cx";

const beams = [
  { left: "-6%", rot: "-14deg", dur: "10s", color: "rgba(242,181,68,.55)" },
  { left: "32%", rot: "0deg", dur: "12s", color: "rgba(232,69,124,.45)" },
  { left: "70%", rot: "14deg", dur: "9s", color: "rgba(255,226,160,.5)" },
];

export default function StageBeams({ className }) {
  return (
    <div aria-hidden="true" className={cx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {beams.map((b, i) => (
        <div key={i} className="beam" style={{ left: b.left, "--r": b.rot, "--d": b.dur, background: `linear-gradient(to bottom, ${b.color}, transparent 88%)` }} />
      ))}
    </div>
  );
}
