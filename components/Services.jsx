"use client";
import { Code2, PanelsTopLeft, RefreshCw, AppWindow, Smartphone, Wrench, ArrowUpRight } from "lucide-react";
import { usePreferences } from "./Providers";
import { Reveal, SectionHeading } from "./UI";
const icons = [Code2, PanelsTopLeft, RefreshCw, AppWindow, Smartphone, Wrench];
export default function Services() {
  const { t } = usePreferences();
  return <section id="services" className="section container"><SectionHeading {...t.services} /><div className="services-grid">{t.services.items.map(([title, description], i) => { const Icon = icons[i]; return <Reveal key={i} delay={i % 3 * 0.06} className={`service-card service-${i}`}><div className="service-top"><span className="service-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><span className="mono">0{i + 1}</span></div>{i === 0 && <div className="service-decoration" aria-hidden="true"><span /><span /><span /><span /></div>}<div><h3>{title}</h3><p>{description}</p></div><a className="card-link" href="#contact" aria-label={`${t.inquire}: ${title}`}><ArrowUpRight size={21} /></a></Reveal>; })}</div></section>;
}
