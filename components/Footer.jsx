"use client";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { usePreferences } from "./Providers";
import Preferences from "./Preferences";
import { siteConfig } from "@/lib/site-config";
export default function Footer({ year }) { const { t } = usePreferences(); return <footer className="footer container"><div className="footer-top"><div><a className="footer-brand" href="#home">Brian Bazooband<span>.</span></a><p>{t.footer.role}</p></div><p className="footer-line">{t.footer.line}</p><a href="#home" className="back-top">{t.footer.top}<span><ArrowUp size={18} aria-hidden="true" /></span></a></div><nav aria-label={t.navigation} className="footer-nav">{Object.entries(t.nav).map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}{siteConfig.socials.map(social => <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</nav><div className="footer-bottom"><p>© {year} Brian Bazooband. {t.footer.rights}</p><Preferences id="footer" /></div></footer>; }
