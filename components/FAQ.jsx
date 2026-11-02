"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { usePreferences } from "./Providers";
import { SectionHeading, Reveal } from "./UI";
export default function FAQ() {
 const { t } = usePreferences(); const [open, setOpen] = useState(0); const reduced = useReducedMotion();
 return <section id="faq" className="section container faq-grid"><SectionHeading {...t.faq} /><div>{t.faq.items.map(([question, answer], i) => <Reveal key={i} className={`faq-item ${open === i ? "faq-open" : ""}`}><h3><button id={`question-${i}`} aria-expanded={open === i} aria-controls={`answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{question}</span><Plus size={20} aria-hidden="true" /></button></h3><AnimatePresence initial={false}>{open === i && <motion.div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="faq-answer"><p>{answer}</p></motion.div>}</AnimatePresence></Reveal>)}</div></section>;
}
