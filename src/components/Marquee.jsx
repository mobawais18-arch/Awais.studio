import { cx } from "../lib/cx";

// CSS-only infinite marquee. Content is duplicated once; the copy is hidden from screen readers.
export default function Marquee({ children, duration = 45, className }) {
  return (
    <div className={cx("marquee", className)} style={{ "--marquee-d": `${duration}s` }}>
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
