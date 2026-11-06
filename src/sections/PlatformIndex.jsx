import { platforms } from "../config/socials";
import { container } from "../lib/cx";
import IndexRow from "../components/IndexRow";
import SectionHead from "../components/SectionHead";

export default function PlatformIndex({ title = "My digital platforms", description = "Every platform has a place here. Slots without a link yet are marked and become live as soon as a URL is added." }) {
  return (
    <section aria-label="Digital platforms" className="py-28 sm:py-36">
      <div className={container}>
        <SectionHead title={title} description={description} />
        <ul className="mt-14 border-t border-white/12">
          {platforms.map((p, i) => (
            <IndexRow key={p.id} icon={p.icon} title={p.name} description={p.description} href={p.url} featured={p.featured} delay={i * 0.05} />
          ))}
        </ul>
      </div>
    </section>
  );
}
