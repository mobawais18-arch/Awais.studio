import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuArrowUpRight, LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../config/projects";
import { container, cx } from "../lib/cx";
import BrowserFrame from "../components/BrowserFrame";
import Button from "../components/Button";
import Disclosure from "../components/Disclosure";
import LinkOrPending from "../components/LinkOrPending";
import { ProjectThumb, TechList, linkStyle } from "../components/ProjectParts";
import SectionHead from "../components/SectionHead";
import Tilt from "../components/Tilt";

// Interactive showcase: choose a project from the list and its browser preview is revealed
// with a clip-path wipe. Scales to any number of projects in config/projects.js.
export default function ProjectShowcase({ title = "Featured website", description = "A website I developed and manage. Choose a project to preview it.", items }) {
  const list = items ?? projects.filter((p) => p.featured);
  const [i, setI] = useState(0);
  const p = list[i] ?? list[0];
  if (!p) return null;

  return (
    <section aria-label="Project showcase" className="py-28 sm:py-36">
      <div className={container}>
        <SectionHead title={title} description={description} />
        <div className="mt-14 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <ul className="border-y border-white/12">
              {list.map((it, idx) => (
                <li key={it.slug} className="border-b border-white/12 last:border-b-0">
                  <button type="button" aria-pressed={idx === i} onClick={() => setI(idx)} onMouseEnter={() => setI(idx)} onFocus={() => setI(idx)} className={cx("group flex w-full items-center justify-between py-5 text-left font-display text-3xl font-bold transition-colors sm:text-4xl", idx === i ? "text-bone" : "text-mute hover:text-bone")}>
                    {it.title}
                    <LuArrowUpRight aria-hidden="true" className={cx("transition-all duration-300", idx === i ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-100")} />
                  </button>
                </li>
              ))}
              <li className="border-t border-dashed border-white/15 py-4 text-sm text-mute">More projects will appear here.</li>
            </ul>

            <p className="mt-8 max-w-md leading-relaxed text-mute">{p.summary}</p>
            <div className="mt-5"><TechList tech={p.tech} /></div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <LinkOrPending href={p.liveUrl} className={linkStyle}><LuExternalLink size={15} aria-hidden="true" /> Live website</LinkOrPending>
              <LinkOrPending href={p.repoUrl} className={linkStyle}><FaGithub size={15} aria-hidden="true" /> GitHub repository</LinkOrPending>
            </div>
            <div className="mt-8">
              <Disclosure title="Project details">
                <p>{p.description}</p>
                {p.descriptionIsPlaceholder && <p className="mt-3 text-xs text-accent-soft">Placeholder text. Edit it in src/config/projects.js.</p>}
                <div className="mt-5"><Button to={`/projects/${p.slug}`} variant="ghost" magnetic={false}>Open full details</Button></div>
              </Disclosure>
            </div>
          </div>

          <Tilt max={6}>
            <BrowserFrame url={p.liveUrl}>
              <AnimatePresence mode="wait">
                <motion.div key={p.slug} className="h-full w-full" initial={{ clipPath: "inset(0% 100% 0% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} exit={{ clipPath: "inset(0% 0% 0% 100%)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
                  <ProjectThumb project={p} />
                </motion.div>
              </AnimatePresence>
            </BrowserFrame>
          </Tilt>
        </div>
        <div className="mt-12"><Link to="/projects" className="font-semibold text-accent-soft underline-offset-8 hover:underline">All projects and hosted websites</Link></div>
      </div>
    </section>
  );
}
