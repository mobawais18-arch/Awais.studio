import { usePageMeta } from "../hooks/usePageMeta";
import ContactCTA from "../sections/ContactCTA";
import { FreelanceHero, FreelanceProfiles, ServiceStack } from "../sections/FreelanceSections";

export default function Freelancing() {
  usePageMeta("Freelancing", "Freelance web development by Awais: websites, frontend, backend, full-stack, and custom web applications.");
  return (
    <>
      <FreelanceHero />
      <ServiceStack />
      <FreelanceProfiles />
      <ContactCTA />
    </>
  );
}
