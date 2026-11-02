"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { translations } from "@/lib/translations";
const Preferences = createContext(null);
export function usePreferences() { return useContext(Preferences); }
export default function Providers({ children }) {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    try {
      const lang = localStorage.getItem("bb-language");
      const mode = localStorage.getItem("bb-theme");
      if (["en", "es"].includes(lang)) setLanguage(lang);
      if (["light", "dark", "system"].includes(mode)) setTheme(mode);
    } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => { document.documentElement.dataset.theme = theme === "system" ? (media.matches ? "dark" : "light") : theme; };
    apply(); media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    const sync = event => {
      if (event.key === "bb-language") setLanguage(event.newValue === "es" ? "es" : "en");
      if (event.key === "bb-theme") setTheme(["light", "dark"].includes(event.newValue) ? event.newValue : "system");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function changeLanguage(value) { setLanguage(value); try { localStorage.setItem("bb-language", value); } catch {} }
  function changeTheme(value) { setTheme(value); try { localStorage.setItem("bb-theme", value); } catch {} }
  return <Preferences.Provider value={{ language, theme, setLanguage: changeLanguage, setTheme: changeTheme, t: translations[language] }}><MotionConfig reducedMotion="user" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig></Preferences.Provider>;
}
