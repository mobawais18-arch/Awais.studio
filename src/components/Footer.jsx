import { Link } from "react-router-dom";
import { site } from "../config/site";
import { platforms } from "../config/socials";
import { Icon } from "../lib/icons";
import { container, cx, isUrl } from "../lib/cx";
import Logo from "./Logo";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-white/10 bg-ink-2/60">
      <div aria-hidden="true" className="bg-grad-brand h-px w-full opacity-70" />
      <Marquee duration={60} className="py-8">
        {[0, 1, 2].map((k) => (
          <span key={k} className="text-outline mx-8 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-none tracking-tight">
            AWAIS STUDIO <span className="mx-6 text-accent/60">✦</span> {site.tagline.toUpperCase()} <span className="mx-6 text-accent/60">✦</span>
          </span>
        ))}
      </Marquee>

      <div className={cx(container, "grid gap-12 pb-14 pt-6 md:grid-cols-[1.4fr_1fr_1fr]")}>
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">Technology, creativity and experiences, all in one space.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-display text-base font-bold">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm text-mute">
            {site.nav.map((item) => (
              <li key={item.to}><Link to={item.to} className="transition-colors hover:text-accent-soft">{item.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-base font-bold">Platforms</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {platforms.map((p) => {
              const live = isUrl(p.url);
              const base = "grid h-10 w-10 place-items-center rounded-full border border-white/15";
              const icon = <Icon name={p.icon} size={17} aria-hidden="true" />;
              return (
                <li key={p.id}>
                  {live ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className={cx(base, "transition-colors hover:border-accent-soft hover:text-accent-soft")}>{icon}</a>
                  ) : (
                    <span role="link" aria-disabled="true" aria-label={`${p.name} (link coming soon)`} title="Link coming soon" className={cx(base, "cursor-not-allowed opacity-40")}>{icon}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className={cx(container, "py-6 text-sm text-mute")}>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
