import { cx } from "../lib/cx";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

export default function SectionHead({ title, description, serif = false, className }) {
  return (
    <div className={cx("max-w-3xl", className)}>
      <RevealText
        inView
        as="h2"
        text={title}
        className={cx(serif ? "font-serif text-5xl sm:text-7xl" : "font-display text-4xl font-extrabold sm:text-6xl", "leading-[1.02] tracking-tight text-balance")}
      />
      {description && (
        <Reveal delay={0.2}><p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{description}</p></Reveal>
      )}
    </div>
  );
}
