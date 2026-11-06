import { motion, useReducedMotion } from "framer-motion";

const C = { k: "text-[#8fa8ff]", v: "text-bone", s: "text-cyan", p: "text-mute", c: "text-mute/70 italic" };
const lines = [
  [["// awais.studio", "c"]],
  [["const ", "k"], ["awais", "v"], [" = {", "p"]],
  [["  role", "v"], [": ", "p"], ['"Full-Stack Web Developer"', "s"], [",", "p"]],
  [["  stack", "v"], [": [", "p"], ['"React"', "s"], [", ", "p"], ['"Node.js"', "s"], [", ", "p"], ['"MongoDB"', "s"], ["],", "p"]],
  [["  freelance", "v"], [": ", "p"], ["true", "k"], [",", "p"]],
  [["};", "p"]],
];

// Developer visual: code that types itself in, plus a skeleton UI that shimmers beneath it.
export default function CodeWindow({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/15 bg-[#0a0c1b]/90 font-mono text-[13px] shadow-2xl shadow-signal/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/80" /><span className="h-2.5 w-2.5 rounded-full bg-gold/80" /><span className="h-2.5 w-2.5 rounded-full bg-cyan/80" />
        <span className="ml-3 text-xs text-mute">awais.config.js</span>
      </div>
      <motion.div className="px-5 py-4 leading-7" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.28, delayChildren: 0.2 } } }}>
        {lines.map((line, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="whitespace-pre">
            <span className="mr-4 select-none text-mute/40">{i + 1}</span>
            {line.map(([t, k], j) => (<span key={j} className={C[k]}>{t}</span>))}
            {i === lines.length - 1 && <span className="caret ml-1 inline-block h-4 w-[7px] translate-y-0.5 bg-accent" />}
          </motion.div>
        ))}
      </motion.div>
      <div className="mx-5 mb-5 rounded-xl border border-white/10 bg-white/[.03] p-4" aria-hidden="true">
        <div className="flex items-center gap-3">
          <div className="shimmer h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2"><div className="shimmer h-2.5 w-2/3 rounded" /><div className="shimmer h-2.5 w-1/3 rounded" /></div>
          <div className="h-8 w-20 rounded-full bg-signal/70" />
        </div>
      </div>
    </div>
  );
}
