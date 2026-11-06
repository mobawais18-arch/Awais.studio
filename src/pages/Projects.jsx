import { usePageMeta } from "../hooks/usePageMeta";
import ContactCTA from "../sections/ContactCTA";
import { HostedDirectory, ProjectSlider } from "../sections/ProjectsSections";
import RevealText from "../components/RevealText";
import { container, cx } from "../lib/cx";

export default function Projects() {
  usePageMeta("Projects", "Projects and hosted websites by Awais, including Al-Nasr Karate Club.");
  return (
    <>
      <header className={cx(container, "pb-6 pt-36 sm:pt-44")}>
        <RevealText as="h1" delay={0.6} text="Projects & hosted websites." className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.8rem)] font-extrabold leading-[.98] tracking-tight text-balance" />
      </header>
      <ProjectSlider />
      <HostedDirectory />
      <ContactCTA />
    </>
  );
}
