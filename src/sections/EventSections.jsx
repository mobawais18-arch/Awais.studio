import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { events } from "../config/events";
import { container, cx, isUrl } from "../lib/cx";
import { Icon } from "../lib/icons";
import Button from "../components/Button";
import DirectChannels from "../components/DirectChannels";
import EnquiryForm from "../components/EnquiryForm";
import MaskImage from "../components/MaskImage";
import Marquee from "../components/Marquee";
import MicIllustration from "../components/MicIllustration";
import Parallax from "../components/Parallax";
import Placeholder from "../components/Placeholder";
import Reveal from "../components/Reveal";
import RevealText from "../components/RevealText";
import SectionHead from "../components/SectionHead";
import StageBeams from "../components/StageBeams";
import { useLenis } from "../components/SmoothScroll";

function useScrollTo() {
  const lenis = useLenis();
  return (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

export function EventsHero() {
  const go = useScrollTo();
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-linear-to-b from-[#170e05] via-[#0d0a0f] to-ink pt-28">
      <StageBeams className="-z-10 opacity-80" />
      <div className={cx(container, "grid flex-1 items-center gap-8 pb-16 lg:grid-cols-[1.15fr_.85fr]")}>
        <div>
          <RevealText as="h1" delay={0.6} text={events.headline} className="font-serif text-[clamp(3.6rem,10vw,8.6rem)] leading-[.9] tracking-tight text-balance" />
          <Reveal delay={1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#cbbf9f]">{events.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button variant="event" onClick={() => go("booking")}>Book me for your event</Button>
              <Button variant="ghost" onClick={() => go("gallery")}>See the gallery</Button>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[520px]">
          <div aria-hidden="true" className="absolute inset-x-6 bottom-6 h-12 rounded-[50%] bg-gold/30 blur-2xl" />
          <Parallax amount={30} className="h-full"><MicIllustration className="float-y mx-auto h-full drop-shadow-[0_30px_60px_rgba(242,181,68,.25)]" /></Parallax>
          <div className="absolute -left-2 bottom-14 h-28 w-24 -rotate-6 overflow-hidden rounded-lg border border-white/20 shadow-2xl sm:-left-10 sm:h-36 sm:w-28"><Placeholder kind="photo" label="Event photo" /></div>
          <div className="absolute -right-2 top-16 h-24 w-32 rotate-6 overflow-hidden rounded-lg border border-white/20 shadow-2xl sm:-right-8 sm:h-28 sm:w-40"><Placeholder kind="video" label="Event video" /></div>
        </div>
      </div>
      <Marquee duration={55} className="border-y border-gold/20 py-4">
        {[0, 1].map((k) => (
          <span key={k} className="flex items-center">
            {events.services.map((s) => (<span key={s.title} className="mx-6 font-serif text-3xl italic text-[#ffdc92]/80 sm:text-4xl">{s.title}<span className="mx-6 text-gold/60 not-italic">✦</span></span>))}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

// Typographic service list. On desktop a photo placeholder follows the cursor.
export function ServiceList() {
  const wrap = useRef(null);
  const [active, setActive] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 20 });
  const sy = useSpring(my, { stiffness: 140, damping: 20 });
  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  return (
    <section aria-label="Event services" className="py-28 sm:py-36">
      <div className={container}>
        <SectionHead serif title="Every role on the stage." description="From the opening welcome to the final announcement." />
        <div ref={wrap} className="relative mt-14" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
          <ul className="svc-list border-t border-white/12">
            {events.services.map((s, i) => (
              <li key={s.title} className="svc-row border-b border-white/12 transition-opacity duration-300" onPointerEnter={() => setActive(i)}>
                <div className="flex flex-col gap-3 py-7 md:flex-row md:items-center md:justify-between">
                  <h3 className="flex items-center gap-5 font-serif text-[clamp(2rem,5vw,4.4rem)] leading-none"><Icon name={s.icon} size={26} className="hidden text-gold sm:block" aria-hidden="true" />{s.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#b3a98d]">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {active !== null && (
              <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 -ml-32 -mt-24 hidden h-48 w-64 md:block">
                <motion.div className="h-full w-full -rotate-3 overflow-hidden rounded-xl border border-gold/40 shadow-2xl" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Placeholder kind="photo" label="Event photo placeholder" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Expanding panels: the active occasion opens wide, the others fold into slim strips (desktop).
export function Occasions() {
  const [active, setActive] = useState(0);
  return (
    <section aria-label="Occasions" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHead serif title="Made for the occasion." description="Choose an occasion to open it." />
        <div className="mt-14 flex flex-col gap-4 lg:h-[540px] lg:flex-row">
          {events.occasions.map((o, i) => {
            const on = active === i;
            return (
              <button
                key={o.title}
                type="button"
                aria-expanded={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ "--f": on ? 3.4 : 1 }}
                className={cx("relative min-h-[190px] overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br text-left transition-[flex] duration-700 ease-[cubic-bezier(.76,0,.24,1)] lg:min-h-0 lg:[flex:var(--f)_1_0%]", o.tone)}
              >
                <div aria-hidden="true" className={cx("absolute inset-0 transition-opacity duration-700", on ? "opacity-50" : "opacity-20")}><Placeholder kind="photo" label="Event photo placeholder" className="!bg-transparent" /></div>
                <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold"><Icon name={o.icon} size={22} aria-hidden="true" /></span>
                  <div>
                    <h3 className="font-serif text-4xl leading-none sm:text-5xl lg:whitespace-nowrap">{o.title}</h3>
                    <p className={cx("mt-3 max-w-sm text-[#d8ccab] transition-opacity duration-500", on ? "lg:opacity-100 lg:delay-300" : "lg:opacity-0")}>{o.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Tile({ item }) {
  const ratio = { portrait: "aspect-[3/4]", landscape: "aspect-[4/3]", square: "aspect-square" }[item.ratio] ?? "aspect-square";
  const video = item.type === "video";
  const media = (
    <MaskImage className={cx("rounded-2xl border border-white/10", ratio)}>
      {item.src ? <img src={item.src} alt={item.caption} loading="lazy" className="h-full w-full object-cover" /> : <Placeholder kind={video ? "video" : "photo"} label={item.caption} />}
    </MaskImage>
  );
  return (
    <figure>
      {video && isUrl(item.href) ? <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Watch: ${item.caption}`}>{media}</a> : media}
      <figcaption className="mt-2 text-xs text-[#a59b82]">{item.caption}</figcaption>
    </figure>
  );
}

// Three columns drift at different speeds while the section scrolls (parallax).
export function EventGallery() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const ys = [y0, y1, y2];
  const cols = [[], [], []];
  events.gallery.forEach((g, i) => cols[i % 3].push(g));
  return (
    <section id="gallery" aria-label="Event gallery" className="overflow-hidden py-28 sm:py-36">
      <div className={container}>
        <SectionHead serif title="The gallery." description="Photographs and videos from the stage will appear here. Add them in src/config/events.js." />
        <div ref={ref} className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {cols.map((col, ci) => (
            <motion.div key={ci} style={{ y: reduce ? 0 : ys[ci] }} className={cx("flex flex-col gap-4 md:gap-6", ci === 2 && "max-md:col-span-2 max-md:grid max-md:grid-cols-2")}>
              {col.map((item) => (<Tile key={item.id} item={item} />))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HostedEvents() {
  const list = events.hostedEvents;
  return (
    <section aria-label="Hosted events" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHead serif title="Events I've hosted." description={list.length ? undefined : "Hosted events will be listed here. The rows below are placeholders."} />
        <ul className="mt-12 grid gap-4">
          {list.length > 0
            ? list.map((e) => (
                <Reveal as="li" key={e.name}>
                  <div className="panel rounded-2xl p-6">
                    <h3 className="font-serif text-3xl">{e.name}</h3>
                    <p className="mt-2 text-sm text-mute">{[e.date, e.venue, e.role].filter(Boolean).join("  |  ")}</p>
                    {e.description && <p className="mt-3 text-mute">{e.description}</p>}
                  </div>
                </Reveal>
              ))
            : [0, 1, 2].map((k) => (
                <Reveal as="li" key={k} delay={k * 0.08}>
                  <div className="rounded-2xl border border-dashed border-white/20 p-6 sm:flex sm:items-center sm:justify-between">
                    <span className="font-serif text-3xl text-white/60">Event name</span>
                    <span className="mt-2 block text-sm text-mute sm:mt-0">Date  |  Venue  |  Your role</span>
                  </div>
                </Reveal>
              ))}
        </ul>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section id="booking" aria-label="Book an event" className="py-24 sm:py-32" data-tone="event">
      <div className={container}>
        <div className="panel grid gap-12 rounded-[2rem] p-7 sm:p-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-serif text-5xl leading-none sm:text-6xl">Book me for your event.</h2>
            <p className="mt-5 leading-relaxed text-[#cbbf9f]">Tell me the date, the occasion, and what you need from a host. I'll reply to confirm availability.</p>
            <div className="mt-8"><DirectChannels /></div>
          </Reveal>
          <Reveal delay={0.1}><EnquiryForm mode="event" /></Reveal>
        </div>
      </div>
    </section>
  );
}
