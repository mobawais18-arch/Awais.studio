import { LuCheck, LuRotateCw } from "react-icons/lu";
import { identities } from "../config/identities";
import { events } from "../config/events";
import { projects } from "../config/projects";
import { stack } from "../config/stack";
import { container, cx } from "../lib/cx";
import { Icon } from "../lib/icons";
import BrowserFrame from "../components/BrowserFrame";
import Button from "../components/Button";
import CodeWindow from "../components/CodeWindow";
import FlipCard from "../components/FlipCard";
import MicIllustration from "../components/MicIllustration";
import Placeholder from "../components/Placeholder";
import { ProjectThumb } from "../components/ProjectParts";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import StageBeams from "../components/StageBeams";

const z = (px) => ({ transform: `translateZ(${px}px)` });
const flipBtn = "mt-4 inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent-soft";

function DevFront({ flip }) {
  const d = identities.developer;
  return (
    <div className="relative h-full rounded-[28px]" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-signal/35 bg-[#080b1c]" style={{ backgroundImage: "linear-gradient(rgba(91,124,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(91,124,255,.07) 1px,transparent 1px)", backgroundSize: "32px 32px" }}>
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/25 blur-3xl" />
      </div>
      <div className="relative flex h-full flex-col p-6 sm:p-8" style={{ transformStyle: "preserve-3d" }}>
        <h3 className="font-display text-3xl font-extrabold">{d.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">{d.summary}</p>
        <div className="relative mt-5 flex-1" style={{ transformStyle: "preserve-3d" }}>
          <div style={z(18)}><CodeWindow /></div>
          {d.chips.map((c, i) => (
            <div key={c} className="absolute" style={{ ...z(70), right: i % 2 ? "-6px" : "14%", top: `${-6 + i * 24}%` }}>
              <span className="glass float-y block rounded-full px-3 py-1.5 text-xs font-semibold text-[#a9baff]" style={{ animationDelay: `${-i * 1.4}s` }}>{c}</span>
            </div>
          ))}
          <div className="absolute -bottom-2 -right-2 hidden w-44 sm:block" style={z(90)}>
            <BrowserFrame url={projects[0]?.liveUrl}><ProjectThumb project={projects[0]} /></BrowserFrame>
          </div>
        </div>
        <button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip for more</button>
      </div>
    </div>
  );
}

function DevBack({ flip }) {
  const d = identities.developer;
  const skills = stack.flatMap((g) => g.items.map((i) => i.name)).filter((n) => n !== "Full-Stack Development");
  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-[28px] border border-signal/45 bg-[#0b1030] p-6 sm:p-8" data-tone="dev">
      <h3 className="font-display text-2xl font-extrabold">{d.backTitle}</h3>
      <ul className="mt-5 grid gap-2.5 text-sm">
        {d.points.map((p) => (<li key={p} className="flex items-center gap-3"><LuCheck className="text-accent" aria-hidden="true" />{p}</li>))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-2">
        {skills.map((s) => (<li key={s} className="chip rounded-full px-3 py-1 text-xs">{s}</li>))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <Button to={d.cta.to} variant="dev" magnetic={false}>{d.cta.label}</Button>
        <Button to={d.secondary.to} variant="ghost" magnetic={false}>{d.secondary.label}</Button>
      </div>
      <button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip back</button>
    </div>
  );
}

function HostFront({ flip }) {
  const h = identities.host;
  return (
    <div className="relative h-full rounded-[28px]" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-gold/35 bg-linear-to-b from-[#1c1208] via-[#120c10] to-[#08070d]">
        <StageBeams />
        <div aria-hidden="true" className="absolute inset-x-8 bottom-24 h-10 rounded-[50%] bg-gold/25 blur-xl" />
      </div>
      <div className="relative flex h-full flex-col p-6 sm:p-8" style={{ transformStyle: "preserve-3d" }}>
        <h3 className="font-serif text-4xl leading-none sm:text-5xl">{h.title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#cbbf9f]">{h.summary}</p>
        <div className="relative mt-4 flex-1" style={{ transformStyle: "preserve-3d" }}>
          <MicIllustration className="float-y absolute left-1/2 top-0 h-[85%] -translate-x-1/2" />
          <div className="absolute bottom-6 left-0 h-28 w-24 -rotate-6 overflow-hidden rounded-lg border border-white/20 shadow-xl" style={z(60)}><Placeholder kind="photo" label="Event photo" /></div>
          <div className="absolute bottom-10 right-0 h-24 w-32 rotate-6 overflow-hidden rounded-lg border border-white/20 shadow-xl" style={z(80)}><Placeholder kind="video" label="Event video" /></div>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {h.chips.map((c) => (<li key={c} className="rounded-full border border-gold/40 px-3 py-1 text-xs text-[#ffdc92]">{c}</li>))}
        </ul>
        <button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip for more</button>
      </div>
    </div>
  );
}

function HostBack({ flip }) {
  const h = identities.host;
  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-[28px] border border-gold/45 bg-[#150e08] p-6 sm:p-8" data-tone="event">
      <h3 className="font-serif text-4xl leading-none">{h.backTitle}</h3>
      <ul className="mt-5 grid gap-3 text-sm">
        {events.services.map((s) => (
          <li key={s.title} className="flex items-center gap-3"><Icon name={s.icon} className="text-accent" size={16} aria-hidden="true" />{s.title}</li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <Button to={h.cta.to} variant="event" magnetic={false}>{h.cta.label}</Button>
        <Button to={h.secondary.to} variant="ghost" magnetic={false}>{h.secondary.label}</Button>
      </div>
      <button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip back</button>
    </div>
  );
}

export default function IdentityGateway() {
  return (
    <section id="worlds" aria-label="Choose a world" className="relative py-28 sm:py-36">
      <div className={container}>
        <SectionHead title="Two identities. One studio." description="Choose a world to explore. Tap a card to flip it." />
        <div className="relative mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
          <div aria-hidden="true" className="horizon-line pointer-events-none absolute left-1/2 top-0 hidden h-full w-px md:block">
            <span className="horizon-dot bg-grad-brand absolute -left-[3px] h-2 w-2 rounded-full" />
          </div>
          <Reveal x={-60} y={0}>
            <FlipCard className={cx("h-[600px] sm:h-[590px]")} front={(a) => <DevFront {...a} />} back={(a) => <DevBack {...a} />} />
          </Reveal>
          <Reveal x={60} y={0} delay={0.12} className="md:mt-24">
            <FlipCard className={cx("h-[600px] sm:h-[590px]")} front={(a) => <HostFront {...a} />} back={(a) => <HostBack {...a} />} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
