import { usePageMeta } from "../hooks/usePageMeta";
import ContactCTA from "../sections/ContactCTA";
import { DevHero, ProcessTimeline, StackBoard } from "../sections/DevSections";
import ProjectShowcase from "../sections/ProjectShowcase";

export default function Developer() {
  usePageMeta("Developer", "Developer portfolio of Awais: full-stack web development with React, Node.js, Express.js, and MongoDB.");
  return (
    <>
      <DevHero />
      <StackBoard />
      <ProcessTimeline />
      <ProjectShowcase />
      <ContactCTA />
    </>
  );
}
