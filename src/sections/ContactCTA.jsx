import { container } from "../lib/cx";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import RevealText from "../components/RevealText";

// Closing split: a project path (blue) and an event path (gold).
export default function ContactCTA() {
  return (
    <section aria-label="Get in touch" className="relative overflow-hidden py-28 sm:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_15%_60%,rgba(91,124,255,.22),transparent),radial-gradient(50%_70%_at_85%_60%,rgba(242,181,68,.2),transparent)]" />
      <div className={container}>
        <RevealText inView as="h2" text="Let's build something. Or host something." className="max-w-5xl font-display text-[clamp(2.4rem,7vw,6rem)] font-extrabold leading-[.98] tracking-tight text-balance" />
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-lg text-mute">Tell me about your website, your application, or your event.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/contact?type=project" variant="dev">Start a web project</Button>
            <Button to="/contact?type=event" variant="event">Book me for an event</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
