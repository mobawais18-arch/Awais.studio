import { LuImage, LuPlay, LuUser } from "react-icons/lu";
import { cx } from "../lib/cx";

export default function Placeholder({ kind = "photo", label, className }) {
  const Icon = kind === "video" ? LuPlay : kind === "portrait" ? LuUser : LuImage;
  const text = label ?? (kind === "video" ? "Video placeholder" : kind === "portrait" ? "Profile photo placeholder" : "Photo placeholder");
  return (
    <div role="img" aria-label={text} className={cx("placeholder relative grid h-full w-full place-items-center overflow-hidden", className)}>
      <span className="absolute inset-3 rounded-lg border border-dashed border-white/20" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center text-xs text-white/60">
        <Icon size={kind === "portrait" ? 54 : 26} aria-hidden="true" />
        <span>{text}</span>
      </div>
    </div>
  );
}
