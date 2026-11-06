import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import {
  LuCode, LuBriefcase, LuGlobe, LuLayers, LuServer, LuMonitor, LuDatabase, LuSmartphone,
  LuMic, LuTheater, LuCalendarCheck, LuUsers, LuMegaphone, LuClipboardList,
  LuBuilding2, LuGraduationCap, LuPartyPopper,
} from "react-icons/lu";

export const iconMap = {
  code: LuCode, briefcase: LuBriefcase, globe: LuGlobe, layers: LuLayers, server: LuServer,
  monitor: LuMonitor, database: LuDatabase, smartphone: LuSmartphone,
  mic: LuMic, stage: LuTheater, calendar: LuCalendarCheck, users: LuUsers, megaphone: LuMegaphone,
  clipboard: LuClipboardList, building: LuBuilding2, graduation: LuGraduationCap, party: LuPartyPopper,
  github: FaGithub, linkedin: FaLinkedinIn, facebook: FaFacebookF, instagram: FaInstagram,
  youtube: FaYoutube, whatsapp: FaWhatsapp,
};

export function Icon({ name, ...props }) {
  const Component = iconMap[name] ?? LuGlobe;
  return <Component {...props} />;
}
