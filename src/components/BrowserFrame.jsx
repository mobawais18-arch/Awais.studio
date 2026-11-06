import { isUrl } from "../lib/cx";

export default function BrowserFrame({ url, children, className = "" }) {
  const shown = isUrl(url) ? url.replace(/^https?:\/\//, "") : "your-website-address";
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/15 bg-ink-2 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[.04] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-rose/80" /><i className="h-2.5 w-2.5 rounded-full bg-gold/80" /><i className="h-2.5 w-2.5 rounded-full bg-cyan/80" />
        </span>
        <span className="truncate rounded-full bg-black/30 px-3 py-1 font-mono text-[11px] text-mute">{shown}</span>
      </div>
      <div className="aspect-[16/10]">{children}</div>
    </div>
  );
}
