"use client";
import { Check, ArrowUpRight } from "lucide-react";
import { usePreferences } from "./Providers";
import { siteConfig } from "@/lib/site-config";
import { Reveal, SectionHeading } from "./UI";
const keys = ["landing", "business", "app"];
export default function Pricing() {
 const { t, language } = usePreferences();
 return <section id="estimates" className="section container"><SectionHeading {...t.pricing} /><div className="pricing-grid">{t.pricing.items.map(([title, text, features], i) => <Reveal key={keys[i]} delay={i * 0.07} className={`pricing-card ${i === 1 ? "pricing-featured" : ""}`}><span className="pricing-index mono">/ 0{i + 1}</span><h3>{title}</h3><p>{text}</p><div className="scope-label">{siteConfig.prices[keys[i]] ? <>{t.pricing.priceLabel}: {siteConfig.prices[keys[i]][language]}</> : t.pricing.tailored}</div><ul>{features.map(feature => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}</ul><a href="#contact" className={`button ${i === 1 ? "button-primary" : "button-secondary"}`} onClick={() => window.dispatchEvent(new CustomEvent("project-type", { detail: keys[i] }))}>{t.pricing.quote}<ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>)}</div></section>;
}
