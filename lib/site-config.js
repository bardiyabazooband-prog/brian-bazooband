function httpsUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href.replace(/\/$/, "") : ""; }
  catch { return ""; }
}
export const siteConfig = {
  name: "Brian Bazooband",
  url: httpsUrl(process.env.NEXT_PUBLIC_SITE_URL),
  calendarUrl: httpsUrl(process.env.NEXT_PUBLIC_CALENDAR_URL),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  available: process.env.NEXT_PUBLIC_AVAILABLE === "true",
  socials: [],
  // Add only verified reviews with permission. quote and role are bilingual objects.
  testimonials: [],
  prices: { landing: null, business: null, app: null },
  // Edit this list to add, remove, or reorder portfolio projects.
  // Each project needs a unique id, name, https URL, and EN/ES descriptions.
  // Optional: faviconUrl for sites whose favicon is not at /favicon.ico.
  // Example:
  // { id: "another-site", name: "Another Site", url: "https://example.com/",
  //   description: { en: "Website for ...", es: "Sitio web para ..." },
  //   faviconUrl: "https://example.com/icon.png" },
  projects: [
    {
      id: "studyup",
      name: "StudyUp",
      url: "https://www.getstudyup.com/",
      description: {
        en: "AI-assisted math learning platform with interactive lessons, dashboards, and subscriptions.",
        es: "Plataforma de aprendizaje de matemáticas con IA, lecciones interactivas, paneles y suscripciones."
      }
    }
  ]
};
