import { usePageMeta } from "../hooks/usePageMeta";
import ContactCTA from "../sections/ContactCTA";
import Hero from "../sections/Hero";
import IdentityGateway from "../sections/IdentityGateway";
import Journey from "../sections/Journey";
import PlatformIndex from "../sections/PlatformIndex";
import ProjectShowcase from "../sections/ProjectShowcase";

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <IdentityGateway />
      <Journey />
      <ProjectShowcase />
      <PlatformIndex />
      <ContactCTA />
    </>
  );
}
