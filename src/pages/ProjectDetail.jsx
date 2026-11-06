import { Link, useParams } from "react-router-dom";
import { LuArrowLeft, LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../config/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { container, cx } from "../lib/cx";
import BrowserFrame from "../components/BrowserFrame";
import Disclosure from "../components/Disclosure";
import LinkOrPending from "../components/LinkOrPending";
import MaskImage from "../components/MaskImage";
import { ProjectThumb, TechList, linkStyle } from "../components/ProjectParts";
import Reveal from "../components/Reveal";
import RevealText from "../components/RevealText";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  usePageMeta(p?.title ?? "Project not found", p?.summary);
  if (!p) return <NotFound />;
  return (
    <article className={cx(container, "pb-12 pt-36 sm:pt-44")}>
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-mute transition-colors hover:text-accent-soft"><LuArrowLeft size={16} aria-hidden="true" /> All projects</Link>
      <RevealText as="h1" delay={0.6} text={p.title} className="mt-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[.98] tracking-tight text-balance" />
      <Reveal delay={0.9}><p className="mt-5 max-w-2xl text-lg text-mute">{p.summary}</p></Reveal>
      <MaskImage className="mt-12 rounded-3xl" duration={1.3}>
        <BrowserFrame url={p.liveUrl}><ProjectThumb project={p} /></BrowserFrame>
      </MaskImage>
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Disclosure title="About this project" defaultOpen>
            <p className="max-w-prose">{p.description}</p>
            {p.descriptionIsPlaceholder && <p className="mt-3 text-xs text-accent-soft">Placeholder text. Edit it in src/config/projects.js.</p>}
          </Disclosure>
          <Disclosure title="Technologies" defaultOpen><TechList tech={p.tech} /></Disclosure>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl font-bold">Links</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <LinkOrPending href={p.liveUrl} className={linkStyle}><LuExternalLink size={15} aria-hidden="true" /> Live website</LinkOrPending>
            <LinkOrPending href={p.repoUrl} className={linkStyle}><FaGithub size={15} aria-hidden="true" /> GitHub repository</LinkOrPending>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
