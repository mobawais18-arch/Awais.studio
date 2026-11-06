import { useEffect } from "react";
import { site } from "../config/site";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.title}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description || site.description);
  }, [title, description]);
}
