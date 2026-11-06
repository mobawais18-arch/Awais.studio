export function whatsappLink({ number, message } = {}) {
  const digits = String(number || "").replace(/\D/g, "");
  if (digits.length < 7) return "";
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const mailto = (email, subject, body) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
