export default function MicIllustration({ className }) {
  return (
    <svg viewBox="0 0 200 430" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mic-metal" x1="0" x2="1">
          <stop offset="0" stopColor="#575b73" /><stop offset=".5" stopColor="#f0ece1" /><stop offset="1" stopColor="#4e526b" />
        </linearGradient>
        <radialGradient id="mic-head" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#fff3cf" /><stop offset=".55" stopColor="#c99a3c" /><stop offset="1" stopColor="#5b4216" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="92" r="64" fill="url(#mic-head)" />
      <g stroke="#2a1d08" strokeOpacity=".45" strokeWidth="2">
        <ellipse cx="100" cy="92" rx="64" ry="22" /><ellipse cx="100" cy="92" rx="64" ry="44" />
        <ellipse cx="100" cy="92" rx="22" ry="64" /><ellipse cx="100" cy="92" rx="44" ry="64" />
        <path d="M36 92h128M100 28v128" />
      </g>
      <rect x="82" y="152" width="36" height="22" rx="7" fill="url(#mic-metal)" />
      <path d="M78 174h44l-9 128H87z" fill="url(#mic-metal)" />
      <rect x="94" y="302" width="12" height="96" rx="6" fill="url(#mic-metal)" />
      <ellipse cx="100" cy="406" rx="58" ry="12" fill="#0c0d1a" stroke="#f2b544" strokeOpacity=".5" />
    </svg>
  );
}
