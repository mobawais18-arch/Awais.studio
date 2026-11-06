import { usePageMeta } from "../hooks/usePageMeta";
import PlatformIndex from "../sections/PlatformIndex";
import RevealText from "../components/RevealText";
import { container, cx } from "../lib/cx";

export default function Socials() {
  usePageMeta("Socials", "Find Awais on YouTube, Instagram, Facebook, LinkedIn, WhatsApp, GitHub, and his freelancing portfolio.");
  return (
    <>
      <header className={cx(container, "pt-36 sm:pt-44")}>
        <RevealText as="h1" delay={0.6} text="Everywhere I am." className="max-w-4xl font-display text-[clamp(2.8rem,8vw,6.6rem)] font-extrabold leading-[.96] tracking-tight" />
      </header>
      <PlatformIndex title="Seven platforms, one place." description="Slots without a link yet are marked. Each becomes live as soon as its URL is added." />
    </>
  );
}
