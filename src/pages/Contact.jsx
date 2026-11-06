import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { enquiryForms } from "../config/forms";
import { usePageMeta } from "../hooks/usePageMeta";
import { container, cx } from "../lib/cx";
import DirectChannels from "../components/DirectChannels";
import EnquiryForm from "../components/EnquiryForm";
import RevealText from "../components/RevealText";

// One contact page, two modes. The tone (and so the accent colour) follows the chosen mode.
export default function Contact() {
  usePageMeta("Contact", "Contact Awais about a web project or an event booking.");
  const [params, setParams] = useSearchParams();
  const mode = params.get("type") === "event" ? "event" : "project";
  const form = enquiryForms[mode];
  const choose = (m) => setParams({ type: m }, { replace: true });

  return (
    <div data-tone={form.tone} className="transition-colors">
      <header className={cx(container, "pb-8 pt-36 sm:pt-44")}>
        <RevealText as="h1" delay={0.6} text="Let's talk." className="font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[.95] tracking-tight" />
      </header>
      <div className={cx(container, "pb-12")}>
        <div role="tablist" aria-label="Type of enquiry" className="glass relative inline-flex rounded-full p-1">
          {Object.entries(enquiryForms).map(([key, f]) => (
            <button key={key} role="tab" type="button" aria-selected={mode === key} onClick={() => choose(key)} className="relative rounded-full px-5 py-2.5 text-sm font-bold">
              {mode === key && <motion.span layoutId="contact-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className={cx("relative", mode === key ? "text-ink" : "text-mute")}>{f.tab}</span>
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className={cx("text-4xl leading-tight", mode === "event" ? "font-serif sm:text-5xl" : "font-display font-extrabold")}>{form.title}</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-mute">{mode === "event" ? "Share the date, the occasion, and what you need from a host." : "Describe what you'd like to build and I'll reply with next steps."}</p>
            <div className="mt-8"><DirectChannels /></div>
          </div>
          <div className="panel rounded-[2rem] p-7 sm:p-10"><EnquiryForm key={mode} mode={mode} /></div>
        </div>
      </div>
    </div>
  );
}
