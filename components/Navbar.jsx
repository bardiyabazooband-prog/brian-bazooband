"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePreferences } from "./Providers";
import Preferences from "./Preferences";
import { siteConfig } from "@/lib/site-config";
export default function Navbar() {
  const { t } = usePreferences(); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const [active, setActive] = useState("home");
  const dialog = useRef(null); const opener = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: "-18% 0px -60% 0px" });
    Object.keys(t.nav).forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, [t]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow; document.body.style.overflow = "hidden";
    const links = () => Array.from(dialog.current?.querySelectorAll('a[href], button, select') || []);
    links()[0]?.focus();
    const key = event => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { const items = links(); const first = items[0]; const last = items.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } }
    };
    const resize = () => { if (window.innerWidth >= 1200) setOpen(false); };
    window.addEventListener("keydown", key); window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); window.removeEventListener("resize", resize); opener.current?.focus(); };
  }, [open]);
  const booking = siteConfig.calendarUrl || "#contact";
  return <><a className="skip-link" href="#main">{t.skip}</a><header className={`navbar ${scrolled ? "is-scrolled" : ""}`}><div className="nav-inner">
    <a href="#home" className="wordmark" aria-label="Brian Bazooband"><span className="brand-symbol" aria-hidden="true">b<span>.</span></span><span>Brian <span className="surname">Bazooband</span></span></a>
    <nav className="desktop-nav" aria-label={t.navigation}>{Object.entries(t.nav).map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}{active === id && <motion.span layoutId="active-nav" className="active-indicator" />}</a>)}</nav>
    <div className="nav-actions"><Preferences /><a className="nav-book" href={booking} {...(siteConfig.calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{t.book}<ArrowUpRight size={15} aria-hidden="true" /></a><button className="menu-button" ref={opener} aria-expanded={open} aria-controls="mobile-navigation" aria-label={t.menu} onClick={() => setOpen(true)}><Menu size={22} /></button></div>
  </div></header><AnimatePresence>{open && <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.div id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label={t.navigation} ref={dialog} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} onClick={event => event.stopPropagation()}><div className="drawer-top"><span className="eyebrow">Brian Bazooband</span><button className="icon-button" aria-label={t.close} onClick={() => setOpen(false)}><X /></button></div><nav aria-label={t.navigation}>{Object.entries(t.nav).map(([id, label], index) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span className="mono">0{index + 1}</span>{label}<ArrowUpRight size={22} aria-hidden="true" /></a>)}</nav><Preferences id="mobile" /><a className="button button-primary" href={booking} onClick={() => setOpen(false)} {...(siteConfig.calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{t.book}<ArrowUpRight size={18} /></a></motion.div></motion.div>}</AnimatePresence></>;
}
