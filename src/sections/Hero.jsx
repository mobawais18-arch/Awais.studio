import { motion, useReducedMotion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { site } from "../config/site";
import { container, cx } from "../lib/cx";
import { useReady } from "../lib/tone";
import Button from "../components/Button";
import Marquee from "../components/Marquee";
import Placeholder from "../components/Placeholder";
import RevealText from "../components/RevealText";
import UniverseCanvas from "../components/UniverseCanvas";
import { useLenis } from "../components/SmoothScroll";

const ticker = ["Web Development", "MC Services", "React", "Event Hosting", "Node.js", "Stage Hosting", "Full-Stack", "Event Organization"];

export default function Hero() {
  const ready = useReady();
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const explore = () => {
    const el = document.getElementById("worlds");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -30, duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32">
      <UniverseCanvas className="absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_30%,rgba(91,124,255,.18),transparent),radial-gradient(60%_60%_at_85%_70%,rgba(242,181,68,.14),transparent)]" />

      <div className={cx(container, "grid flex-1 items-center gap-14 pb-16 lg:grid-cols-[1.15fr_.85fr]")}>
        <div>
          <RevealText
            as="h1"
            ready={ready}
            delay={0.15}
            text="Welcome to My Digital Universe."
            className="font-display text-[clamp(2.7rem,7.4vw,6.3rem)] font-extrabold leading-[.96] tracking-tight text-balance"
          />
          <motion.p {...fade(0.9)} className="grad-text mt-7 max-w-xl font-display text-xl font-semibold leading-snug sm:text-2xl">
            Technology, Creativity &amp; Experiences — All in One Space.
          </motion.p>
          <motion.p {...fade(1.05)} className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
            I'm {site.owner}. I build websites and web applications, and I host and organize events. Awais Studio is where both worlds meet.
          </motion.p>
          <motion.div {...fade(1.2)} className="mt-7 flex items-center gap-4">
            <span aria-hidden="true" className="bg-grad-brand h-11 w-[3px] rounded-full" />
            <p>
              <span className="block font-display text-xl font-bold">{site.owner}</span>
              <span className="text-sm text-mute">{site.titles.join("  |  ")}</span>
            </p>
          </motion.div>
          <motion.div {...fade(1.35)} className="mt-10 flex flex-wrap gap-4">
            <Button onClick={explore}>Explore My World <LuArrowRight size={17} aria-hidden="true" /></Button>
            <Button to="/contact" variant="ghost">Let's Connect</Button>
          </motion.div>
        </div>

        <div className="relative mx-auto w-[min(74vw,380px)]">
          <div aria-hidden="true" className="bg-grad-brand absolute -inset-8 rounded-full opacity-25 blur-3xl" />
          <motion.div
            className="bg-grad-brand relative aspect-[3/4] rounded-t-full p-[3px]"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-full w-full overflow-hidden rounded-t-full bg-ink-2">
              {site.profileImage ? <img src={site.profileImage} alt={`Portrait of ${site.owner}`} className="h-full w-full object-cover" /> : <Placeholder kind="portrait" />}
            </div>
          </motion.div>
          <span className="glass float-y absolute -left-4 top-[18%] rounded-full px-4 py-2 text-sm font-semibold text-[#a9baff] sm:-left-10">Web Developer</span>
          <span className="glass float-y absolute -right-3 bottom-[16%] rounded-full px-4 py-2 text-sm font-semibold text-[#ffdc92] [animation-delay:-3s] sm:-right-10">MC &amp; Event Host</span>
        </div>
      </div>

      <Marquee duration={50} className="border-y border-white/10 py-5">
        {[0, 1].map((k) => (
          <span key={k} className="flex items-center">
            {ticker.map((t) => (
              <span key={t} className="text-outline mx-6 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
                {t}<span className="mx-6 text-accent/70">✦</span>
              </span>
            ))}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
