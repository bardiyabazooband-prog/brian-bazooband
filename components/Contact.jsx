"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { usePreferences } from "./Providers";
import { Reveal, Button } from "./UI";
import { siteConfig } from "@/lib/site-config";
import { validateLead } from "@/lib/contact-validation.mjs";
export default function Contact({ ready }) {
 const { t, language } = usePreferences(); const c = t.contact;
 const [type, setType] = useState(""); const [errors, setErrors] = useState({}); const [status, setStatus] = useState("idle"); const [failure, setFailure] = useState(""); const form = useRef(null); const feedback = useRef(null); const started = useRef(0); const inFlight = useRef(false);
 useEffect(() => { started.current = Date.now(); const select = event => setType(event.detail); window.addEventListener("project-type", select); return () => window.removeEventListener("project-type", select); }, []);
 async function submit(event) {
   event.preventDefault(); if (inFlight.current) return;
   const raw = Object.fromEntries(new FormData(form.current)); raw.consent = raw.consent === "on"; raw.language = language; raw.started = started.current;
   const result = validateLead(raw); setErrors(result.errors); setFailure("");
   if (Object.keys(result.errors).length) { setStatus("idle"); requestAnimationFrame(() => form.current?.querySelector('[aria-invalid="true"]')?.focus()); return; }
   inFlight.current = true; setStatus("sending");
   try {
     const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(raw), signal: AbortSignal.timeout(20000) });
     const body = await response.json();
     if (!response.ok) { setErrors(body.errors || {}); setFailure(body.code || "generic"); setStatus("error"); }
     else if (body.ok === true) { setStatus("success"); form.current.reset(); setType(""); }
     else { setFailure("delivery"); setStatus("error"); }
   } catch { setFailure("network"); setStatus("error"); }
   finally { inFlight.current = false; requestAnimationFrame(() => feedback.current?.focus()); }
 }
 function field(name, { required = false, multiline = false, placeholder, inputType = "text", maxLength = 150, autoComplete } = {}) {
   const props = { id: name, name, required, maxLength, placeholder, autoComplete, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined };
   return <div className={`field ${multiline ? "field-full" : ""}`}><label htmlFor={name}>{c[name]} {required ? <span aria-hidden="true">*</span> : <span className="optional">({c.optional})</span>}</label>{multiline ? <textarea {...props} rows={5} minLength={20} /> : <input {...props} type={inputType} />}{errors[name] && <p className="field-error" id={`${name}-error`}>{c.errors[errors[name]] || c.errors.invalid}</p>}</div>;
 }
 return <section id="contact" className="section contact-section"><div className="container contact-grid"><Reveal className="contact-copy"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p className="section-intro">{c.intro}</p><div className="contact-orbit" aria-hidden="true"><span>↗</span><i /><i /></div>{siteConfig.calendarUrl ? <Button href={siteConfig.calendarUrl} external>{t.consultation}</Button> : <div className="booking-fallback"><p>{c.bookingFallback}</p><Button secondary href="#name">{t.consultation}</Button></div>}{siteConfig.email && <a className="contact-email" href={`mailto:${siteConfig.email}`}><Mail size={17} aria-hidden="true" />{c.emailFallback}<ArrowUpRight size={15} aria-hidden="true" /></a>}</Reveal><Reveal className="contact-form-card">{!ready && <p className="setup-notice" role="status">{c.unconfigured}</p>}{status === "success" ? <div className="form-success" role="status" tabIndex={-1} ref={feedback}><CheckCircle2 size={48} strokeWidth={1.25} aria-hidden="true" /><h3>{c.success}</h3><button type="button" className="button button-secondary" onClick={() => { setStatus("idle"); started.current = Date.now(); }}>{c.reset}<ArrowUpRight size={17} /></button></div> : <form ref={form} onSubmit={submit} noValidate aria-busy={status === "sending"}><p className="form-required">{c.required}</p><div className="form-grid">{field("name", { required: true, maxLength: 100, autoComplete: "name" })}{field("email", { required: true, inputType: "email", maxLength: 254, autoComplete: "email" })}{field("business", { autoComplete: "organization" })}<div className="field"><label htmlFor="type">{c.type} <span aria-hidden="true">*</span></label><select id="type" name="type" value={type} onChange={e => setType(e.target.value)} required aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? "type-error" : undefined}><option value="">{c.select}</option>{Object.entries(c.types).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{errors.type && <p className="field-error" id="type-error">{c.errors.type}</p>}</div>{field("budget", { placeholder: c.budgetHint })}{field("timeline", { placeholder: c.timelineHint })}{field("description", { required: true, multiline: true, placeholder: c.descriptionHint, maxLength: 5000 })}</div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div><label className="consent-label"><input type="checkbox" name="consent" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} /><span>{c.consent}</span></label>{errors.consent && <p id="consent-error" className="field-error">{c.errors.consent}</p>}{failure && <p className="form-error" role="alert" tabIndex={-1} ref={feedback}>{c.errors[failure] || c.errors.generic}</p>}<button className="button button-primary submit-button" type="submit" disabled={status === "sending" || !ready}>{status === "sending" ? <><span>{c.sending}</span><LoaderCircle className="spin" size={18} aria-hidden="true" /></> : <><span>{c.submit}</span><ArrowUpRight size={18} aria-hidden="true" /></>}</button></form>}</Reveal></div></section>;
}
