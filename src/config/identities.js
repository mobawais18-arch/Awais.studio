// Content for the two flip cards on the homepage.
export const identities = {
  developer: {
    title: "The Developer",
    summary: "Websites and web applications built end to end with React, Node.js, Express.js, and MongoDB.",
    chips: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    backTitle: "Technology & Web Development",
    points: ["Developer portfolio", "Freelance web development", "Projects and hosted websites", "GitHub"],
    cta: { label: "Enter the Developer world", to: "/developer" },
    secondary: { label: "Freelancing", to: "/freelancing" },
  },
  host: {
    title: "The Event Host",
    summary: "MC services, stage hosting, and event organization for corporate, school, and special occasions.",
    chips: ["MC", "Stage Hosting", "Event Organization"],
    backTitle: "Events & Entertainment",
    cta: { label: "Enter the Event world", to: "/events" },
    secondary: { label: "Book an event", to: "/contact?type=event" },
  },
};
