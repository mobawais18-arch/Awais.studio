import { useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "../config/site";
import { enquiryForms } from "../config/forms";
import { mailto, whatsappLink } from "../lib/links";
import { cx } from "../lib/cx";
import Button from "./Button";

// Data-driven form (fields come from config/forms.js). Sends via the visitor's email app,
// or WhatsApp click-to-chat when a number is configured.
export default function EnquiryForm({ mode = "project" }) {
  const form = enquiryForms[mode];
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  const canWhatsApp = Boolean(whatsappLink(site.whatsapp));

  const collect = () => {
    const data = new FormData(ref.current);
    return form.fields.map((f) => [f.label, String(data.get(f.name) ?? "").trim()]).filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`).join("\n");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailto(site.email, form.subject, collect());
    setSent(true);
  };

  const onWhatsApp = () => {
    if (!ref.current.reportValidity()) return;
    const url = whatsappLink({ number: site.whatsapp.number, message: `${form.subject}\n${collect()}` });
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form ref={ref} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {form.fields.map((f) => (
        <div key={f.name} className={cx(f.type === "textarea" && "sm:col-span-2")}>
          <label htmlFor={`${mode}-${f.name}`} className="mb-2 block text-sm font-semibold">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea id={`${mode}-${f.name}`} name={f.name} required={f.required} rows={5} placeholder={f.placeholder} className="field resize-y" />
          ) : f.type === "select" ? (
            <select id={`${mode}-${f.name}`} name={f.name} className="field" defaultValue={f.options[0]}>
              {f.options.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          ) : (
            <input id={`${mode}-${f.name}`} name={f.name} type={f.type} required={f.required} autoComplete={f.autoComplete} className="field" />
          )}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant={form.tone === "event" ? "event" : "dev"}>Send by email <LuSend size={16} aria-hidden="true" /></Button>
        <button type="button" onClick={onWhatsApp} disabled={!canWhatsApp} title={canWhatsApp ? undefined : "WhatsApp number coming soon"} className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-45">
          <FaWhatsapp size={17} aria-hidden="true" /> {canWhatsApp ? "Send on WhatsApp" : "WhatsApp coming soon"}
        </button>
      </div>
      <p role="status" className="text-sm text-mute sm:col-span-2">
        {sent && `Your email app should open with the message ready. If it does not, write to ${site.email}.`}
      </p>
    </form>
  );
}
