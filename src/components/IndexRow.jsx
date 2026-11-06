import { motion, useReducedMotion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { Icon } from "../lib/icons";
import { cx, isUrl } from "../lib/cx";

// Editorial list row used for platforms and hosted websites. Hover wipes a tint across the row.
export default function IndexRow({ icon, title, description, href, featured = false, delay = 0 }) {
  const reduce = useReducedMotion();
  const live = isUrl(href);
  const body = (
    <>
      <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
      <span className="relative flex items-center gap-4 px-3 py-6 sm:gap-7 sm:px-6 sm:py-8">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-accent-soft transition-transform duration-700 group-hover:rotate-[360deg] sm:h-14 sm:w-14">
          <Icon name={icon} size={22} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={cx("block font-display font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2", featured ? "text-[clamp(1.9rem,5vw,3.6rem)]" : "text-[clamp(1.5rem,3.6vw,2.6rem)]")}>{title}</span>
          <span className="mt-1 block text-sm text-mute sm:text-base">{description}</span>
        </span>
        <span className={cx("hidden shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold sm:inline-flex", live ? "border-accent/60 text-accent-soft" : "border-white/15 text-mute")}>
          {live ? "Open" : "Link coming soon"}
          {live && <LuArrowUpRight size={14} aria-hidden="true" />}
        </span>
      </span>
    </>
  );
  const cls = "group relative block overflow-hidden";
  return (
    <motion.li
      className="border-b border-white/12"
      initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {live ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
      ) : (
        <div className={cls} aria-label={`${title} (link coming soon)`}>{body}</div>
      )}
    </motion.li>
  );
}
