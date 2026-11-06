import { usePageMeta } from "../hooks/usePageMeta";
import { AboutStatement, Convergence, IdentityCard } from "../sections/AboutSections";
import ContactCTA from "../sections/ContactCTA";

export default function About() {
  usePageMeta("About", "About Awais: a web developer and event host, brought together in Awais Studio.");
  return (
    <>
      <AboutStatement />
      <IdentityCard />
      <Convergence />
      <ContactCTA />
    </>
  );
}
