// All seven platform slots are always shown. To activate one, paste its URL.
// WhatsApp is built from site.whatsapp.number (click-to-chat). Add a platform: add an entry
// here and, if the icon is new, register it in src/lib/icons.jsx.
import { site } from "./site";
import { whatsappLink } from "../lib/links";

export const platforms = [
  { id: "youtube", name: "YouTube", icon: "youtube", description: "Videos, event highlights, and development content.", url: "" },
  { id: "instagram", name: "Instagram", icon: "instagram", description: "Event moments and behind-the-scenes updates.", url: "" },
  { id: "facebook", name: "Facebook", icon: "facebook", description: "Updates, events, and community.", url: "" },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin", description: "Professional profile and network.", url: "" },
  { id: "whatsapp", name: "WhatsApp", icon: "whatsapp", description: "Message me directly with click-to-chat.", url: whatsappLink(site.whatsapp) },
  { id: "github", name: "GitHub", icon: "github", description: "Development projects and source code, published here.", url: "", featured: true },
  { id: "freelance", name: "Freelancing Portfolio", icon: "briefcase", description: "My freelancing profile, ready for Upwork, Fiverr, or a personal page.", url: "" },
];
