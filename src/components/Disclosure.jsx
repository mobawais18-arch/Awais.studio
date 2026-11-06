import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";

export default function Disclosure({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-t border-white/12">
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between py-5 text-left font-display text-lg font-semibold">
          {title}
          <LuPlus aria-hidden="true" className={`shrink-0 text-accent-soft transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="pb-6 leading-relaxed text-mute">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
