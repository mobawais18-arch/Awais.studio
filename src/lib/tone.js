import { createContext, useContext } from "react";

export const ToneContext = createContext({ tone: "brand", label: "Awais Studio" });
export const ReadyContext = createContext(true);
export const useTone = () => useContext(ToneContext);
export const useReady = () => useContext(ReadyContext);
export const toneColors = { brand: "#a99bff", dev: "#5b7cff", event: "#f2b544" };

export function routeMeta(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p.startsWith("/developer")) return { tone: "dev", label: "The Developer" };
  if (p.startsWith("/freelancing")) return { tone: "dev", label: "Freelancing" };
  if (p.startsWith("/projects")) return { tone: "dev", label: "Projects" };
  if (p.startsWith("/events")) return { tone: "event", label: "The Event Host" };
  if (p.startsWith("/socials")) return { tone: "brand", label: "Platforms" };
  if (p.startsWith("/about")) return { tone: "brand", label: "About" };
  if (p.startsWith("/contact")) return { tone: "brand", label: "Contact" };
  return { tone: "brand", label: "Awais Studio" };
}
