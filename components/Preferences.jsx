"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { usePreferences } from "./Providers";
export default function Preferences({ id = "header" }) {
  const { t, theme, setTheme, language, setLanguage } = usePreferences();
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  return <div className="preferences">
    <div className="language-control" role="group" aria-label={t.language}>{["en", "es"].map(lang => <button type="button" key={lang} lang={lang} aria-label={lang === "en" ? "English" : "Español"} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    <div className="theme-control"><Icon size={16} aria-hidden="true" /><label className="sr-only" htmlFor={`theme-${id}`}>{t.theme}</label><select id={`theme-${id}`} value={theme} onChange={e => setTheme(e.target.value)}>{Object.entries(t.themes).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
  </div>;
}
