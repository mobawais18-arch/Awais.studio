import { useLayoutEffect, useRef } from "react";
import { LuRotateCw } from "react-icons/lu";
import { about } from "../config/about";
import { site } from "../config/site";
import { stack } from "../config/stack";
import { gsap } from "../lib/gsap";
import { container, cx } from "../lib/cx";
import FlipCard from "../components/FlipCard";
import Placeholder from "../components/Placeholder";
import ScrubText from "../components/ScrubText";
import SectionHead from "../components/SectionHead";

const flipBtn = "inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition-colors hover:border-white/60";

export function AboutStatement() {
  return (
    <section aria-label="Statement" className="flex min-h-[85vh] items-center pb-10 pt-40">
      <div className={container}>
        <ScrubText text={about.statement} className="max-w-5xl font-display text-[clamp(2rem,5.4vw,4.6rem)] font-bold leading-[1.1] tracking-tight" />
      </div>
    </section>
  );
}

function CardFront({ flip }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/20 bg-[#0c0e22] p-7">
      <div aria-hidden="true" className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-signal/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-gold/35 blur-3xl" />
      <div aria-hidden="true" className="shimmer absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative flex items-center justify-between">
        <span className="font-display text-sm font-extrabold tracking-[.2em]">AWAIS STUDIO</span>
        <span aria-hidden="true" className="h-7 w-9 rounded-md border border-white/30 bg-white/10" />
      </div>
      <div className="relative mx-auto mt-6 aspect-[3/4] w-[58%] overflow-hidden rounded-t-full border-2 border-white/30">
        {site.profileImage ? <img src={site.profileImage} alt={`Portrait of ${site.owner}`} className="h-full w-full object-cover" /> : <Placeholder kind="portrait" label="Profile photo" />}
      </div>
      <div className="relative mt-6">
        <p className="font-display text-4xl font-extrabold">{site.owner}</p>
        <p className="mt-1 text-sm font-semibold text-[#cfd6ff]">{about.frontTitle}</p>
        <p className="mt-1 text-xs text-mute">{site.tagline}</p>
      </div>
      <div className="relative mt-auto pt-4"><button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip card</button></div>
    </div>
  );
}

function CardBack({ flip }) {
  const skills = stack.flatMap((g) => g.items.map((i) => i.name)).filter((n) => n !== "Full-Stack Development");
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-[28px] border border-white/20 bg-[#0c0e22] p-7">
      <p className="text-sm leading-relaxed text-[#d7d4cc]">{about.intro}</p>
      <div>
        <h3 className="font-display text-sm font-bold">Directions</h3>
        <ul className="mt-2 grid gap-1.5 text-sm text-mute">
          {about.directions.map((d) => (
            <li key={d.title} className="flex items-center gap-2"><span aria-hidden="true" className={cx("h-2 w-2 rounded-full", d.tone === "dev" ? "bg-signal" : "bg-gold")} />{d.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-sm font-bold">Technical skills</h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">{skills.map((s) => (<li key={s} className="chip rounded-full px-2.5 py-1 text-[11px]">{s}</li>))}</ul>
      </div>
      <div>
        <h3 className="font-display text-sm font-bold">Interests</h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {about.interests.length
            ? about.interests.map((s) => (<li key={s} className="chip rounded-full px-2.5 py-1 text-[11px]">{s}</li>))
            : [0, 1, 2].map((k) => (<li key={k} className="rounded-full border border-dashed border-white/25 px-2.5 py-1 text-[11px] text-mute">Interest, add in about.js</li>))}
        </ul>
      </div>
      <div className="mt-auto"><button type="button" onClick={flip} className={flipBtn}><LuRotateCw size={15} aria-hidden="true" /> Flip back</button></div>
    </div>
  );
}

export function IdentityCard() {
  return (
    <section aria-label="Identity card" className="py-24 sm:py-32">
      <div className={cx(container, "flex flex-col items-center")}>
        <SectionHead title="My identity card." description="Flip it to read the other side." className="text-center [&_h2]:mx-auto [&_p]:mx-auto" />
        <FlipCard className="mt-14 h-[610px] w-[min(90vw,370px)]" front={(a) => <CardFront {...a} />} back={(a) => <CardBack {...a} />} />
      </div>
    </section>
  );
}

// Split-screen scroll scene (desktop): the event world wipes in from the right until the
// screen is shared half and half, then the studio line appears. Stacks on small screens.
export function Convergence() {
  const root = useRef(null);
  const evt = useRef(null);
  const line = useRef(null);
  const mid = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", pin: true, scrub: 0.7, anticipatePin: 1 } });
      tl.fromTo(evt.current, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 50%)", duration: 1 }, 0)
        .fromTo(line.current, { left: "100%" }, { left: "50%", duration: 1 }, 0)
        .fromTo(mid.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.7);
    });
    return () => mm.revert();
  }, []);

  const [dev, event] = about.directions;
  const side = "flex min-h-[70vh] flex-col justify-center px-6 py-16 sm:px-12 lg:absolute lg:inset-0 lg:min-h-0 lg:py-0";
  return (
    <section ref={root} aria-label="Two directions" className="relative overflow-hidden lg:h-screen">
      <div data-tone="dev" className={cx(side, "bg-[radial-gradient(70%_60%_at_25%_50%,rgba(91,124,255,.28),#07080f)] lg:pl-[8vw] lg:pr-[52vw]")}>
        <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{dev.title}</h2>
        <ul className="mt-6 grid gap-2 text-lg text-mute">{dev.points.map((p) => (<li key={p}>{p}</li>))}</ul>
      </div>
      <div ref={evt} data-tone="event" className={cx(side, "bg-[radial-gradient(70%_60%_at_75%_50%,rgba(242,181,68,.3),#0d0906)] lg:pl-[56vw] lg:pr-[8vw]")}>
        <h2 className="font-serif text-5xl leading-none sm:text-6xl">{event.title}</h2>
        <ul className="mt-6 grid gap-2 text-lg text-[#cbbf9f]">{event.points.map((p) => (<li key={p}>{p}</li>))}</ul>
      </div>
      <div ref={line} aria-hidden="true" className="bg-grad-brand absolute inset-y-0 left-1/2 z-10 hidden w-px lg:block" />
      <p ref={mid} className="grad-text bg-ink/0 px-6 py-10 text-center font-display text-3xl font-extrabold sm:text-5xl lg:absolute lg:inset-x-0 lg:bottom-[9%] lg:z-10 lg:py-0">{about.convergence}</p>
    </section>
  );
}
