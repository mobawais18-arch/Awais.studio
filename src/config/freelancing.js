import { platforms } from "./socials";

export const freelancing = {
  headline: "Freelance web development.",
  intro: "Websites, interfaces, and complete applications built to your requirements.",
  // The main freelancing portfolio link is set once, in socials.js (id: "freelance").
  portfolioUrl: platforms.find((p) => p.id === "freelance")?.url ?? "",

  // Optional extra profiles. They appear only when `url` is filled in, so Upwork / Fiverr
  // can be connected later without touching any component.
  extraProfiles: [
    { id: "upwork", name: "Upwork", url: "" },
    { id: "fiverr", name: "Fiverr", url: "" },
  ],

  services: [
    { title: "Web Development Services", icon: "globe", description: "Complete websites for businesses, clubs, and individuals, from structure to launch.", points: ["Planning", "Build", "Deployment"] },
    { title: "Frontend Development", icon: "monitor", description: "Interfaces built with React, Redux, and Tailwind CSS that feel fast and look right.", points: ["React.js", "Redux", "Tailwind CSS", "Bootstrap"] },
    { title: "Backend Development", icon: "server", description: "APIs and server logic with Node.js and Express.js, backed by MongoDB.", points: ["Node.js", "Express.js", "REST APIs", "MongoDB"] },
    { title: "Full-Stack Development", icon: "layers", description: "Interface, API, and database designed together as one application.", points: ["Frontend", "Backend", "Database"] },
    { title: "Responsive Website Development", icon: "smartphone", description: "Layouts that work on phones, tablets, laptops, and large screens.", points: ["Mobile first", "Accessible", "Fast loading"] },
    { title: "Custom Web Applications", icon: "code", description: "Applications shaped around your workflow instead of a generic template.", points: ["Custom features", "Authentication", "Dashboards"] },
  ],

  // Generic working phases. Edit freely.
  process: [
    { title: "Plan", text: "We define the goals, the pages, and the features before any code is written." },
    { title: "Build", text: "I develop the site or application and share progress along the way." },
    { title: "Launch", text: "The finished project is deployed and handed over, ready to use." },
  ],
};
