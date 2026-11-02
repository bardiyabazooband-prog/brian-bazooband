export const projectTypes = ["landing", "business", "app", "redesign", "other"];
export function validateLead(input) {
  const data = {}; const errors = {};
  if (!input || typeof input !== "object" || Array.isArray(input)) return { data, errors: { name: "required" } };
  const limits = { name: 100, email: 254, business: 150, type: 30, budget: 150, timeline: 150, description: 5000 };
  for (const [key, max] of Object.entries(limits)) {
    if (input[key] != null && typeof input[key] !== "string") { errors[key] = "invalid"; data[key] = ""; continue; }
    data[key] = (input[key] || "").trim();
    if (data[key].length > max) errors[key] = "long";
  }
  for (const key of ["name", "email", "description"]) if (!data[key]) errors[key] = "required";
  if (data.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = "email";
  if (!projectTypes.includes(data.type)) errors.type = "type";
  if (data.description && data.description.length < 20) errors.description = "short";
  if (input.consent !== true) errors.consent = "consent";
  data.language = input.language === "es" ? "es" : "en";
  return { data, errors };
}
