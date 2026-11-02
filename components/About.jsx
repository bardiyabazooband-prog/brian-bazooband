"use client";
import { ArrowUpRight, Fingerprint, MessagesSquare, Gauge, ScanLine } from "lucide-react";
import { usePreferences } from "./Providers";
import { Reveal } from "./UI";
const icons = [Fingerprint, MessagesSquare, Gauge, ScanLine];
export default function About() {
 const { t } = usePreferences();
 return <section id="about" className="section container about-grid"><Reveal><p className="eyebrow">{t.about.eyebrow}</p><h2>{t.about.title}</h2><p className="about-text">{t.about.text}</p><a href="#contact" className="about-note">{t.about.note}<ArrowUpRight size={18} aria-hidden="true" /></a><div className="signature" aria-hidden="true">Brian<span>.</span></div></Reveal><div className="principles">{t.about.items.map(([title, text], i) => { const Icon = icons[i]; return <Reveal key={i} delay={i * 0.05} className="principle"><span className="principle-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div><span className="mono">0{i + 1}</span></Reveal>; })}</div></section>;
}
