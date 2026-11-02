
function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      ? url.href.replace(/\/$/, "")
      : "";
  } catch {
    return "";
  }
}

export const siteConfig = {
  name: "Brian Bazooband",

  url: httpsUrl(process.env.NEXT_PUBLIC_SITE_URL),

  calendarUrl: httpsUrl(process.env.NEXT_PUBLIC_CALENDAR_URL),

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",

  available: process.env.NEXT_PUBLIC_AVAILABLE === "true",

  socials: [],

  // Add only verified reviews with permission.
  // Quote and role are bilingual objects.
  testimonials: [],

  prices: {
    landing: null,
    business: null,
    app: null,
  },

  // ============================================
  // MY WORK — PROJECTS
  // ============================================
  //
  // Add, remove, or reorder projects here.
  //
  // Each project needs:
  // - id: A unique project identifier
  // - name: The project's display name
  // - url: The project's website URL
  // - description: English and Spanish descriptions
  //
  // Optional:
  // - faviconUrl: Custom favicon or logo URL
  //
  // Example:
  //
  // {
  //   id: "another-project",
  //   name: "Another Project",
  //   url: "https://example.com/",
  //   faviconUrl: "https://example.com/icon.png",
  //   description: {
  //     en: "A description of this project.",
  //     es: "Una descripción de este proyecto.",
  //   },
  // },

  projects: [
    {
      id: "studyup",
      name: "StudyUp",
      url: "https://getstudyup.com/",
      faviconUrl: "https://getstudyup.com/studyup.png",

      description: {
        en: "AI-assisted math learning platform with interactive lessons, dashboards, and subscriptions.",
        es: "Plataforma de aprendizaje de matemáticas con IA, lecciones interactivas, paneles y suscripciones.",
      },
    },
    {
      id: "pacific-dental",
      name: "Pacific Dental",
      url: "https://pacific-dental-mu.vercel.app/",
      faviconUrl: "https://pacific-dental-mu.vercel.app/favicon.ico",

      description: {
        en: "Modern dental website showcasing treatments, patient information, and appointment scheduling.",
        es: "Sitio web dental moderno con tratamientos, información para pacientes y programación de citas.",
      },
    },
  ],
};
