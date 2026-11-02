import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { validateLead } from "@/lib/contact-validation.mjs";
import { contactReady } from "@/lib/contact-server";
export const runtime = "nodejs";
export const maxDuration = 30;
let limiter;
function reply(code, status, extra = {}, headers = {}) { return NextResponse.json({ ok: false, code, ...extra }, { status, headers: { "Cache-Control": "no-store", ...headers } }); }
function allowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = [process.env.NEXT_PUBLIC_SITE_URL, process.env.CONTACT_ALLOWED_ORIGIN, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""].filter(Boolean);
  if (process.env.NODE_ENV !== "production") allowed.push("http://localhost:3000", "http://127.0.0.1:3000");
  return allowed.some(value => { try { return new URL(value).origin === origin; } catch { return false; } });
}
async function readLimitedBody(request) {
  if (Number(request.headers.get("content-length")) > 32768) throw new Error("large");
  const reader = request.body?.getReader(); if (!reader) throw new Error("empty");
  const chunks = []; let length = 0;
  try { while (true) { const { done, value } = await reader.read(); if (done) break; length += value.byteLength; if (length > 32768) { await reader.cancel(); throw new Error("large"); } chunks.push(value); } }
  finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function POST(request) {
  if (!allowedOrigin(request)) return reply("origin", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("invalid", 415);
  if (!contactReady()) return reply("unavailable", 503);
  try {
    limiter ||= new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "brian:contact", analytics: false });
    // Vercel supplies x-vercel-forwarded-for. On other hosts use a trusted proxy
    // that overwrites this header; otherwise all traffic shares a conservative bucket.
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "shared";
    const hash = createHash("sha256").update(ip).digest("hex");
    const limit = await limiter.limit(hash);
    if (!limit.success) return reply("rate", 429, {}, { "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) });
  } catch { return reply("unavailable", 503); }
  let raw;
  try { raw = await readLimitedBody(request); } catch { return reply("invalid", 400); }
  if (!raw || typeof raw !== "object") return reply("invalid", 400);
  if (raw.website || !Number.isFinite(raw.started) || Date.now() - raw.started < 2500 || raw.started > Date.now()) return reply("spam", 400);
  const { data, errors } = validateLead(raw);
  if (Object.keys(errors).length) return reply("invalid", 422, { errors });
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: sent, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: data.email,
      subject: `Portfolio inquiry · ${data.type}`,
      text: Object.entries(data).map(([key, value]) => `${key}: ${value || "—"}`).join("\n\n")
    });
    if (error || !sent?.id) { console.error("Contact delivery rejected", error?.name || "no_message_id"); return reply("delivery", 502); }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { console.error("Contact provider request failed"); return reply("delivery", 502); }
}
