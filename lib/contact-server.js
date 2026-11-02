import "server-only";
export function contactReady() {
  return ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].every(key => Boolean(process.env[key]?.trim()));
}
