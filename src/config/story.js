// The four scenes of the homepage horizontal journey. tone: dev | event.
export const story = [
  {
    id: "build", tone: "dev", word: "Build", visual: "stack",
    title: "I build for the web.",
    body: "Responsive websites, custom web applications, and full-stack solutions with React, Node.js, Express.js, and MongoDB.",
    cta: { label: "Developer portfolio", to: "/developer" },
  },
  {
    id: "launch", tone: "dev", word: "Launch", visual: "browser",
    title: "I put it online.",
    body: "Websites I develop, deploy, or manage live in one place, starting with Al-Nasr Karate Club.",
    cta: { label: "See the projects", to: "/projects" },
  },
  {
    id: "host", tone: "event", word: "Host", visual: "stage",
    title: "I host the stage.",
    body: "MC services, stage hosting, and public announcements for corporate events, school and college events, and special occasions.",
    cta: { label: "Event hosting", to: "/events" },
  },
  {
    id: "organize", tone: "event", word: "Organize", visual: "gallery",
    title: "I organize the event.",
    body: "Event organization, coordination, and management, so the programme runs the way it was planned.",
    cta: { label: "Book me", to: "/contact?type=event" },
  },
];
