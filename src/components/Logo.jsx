import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" aria-label="Awais Studio, home" className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" x2="1">
            <stop offset="0" stopColor="#5b7cff" /><stop offset=".5" stopColor="#b36bff" /><stop offset="1" stopColor="#f2b544" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="#0d0f1c" stroke="rgba(160,170,255,.25)" />
        <path d="M8 24 16 7l8 17M11.5 18h9" fill="none" stroke="url(#logo-g)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[17px] font-extrabold tracking-[.08em]">AWAIS<span className="font-semibold text-mute"> STUDIO</span></span>
    </Link>
  );
}
