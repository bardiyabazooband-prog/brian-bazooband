import { siteConfig } from "@/lib/site-config";
export default function sitemap() { return siteConfig.url ? [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }] : []; }
