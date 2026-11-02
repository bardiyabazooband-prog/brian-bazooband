# Brian Bazooband — portfolio & development services

A complete JavaScript-only Next.js App Router project. Includes bilingual English/Spanish content, persistent light/dark/system preferences, Motion animations, custom CSS browser artwork, inquiry delivery, and deployment configuration.

## Install in your existing project

Back up your existing files first. Copy this project's contents into `brian-bazooband/`, replacing files with the same names. This implementation uses a root `app/` directory. If your existing project uses `src/app/`, remove or migrate that old application; do not keep both application trees. Remove old TypeScript starter files/configuration if you no longer need them. Keep unrelated public assets as desired. Remove a starter favicon if it overrides the included icon.

Use Node.js 20.9 or later; a current supported LTS release is recommended. An internet connection is needed to install dependencies and for next/font/google at build time.

```sh
cd brian-bazooband
npm install next@latest react@latest react-dom@latest motion@latest lucide-react@latest resend@latest server-only@latest @upstash/redis@latest @upstash/ratelimit@latest
npm install -D tailwindcss@latest @tailwindcss/postcss@latest postcss@latest eslint@latest eslint-config-next@latest
cp .env.example .env.local
npm run dev
```

On Windows PowerShell use `Copy-Item .env.example .env.local` instead of `cp` if needed. Visit http://localhost:3000.

The package manifest uses npm's stable `latest` tags intentionally rather than asserting an unverified exact patch. npm install writes the actual resolved versions to package-lock.json. Commit that lockfile; use npm ci in CI and subsequent deployments. When updating, update next and eslint-config-next together, then validate React peer dependencies and run all checks.

```sh
npm test
npm run lint
npm run build
npm start
```

These commands are provided for local verification. The generated source has not been executed in a Node/npm build environment by the authoring assistant. Do not infer a passing build or audit from delivery of these files.

## Design and content

The editorial hero combines large Space Grotesk typography, Inter body text, an original layered browser composition, pointer-following light, restrained desktop tilt/parallax, and staggered reveals. The page includes a bento services grid, StudyUp, honest future-work placeholder, approach, four-step process, scope categories, FAQ, inquiry, and footer. Theme-aware tokens drive every real UI component. The StudyUp illustrative dashboard deliberately retains its own product-like light palette in either surrounding theme; it is artwork, not a screenshot or embedded third-party site.

No photos, external image requests, invented projects, fabricated testimonials, arbitrary prices, location, domain, or contact information are included. StudyUp's feature description comes from the supplied brief; do not treat the artwork as a representation of its current UI or imply authorship of unverified features. Every portfolio link opens the real site. Add future real projects to `siteConfig.projects` and extend the project rendering with their own previews and translated descriptions before publishing them.

## Personalization

Edit `lib/site-config.js` and `lib/translations.js`:

- Name and wordmark: Brian Bazooband, as requested.
- `NEXT_PUBLIC_AVAILABLE=true` enables the inquiry availability indicator. It does not imply a guaranteed slot.
- `NEXT_PUBLIC_CALENDAR_URL`: your real HTTPS scheduler URL. Without it, call buttons point to the inquiry form. The consultation link focuses the name field.
- `NEXT_PUBLIC_CONTACT_EMAIL`: your real public email, optional. No address is invented.
- `NEXT_PUBLIC_SITE_URL`: your real canonical HTTPS origin without a trailing slash. Without this, the site emits no canonical domain, an empty sitemap, and no-index/no-follow metadata. Robots disallows crawling until configured.
- `socials`: empty by default. Add only actual URLs and truthful labels, for example `{ label: "GitHub", url: YOUR_REAL_URL }`. Provide localized labels if the label is not a brand name.
- `prices`: all null by default. Optional values use `{ en: "your actual estimate with currency and terms", es: "tu estimación real con moneda y condiciones" }`. Nothing else contains pricing.
- `testimonials`: hidden unless configured. A record needs `{ verified: true, name, quote: {en, es}, role: {en, es} }`. Add only real, consented feedback. There are no star ratings or invented headshots.

Both language dictionaries include nav, descriptions, previews, forms, server error codes, FAQ, booking fallback, loading/error pages, and footer. Proper names, domains, illustrative source-code literals, and mathematical formulas do not change between languages. The inaccessible honeypot label is intentionally not part of the visible user experience.

English is server-rendered by default for meaningful HTML. The saved language is restored after hydration and document.lang is updated, so saved Spanish visitors may briefly see English. This avoids hydration mismatches without introducing cookie-based routing. SEO metadata and social previews are English; the bilingual UI is not a separate Spanish-indexable route. For separate Spanish search listings later, add /en and /es routes, localized metadata and hreflang rather than claiming one URL has separate language pages.

Theme is selected by a tiny pre-paint script and synchronized by the provider. OS theme changes are tracked only when System is selected. The theme preference and language sync across tabs. HTML's theme attribute alone suppresses the expected pre-hydration attribute mismatch. If you add a strict Content Security Policy, allow this exact script by a CSP hash or convert to a nonce-based implementation; do not blindly add unsafe-inline.

## Real inquiry delivery — required before accepting leads

This project chooses **Resend delivery**, not Supabase. Leads are delivered as plain-text email; they are not written to a database. Resend accepting a message is the success criterion, not a guaranteed inbox placement. Monitor provider delivery logs and your inbox.

1. Create a Resend account. Verify a domain you control and configure its required DNS records.
2. Set RESEND_API_KEY, CONTACT_FROM_EMAIL (a sender accepted by Resend), and CONTACT_TO_EMAIL (your actual recipient).
3. Create an Upstash Redis database and copy UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
4. Configure your exact canonical origin via NEXT_PUBLIC_SITE_URL for production origin verification. Vercel's current deployment URL is also accepted. If needed, use CONTACT_ALLOWED_ORIGIN for one extra exact trusted origin.
5. Restart the dev server after changing environment variables. Redeploy after changing public environment variables.
6. Send a test inquiry using your own real address, verify receipt, and test a reply. Allow at least 2.5 seconds between page mount and submission.

All five private credentials must be present before the form is enabled. Missing credentials produce a visible setup notice, disable submit, and return 503 from direct API requests. Invalid or revoked credentials return a delivery or availability error, never a pretend success. Optional public email remains available as a fallback if configured.

The endpoint enforces same-origin requests, JSON content type, streaming body-size limits (32 KiB), server-side field limits, strict project types, consent, a honeypot, a minimum fill time, and distributed rate limiting (5 attempts / 15 minutes). It hashes the trusted client IP before storing rate-limit keys. On Vercel it uses the platform's overwritten x-vercel-forwarded-for header. Outside Vercel it intentionally uses one conservative shared bucket instead of trusting a spoofable forwarded header; adapt this only behind a documented trusted proxy. Do not expose the server directly while blindly trusting X-Forwarded-For.

IP limits/honeypots are baseline abuse controls, not a guarantee against targeted spam or distributed attackers. Origin validation isn't bot authentication. Add a verified server-side challenge such as Turnstile and platform firewall rules if abuse warrants it. Provider calls are server-side only. Email content is plain text (not interpolated HTML). Logs exclude inquiry contents and email addresses. Network timeouts may leave delivery uncertain; the interface explicitly says when delivery cannot be confirmed. Automatic retries and fake success for honeypots are not used.

Submitting consent is not a full privacy policy. Before publishing, review your privacy disclosures, data-retention practices, email/Redis subprocessors, and any applicable legal obligations. Add an accurate policy that reflects how you actually operate; don't publish made-up legal text.

## Deployment to Vercel

1. Run local tests, lint, and build. Commit the source and generated package-lock.json to your repository. Never commit .env.local.
2. Import the repository in Vercel and select the Next.js framework preset. Root directory should be this project; install `npm ci`, build `npm run build`, and leave the framework output directory at its default.
3. Add the public and private environment variables in Vercel Project Settings. Scope them appropriately for production/preview. A preview can use CONTACT_ALLOWED_ORIGIN if its actual origin is not VERCEL_URL. Avoid production inbox credentials in untrusted preview environments.
4. Deploy, connect your real domain if desired, then set NEXT_PUBLIC_SITE_URL to the canonical origin and redeploy. Do not use a fabricated domain.
5. Verify theme before paint, EN/ES persistence, all anchor links, mobile drawer focus trapping/Escape, consultation behavior, FAQ keyboard controls, real email delivery, rate limit errors, /robots.txt, /sitemap.xml, and /opengraph-image.
6. Use Vercel and provider dashboards to monitor errors. If delivery is not configured, do not advertise the disabled form as a working lead channel.

## QA checklist

- 320, 375, 390, 768, 1024, 1280 and 1440 pixel widths, in English and Spanish.
- Dark, light and system; change OS theme while the page is open; reload persisted preference; clear storage; block localStorage.
- Keyboard-only navigation, visible focus, drawer focus wrap/Escape/close-on-selection, FAQ buttons, error focus.
- Reduced-motion enabled: reveal transforms, smooth scroll and nonessential transitions are reduced or removed.
- Forms: missing required fields, bad email, short/long description, unselected type, unchecked consent, network failure, no credentials, provider failure, valid send, rapid sends. Submit stays guarded while a request is pending.
- Resend: verify actual inbox delivery and reply-to; success doesn't mean confirmed scheduling.
- Audit both themes with automated tools and manual contrast checks. Light secondary text is intentionally darker than the suggested #64748B for small-text readability.
- Check Core Web Vitals on the real deployment; no numerical Lighthouse, accessibility, performance, or conversion scores are claimed here. Fonts are optimized with next/font. All previews are CSS/SVG, so no remote screenshot fetch or image-layout shift is required.

## File organization

app/                 App Router UI, metadata, generated OG image, route handler
components/          Focused page sections and reusable preference/UI components
lib/                 Content, configuration, shared validation, server readiness
public/              Reserved for future owned image assets
 tests/              Native Node validation tests

No TypeScript or heavyweight UI library is used. Tailwind v4 is configured through @tailwindcss/postcss; the custom visual system lives in globals.css. Layout motion uses Motion for React with the requested easing, reduced-motion support, viewport reveals, layout indicator, accordion transitions, mobile drawer animations and pointer-driven desktop hero. CSS supplies shimmer and theme color transitions; decorations do not run constant loops except the transient sending spinner.
#   b r i a n - b a z o o b a n d  
 