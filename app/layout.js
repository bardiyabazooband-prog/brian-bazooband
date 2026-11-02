import { Inter, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const title = "Brian Bazooband — Thoughtful Websites & Web Development";
const description = "Custom websites, landing pages, and web applications by Brian Bazooband. Thoughtful design, responsive development, and a clear path from idea to launch.";
export const metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url), alternates: { canonical: "/" } } : {}),
  title: { default: title, template: "%s | Brian Bazooband" }, description,
  authors: [{ name: "Brian Bazooband" }],
  robots: siteConfig.url ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { title, description, siteName: "Brian Bazooband", type: "website", locale: "en_US", alternateLocale: ["es_US"], ...(siteConfig.url ? { url: siteConfig.url } : {}) },
  twitter: { card: "summary_large_image", title, description }
};
const initTheme = `(function(){try{var m=localStorage.getItem('bb-theme');document.documentElement.dataset.theme=m==='dark'||m==='light'?m:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}})();`;
export default function RootLayout({ children }) {
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: initTheme }} /></head><body className={`${inter.variable} ${space.variable}`}><Providers>{children}</Providers></body></html>;
}
