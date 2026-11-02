"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
export function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ delay: reduced ? 0 : delay }} {...props}>{children}</motion.div>;
}
export function SectionHeading({ eyebrow, title, intro }) {
  return <Reveal className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</Reveal>;
}
export function Button({ children, href, secondary = false, className = "", external = false, ...props }) {
  return <a href={href} className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}><span>{children}</span><ArrowUpRight size={17} aria-hidden="true" /></a>;
}
