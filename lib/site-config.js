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
  projects: [{ id: "studyup", name: "StudyUp", url: "https://www.getstudyup.com/", tags: ["learning", "application", "subscription"] }]
};
