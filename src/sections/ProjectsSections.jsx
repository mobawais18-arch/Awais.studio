import { useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../config/projects";
import { websites } from "../config/websites";
import { container } from "../lib/cx";
import BrowserFrame from "../components/BrowserFrame";
import Button from "../components/Button";
import IndexRow from "../components/IndexRow";
import LinkOrPending from "../components/LinkOrPending";
import { ProjectThumb, TechList, linkStyle } from "../components/ProjectParts";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Tilt from "../components/Tilt";

function SliderCard({ p }) {
  return (
    <Tilt className="w-[min(86vw,540px)] shrink-0 snap-center" max={5}>
      <article className="panel h-full rounded-[2rem] p-5 sm:p-6">
        <BrowserFrame url={p.liveUrl}><ProjectThumb project={p} /></BrowserFrame>
        <h3 className="mt-6 font-display text-3xl font-extrabold">{p.title}</h3>
        <p className="mt-2 leading-relaxed text-mute">{p.summary}</p>
        <div className="mt-4"><TechList tech={p.tech} /></div>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <LinkOrPending href={p.liveUrl} className={linkStyle}><LuExternalLink size={15} aria-hidden="true" /> Live website</LinkOrPending>
          <LinkOrPending href={p.repoUrl} className={linkStyle}><FaGithub size={15} aria-hidden="true" /> GitHub</LinkOrPending>
        </div>
        <div className="mt-6"><Button to={`/projects/${p.slug}`} variant="dev" magnetic={false}>View details</Button></div>
      </article>
    </Tilt>
  );
}

// Native scroll-snap slider (touch, trackpad and keyboard friendly) with 3D tilt cards.
export function ProjectSlider() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const by = (dir) => ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const ctl = "grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-accent-soft hover:text-accent-soft";
  return (
    <section aria-label="Project slider" className="py-16 sm:py-24">
      <div className={container}>
        <SectionHead title="Project showcase." description="Slide through the projects. Each card tilts toward your pointer." />
      </div>
      <div ref={ref} onScroll={onScroll} role="region" aria-label="Projects, scrollable" tabIndex={0} className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-10 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (<SliderCard key={p.slug} p={p} />))}
        <div className="grid w-[min(86vw,360px)] shrink-0 snap-center place-items-center rounded-[2rem] border border-dashed border-white/20 p-8 text-center text-mute">Your next project will appear here.</div>
      </div>
      <div className={`${container} flex items-center gap-6`}>
        <div className="h-px flex-1 bg-white/15"><div className="h-[3px] origin-left -translate-y-px bg-accent transition-transform" style={{ transform: `scaleX(${0.15 + progress * 0.85})` }} /></div>
        <div className="flex gap-3">
          <button type="button" aria-label="Previous projects" onClick={() => by(-1)} className={ctl}><LuArrowLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Next projects" onClick={() => by(1)} className={ctl}><LuArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

export function HostedDirectory() {
  return (
    <section aria-label="Hosted websites" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHead title="Hosted websites." description="Websites I develop, deploy, or manage. Add more in src/config/websites.js." />
        <ul className="mt-12 border-t border-white/12">
          {websites.map((w, i) => (<IndexRow key={w.name} icon="globe" title={w.name} description={w.description} href={w.url} featured={w.featured} delay={i * 0.06} />))}
        </ul>
        <Reveal delay={0.2}><p className="mt-8 text-sm text-mute">More websites will be listed here as they launch.</p></Reveal>
      </div>
    </section>
  );
}
