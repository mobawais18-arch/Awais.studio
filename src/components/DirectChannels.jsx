import { LuMail } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "../config/site";
import { whatsappLink } from "../lib/links";
import LinkOrPending from "./LinkOrPending";

export default function DirectChannels() {
  const wa = whatsappLink(site.whatsapp);
  const row = "flex items-center gap-4 font-semibold transition-colors hover:text-accent-soft";
  const icon = "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-soft";
  return (
    <ul className="grid gap-5">
      <li>
        <a href={`mailto:${site.email}`} className={row}>
          <span className={icon}><LuMail size={20} aria-hidden="true" /></span>
          <span>{site.email}{site.emailIsPlaceholder && <span className="block text-xs font-normal text-mute">Placeholder address, to be replaced.</span>}</span>
        </a>
      </li>
      <li>
        <LinkOrPending href={wa} pendingLabel="WhatsApp number coming soon" className={row}>
          <span className={icon}><FaWhatsapp size={20} aria-hidden="true" /></span>
          <span>WhatsApp<span className="block text-xs font-normal text-mute">{wa ? "Click to chat" : "Click-to-chat link coming soon"}</span></span>
        </LinkOrPending>
      </li>
    </ul>
  );
}
