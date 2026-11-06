// Data-driven enquiry forms (contact page + event booking section).
const name = { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" };
const email = { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" };

export const enquiryForms = {
  project: {
    tone: "dev",
    title: "Start a web project",
    tab: "Web project",
    subject: "Web project enquiry",
    fields: [
      name, email,
      { name: "service", label: "What do you need?", type: "select", options: ["Website development", "Frontend development", "Backend development", "Full-stack development", "Responsive website", "Custom web application", "Something else"] },
      { name: "message", label: "Project details", type: "textarea", required: true, placeholder: "What would you like to build?" },
    ],
  },
  event: {
    tone: "event",
    title: "Book me for your event",
    tab: "Event booking",
    subject: "Event booking enquiry",
    fields: [
      name,
      { name: "email", label: "Email or phone", type: "text", required: true },
      { name: "eventType", label: "Type of event", type: "select", options: ["Corporate event", "School or college event", "Special occasion", "Something else"] },
      { name: "date", label: "Event date", type: "date" },
      { name: "location", label: "City and venue", type: "text" },
      { name: "audience", label: "Expected audience size", type: "text" },
      { name: "message", label: "About the event", type: "textarea", required: true, placeholder: "Tell me about the occasion and what you need from a host." },
    ],
  },
};
