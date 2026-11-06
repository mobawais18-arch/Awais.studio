export const cx = (...parts) => parts.filter(Boolean).join(" ");
export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";
export const isUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);
