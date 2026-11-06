import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { freelancing } from "../config/freelancing";
import { container, cx, isUrl } from "../lib/cx";
import { Icon } from "../lib/icons";
import Button from "../components/Button";
import IndexRow from "../components/IndexRow";
import Reveal from "../components/Reveal";
import RevealText from "../components/RevealText";
import SectionHead from "../components/SectionHead";

export function FreelanceHero() {
  const url = freelancing.portfolioUrl;
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(91,124,255,.2),transparent)]" />
      <div className={container}>
        <RevealText as="h1" delay={0.6} text={freelancing.headline} className="max-w-4xl font-display text-[clamp(2.8rem,8vw,6.6rem)] font-extrabold leading-[.96] tracking-tight text-balance" />
        <Reveal delay={0.9}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{freelancing.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {isUrl(url) ? (
              <Button href={url} target="_blank" rel="noopener noreferrer" variant="dev">Freelancing portfolio <LuArrowUpRight size={17} aria-hidden="true" /></Button>
            ) : (
              <span role="link" aria-disabled="true" title="Link coming soon" className="btn btn-ghost cursor-not-allowed opacity-50">Freelancing portfolio, link coming soon</span>
            )}
            <Button to="/contact?type=project" variant="ghost">Start a project</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicePanel({ s, i, n, progress }) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / n, 1], [1, 0.93]);
  return (
    <motion.article
      style={{ top: `${92 + i * 16}px`, scale: reduce ? 1 : scale, transformOrigin: "top center" }}
      className="panel sticky mb-[14vh] grid gap-8 rounded-[2rem] border-t-2 border-t-accent/70 bg-linear-to-br from-[#14193a] to-[#0a0c1c] p-7 last:mb-0 sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-center"
    >
      <div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{s.title}</h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-mute">{s.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">{s.points.map((p) => (<li key={p} className="chip rounded-full px-3 py-1 text-xs">{p}</li>))}</ul>
      </div>
      <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-accent/15 text-accent-soft sm:h-28 sm:w-28"><Icon name={s.icon} size={44} aria-hidden="true" /></span>
        <Button to="/contact?type=project" variant="dev" magnetic={false}>Start this project</Button>
      </div>
    </motion.article>
  );
}

// Layered sticky panels: each service slides over the last while earlier ones recede.
export function ServiceStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = freelancing.services.length;
  return (
    <section aria-label="Freelance services" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHead title="What I can build for you." description="Six ways to work together, from a single website to a full custom application." />
        <div ref={ref} className="mt-14 pb-10">
          {freelancing.services.map((s, i) => (<ServicePanel key={s.title} s={s} i={i} n={n} progress={scrollYProgress} />))}
        </div>
      </div>
    </section>
  );
}

// The main portfolio link plus optional Upwork / Fiverr slots (shown only once a URL is set).
export function FreelanceProfiles() {
  const extras = freelancing.extraProfiles.filter((p) => isUrl(p.url));
  return (
    <section aria-label="Freelancing profiles" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHead title="Find my freelance profile." description="My freelancing portfolio lives on its own page. More freelance platforms are listed here as they are connected." />
        <ul className={cx("mt-12 border-t border-white/12")}>
          <IndexRow icon="briefcase" title="Freelancing Portfolio" description="My freelancing profile and portfolio." href={freelancing.portfolioUrl} featured />
          {extras.map((p) => (<IndexRow key={p.id} icon="briefcase" title={p.name} description={`My ${p.name} profile.`} href={p.url} />))}
        </ul>
      </div>
    </section>
  );
}
