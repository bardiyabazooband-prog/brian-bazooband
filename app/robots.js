import { siteConfig } from "@/lib/site-config";
export default function robots() {
 return siteConfig.url ? { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${siteConfig.url}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
