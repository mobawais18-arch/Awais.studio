// Event Hosting / MC content. Add photos, videos, and hosted events here.
export const events = {
  headline: "Hosting that holds the room.",
  intro:
    "MC services, stage hosting, and event organization with a clear voice, calm presence, and attention to the audience.",

  services: [
    { title: "MC / Master of Ceremonies", icon: "mic", description: "Guiding the programme from welcome to close and keeping the audience engaged." },
    { title: "Stage Hosting", icon: "stage", description: "Confident, clear delivery on stage for any size of audience." },
    { title: "Event Organization", icon: "calendar", description: "Shaping the programme, flow, and details of your event." },
    { title: "Event Coordination", icon: "users", description: "Keeping people, timing, and activities in step on the day." },
    { title: "Public Announcements", icon: "megaphone", description: "Clear announcements that keep every guest informed." },
    { title: "Event Management", icon: "clipboard", description: "Overseeing the event from preparation to wrap-up." },
  ],

  occasions: [
    { title: "Corporate Events", icon: "building", description: "Hosting suited to conferences, launches, and company gatherings.", tone: "from-[#3a2c12] to-[#14110a]" },
    { title: "School & College Events", icon: "graduation", description: "Hosting suited to annual days, ceremonies, farewells, and competitions.", tone: "from-[#4a2a14] to-[#150e0a]" },
    { title: "Special Occasions", icon: "party", description: "Hosting suited to celebrations and personal milestones.", tone: "from-[#4a1830] to-[#13080e]" },
  ],

  // Visual gallery. Replace `src` with an image path in /public (e.g. "/events/stage-1.jpg").
  // For videos set `href` to the video link (YouTube, etc.) and optionally `src` as the poster.
  gallery: [
    { id: "g1", type: "photo", ratio: "portrait", src: null, caption: "Event photo placeholder" },
    { id: "g2", type: "video", ratio: "landscape", src: null, href: "", caption: "Event video placeholder" },
    { id: "g3", type: "photo", ratio: "square", src: null, caption: "Event photo placeholder" },
    { id: "g4", type: "photo", ratio: "landscape", src: null, caption: "Event photo placeholder" },
    { id: "g5", type: "photo", ratio: "portrait", src: null, caption: "Event photo placeholder" },
    { id: "g6", type: "video", ratio: "portrait", src: null, href: "", caption: "Event video placeholder" },
    { id: "g7", type: "photo", ratio: "square", src: null, caption: "Event photo placeholder" },
    { id: "g8", type: "photo", ratio: "portrait", src: null, caption: "Event photo placeholder" },
    { id: "g9", type: "photo", ratio: "landscape", src: null, caption: "Event photo placeholder" },
  ],

  // Add real events: { name, date, venue, role, description }. While empty, placeholder rows show.
  hostedEvents: [],
};
