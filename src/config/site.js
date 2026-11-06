// Personal info, navigation, and contact channels. Empty values = not provided yet.
export const site = {
  name: "Awais Studio",
  owner: "Awais", // TODO: add your full name if you want it shown
  tagline: "Your Digital Universe.",
  titles: ["Web Developer", "MC & Event Host"],
  description:
    "Awais Studio is the digital home of Awais: a web developer and an MC / event host. Developer portfolio, freelancing, projects, event hosting, and every platform in one place.",

  // TODO: replace with your real email address
  email: "your-email@example.com",
  emailIsPlaceholder: true,

  // WhatsApp click-to-chat: enter the number with country code, digits only (e.g. "923001234567").
  // Leaving it empty keeps the WhatsApp slot visible but marked "coming soon".
  whatsapp: { number: "", message: "Hello Awais, I found you through Awais Studio." },

  // TODO: add a photo to /public and set the path here (e.g. "/awais.jpg")
  profileImage: null,

  nav: [
    { label: "Home", to: "/" },
    { label: "Developer", to: "/developer" },
    { label: "Freelancing", to: "/freelancing" },
    { label: "Events", to: "/events" },
    { label: "Projects", to: "/projects" },
    { label: "Socials", to: "/socials" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
};
