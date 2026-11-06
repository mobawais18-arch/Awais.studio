import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { site } from "../config/site";
import { container, cx } from "../lib/cx";
import Logo from "./Logo";
import Button from "./Button";
import { useLenis } from "./SmoothScroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const lenis = useLenis();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > prev && y > 140);
  });

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <>
    <motion.header
      animate={{ y: hidden && !open ? "-110%" : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cx("fixed inset-x-0 top-0 z-50 transition-colors duration-300", scrolled || open ? "glass border-x-0 border-t-0" : "border-b border-transparent")}
    >
      <div className={cx(container, "flex h-[68px] items-center justify-between sm:h-[76px]")}>
        <Logo />

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className="relative rounded-full px-3.5 py-2 text-sm font-semibold">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-accent/50" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className={cx("relative transition-colors", isActive ? "text-accent-soft" : "text-mute hover:text-bone")}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block"><Button to="/contact" className="!px-5 !py-3 text-sm">Let's Connect</Button></div>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden">
            {open ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </div>

    </motion.header>
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ clipPath: "circle(0px at calc(100% - 38px) -34px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 38px) -34px)" }}
          exit={{ clipPath: "circle(0px at calc(100% - 38px) -34px)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-ink px-6 pb-10 pt-6 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {site.nav.map((item, i) => (
              <motion.div key={item.to} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}>
                <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => cx("block border-b border-white/10 py-3.5 font-display text-3xl font-bold", isActive ? "text-accent-soft" : "text-bone")}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="mt-8"><Button to="/contact" block>Let's Connect</Button></div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
