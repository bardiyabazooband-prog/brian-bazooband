"use client";
import { MessagesSquare, PenTool, Code2, Rocket } from "lucide-react";
import { usePreferences } from "./Providers";
import { Reveal, SectionHeading } from "./UI";
const icons = [MessagesSquare, PenTool, Code2, Rocket];
export default function Process() { const { t } = usePreferences(); return <section id="process" className="section process-section"><div className="container"><SectionHeading {...t.process} /><ol className="process-grid">{t.process.steps.map(([title, text], i) => { const Icon = icons[i]; return <li key={i}><Reveal delay={i * 0.09}><div className="process-marker"><span className="step-number">0{i + 1}</span><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p></Reveal></li>; })}</ol></div></section>; }
