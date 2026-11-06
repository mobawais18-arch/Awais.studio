import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { story } from "../config/story";
import { projects } from "../config/projects";
import { gsap } from "../lib/gsap";
import { cx } from "../lib/cx";
import BrowserFrame from "../components/BrowserFrame";
import MicIllustration from "../components/MicIllustration";
import Placeholder from "../components/Placeholder";
import { ProjectThumb } from "../components/ProjectParts";
import StageBeams from "../components/StageBeams";
import Tilt from "../components/Tilt";

const chips = [
  ["React.js", "left-[4%] top-[8%]"], ["Node.js", "right-[6%] top-[20%]"], ["MongoDB", "left-[18%] top-[46%]"],
  ["Express.js", "right-[4%] top-[58%]"], ["Tailwind CSS", "left-[2%] bottom-[10%]"], ["Redux", "right-[22%] bottom-[2%]"],
];

function Visual({ kind }) {
  if (kind === "stack") {
    return (
      <div className="relative mx-auto h-[360px] w-full max-w-md" aria-hidden="true">
        {chips.map(([name, pos], i) => (
          <span key={name} className={cx("glass float-y absolute rounded-2xl px-5 py-3 font-mono text-sm font-medium text-[#a9baff]", pos)} style={{ animationDelay: `${-i * 1.1}s` }}>{name}</span>
        ))}
      </div>
    );
  }
  if (kind === "browser") {
    return (
      <Tilt className="mx-auto w-full max-w-xl" max={7}>
        <BrowserFrame url={projects[0]?.liveUrl}><ProjectThumb project={projects[0]} /></BrowserFrame>
      </Tilt>
    );
  }
  if (kind === "stage") {
    return (
      <div className="relative mx-auto h-[400px] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/25 bg-linear-to-b from-[#1c1208] to-[#09080d]" aria-hidden="true">
        <StageBeams />
        <MicIllustration className="float-y relative mx-auto h-full py-6" />
      </div>
    );
  }
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-md" aria-hidden="true">
      <div className="absolute left-0 top-4 h-56 w-44 -rotate-6 overflow-hidden rounded-xl border border-white/20 shadow-2xl"><Placeholder kind="photo" label="Event photo" /></div>
      <div className="absolute right-0 top-0 h-48 w-56 rotate-3 overflow-hidden rounded-xl border border-white/20 shadow-2xl"><Placeholder kind="video" label="Event video" /></div>
      <div className="absolute bottom-0 left-1/4 h-44 w-52 rotate-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl"><Placeholder kind="photo" label="Event photo" /></div>
    </div>
  );
}

function Panel({ s }) {
  const event = s.tone === "event";
  return (
    <article data-tone={s.tone} className="relative flex min-h-[80vh] w-full shrink-0 items-center px-6 py-20 sm:px-12 lg:h-screen lg:w-screen lg:px-[8vw] lg:py-0">
      <span aria-hidden="true" className="text-outline pointer-events-none absolute -bottom-4 left-[3vw] select-none font-display text-[clamp(7rem,21vw,19rem)] font-extrabold leading-none opacity-60">{s.word}</span>
      <div className="relative grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className={cx("text-balance leading-[1.02] tracking-tight", event ? "font-serif text-5xl sm:text-7xl" : "font-display text-4xl font-extrabold sm:text-6xl")}>{s.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">{s.body}</p>
          <Link to={s.cta.to} className="group mt-8 inline-flex items-center gap-3 border-b border-accent pb-1 font-semibold text-accent-soft">
            {s.cta.label}<LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <Visual kind={s.visual} />
        </motion.div>
      </div>
    </article>
  );
}

// Pinned horizontal scroll (desktop only). The background colour crossfades from developer
// blue to stage gold as the journey moves from "Launch" to "Host". Below 1024px, or with
// reduced motion, the scenes simply stack.
export default function Journey() {
  const root = useRef(null);
  const track = useRef(null);
  const evtBg = useRef(null);
  const bar = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true },
      });
      tl.to(track.current, { x: () => -dist(), duration: 1 }, 0)
        .fromTo(evtBg.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.inOut" }, 0.3)
        .fromTo(bar.current, { scaleX: 0, backgroundColor: "#5b7cff" }, { scaleX: 1, duration: 1 }, 0)
        .to(bar.current, { backgroundColor: "#f2b544", duration: 0.3 }, 0.35);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="journey" aria-label="What I do" className="relative overflow-hidden lg:h-screen">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_40%,rgba(91,124,255,.16),transparent),linear-gradient(#07080f,#07080f)]" />
      <div ref={evtBg} aria-hidden="true" className="absolute inset-0 opacity-0 max-lg:hidden bg-[radial-gradient(80%_70%_at_70%_40%,rgba(242,181,68,.2),transparent),linear-gradient(#0d0906,#0d0906)]" />
      <div ref={track} className="relative flex flex-col lg:h-screen lg:w-max lg:flex-row">
        {story.map((s) => (<Panel key={s.id} s={s} />))}
      </div>
      <div aria-hidden="true" className="absolute inset-x-[8vw] bottom-8 hidden h-px bg-white/15 lg:block">
        <div ref={bar} className="h-[3px] origin-left bg-signal" />
      </div>
    </section>
  );
}
