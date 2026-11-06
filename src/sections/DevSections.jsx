import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { freelancing } from "../config/freelancing";
import { platforms } from "../config/socials";
import { stack } from "../config/stack";
import { container, cx, isUrl } from "../lib/cx";
import { Icon } from "../lib/icons";
import Button from "../components/Button";
import CodeWindow from "../components/CodeWindow";
import Reveal from "../components/Reveal";
import RevealText from "../components/RevealText";
import SectionHead from "../components/SectionHead";
import Tilt from "../components/Tilt";

export function DevHero() {
  const github = platforms.find((p) => p.id === "github");
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(91,124,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(91,124,255,.08) 1px,transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(70% 70% at 60% 40%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 70% at 60% 40%, #000, transparent)" }} />
      <div aria-hidden="true" className="absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full bg-signal/25 blur-[120px]" />
      <div className={cx(container, "grid items-center gap-14 lg:grid-cols-2")}>
        <div>
          <RevealText as="h1" delay={0.6} text="Full-stack web development." className="font-display text-[clamp(2.6rem,6.6vw,5.4rem)] font-extrabold leading-[.98] tracking-tight text-balance" />
          <Reveal delay={0.9}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">From the interface to the API to the database: websites and web applications built with React, Node.js, Express.js, and MongoDB.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/projects" variant="dev">View projects</Button>
              {isUrl(github?.url) ? (
                <Button href={github.url} target="_blank" rel="noopener noreferrer" variant="ghost">GitHub</Button>
              ) : (
                <span role="link" aria-disabled="true" title="GitHub link coming soon" className="btn btn-ghost cursor-not-allowed opacity-45">GitHub, coming soon</span>
              )}
            </div>
          </Reveal>
        </div>
        <Reveal x={50} y={0} delay={0.9}>
          <Tilt max={7}><CodeWindow /></Tilt>
        </Reveal>
      </div>
    </section>
  );
}

export function StackBoard() {
  const spans = ["lg:col-span-2", "", "", "lg:col-span-2"];
  return (
    <section aria-label="Technology stack" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHead title="The stack I build with." description="Hover a technology to focus it." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {stack.map((g, i) => (
            <Reveal key={g.id} x={i % 2 ? 40 : -40} y={0} delay={(i % 2) * 0.08} className={spans[i]}>
              <section aria-labelledby={`stk-${g.id}`} className="panel h-full rounded-3xl p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-soft"><Icon name={g.icon} size={20} aria-hidden="true" /></span>
                  <h3 id={`stk-${g.id}`} className="font-display text-xl font-bold">{g.title}</h3>
                </div>
                <ul className="tile-list mt-6 flex flex-wrap gap-3">
                  {g.items.map((it) => (
                    <li key={it.name} className="tile flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                      <span aria-hidden="true" className="grid h-9 min-w-9 place-items-center rounded-lg bg-accent/15 px-1 font-mono text-xs font-medium text-accent-soft">{it.abbr}</span>
                      <span className="text-sm font-semibold">{it.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scroll-linked timeline: the line fills as the reader scrolls through the steps.
export function ProcessTimeline() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  return (
    <section aria-label="How I work" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHead title="How a project unfolds." description="A simple path from idea to launch. Edit these steps in src/config/freelancing.js." />
        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          <div aria-hidden="true" className="absolute left-[15px] top-0 h-full w-px bg-white/10 md:left-1/2">
            <motion.div style={{ scaleY: reduce ? 1 : scrollYProgress }} className="h-full origin-top bg-accent" />
          </div>
          {freelancing.process.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={s.title} x={left ? -40 : 40} y={0} className={cx("relative pb-16 pl-12 last:pb-0 md:w-1/2 md:pl-0", left ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16")}>
                <span aria-hidden="true" className={cx("absolute top-1.5 grid h-8 w-8 place-items-center rounded-full border border-accent bg-ink font-mono text-xs text-accent-soft left-0", left ? "md:left-auto md:-right-4" : "md:-left-4")}>{i + 1}</span>
                <h3 className="font-display text-3xl font-extrabold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
