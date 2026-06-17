# Horizon Relevance — Project Overview

This is the marketing and product site for Horizon Relevance LLC, a company offering AI, Cloud, and DevSecOps services. It's a single-domain Next.js app deployed on Vercel.

---

## Stack

| Thing | What's used |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Email | Resend (v6) |
| Fonts | Geist Sans, Geist Mono, Plus Jakarta Sans |
| Hosting | Vercel |

Tailwind v4 is meaningfully different from v3 — there's no `tailwind.config.ts`. Theme customisation lives in `app/globals.css` under `@theme`. Read `node_modules/next/dist/docs/` if anything feels off about Next.js APIs.

---

## Running locally

```bash
npm install
# create .env.local with:
# RESEND_API_KEY=your_key_here
npm run dev
```

The site runs at `http://localhost:3000`. No database, no auth, no external data fetching — it's mostly static content with two API routes for the forms.

---

## How the site is structured

The homepage (`app/page.tsx`) is a single long page built from stacked section components:

```
Hero → Offerings → Products → Solutions → WhyUs → Industries → Company → Contact
```

Each of those is its own file in `components/`. The `Navbar` and `SectionIndex` (a floating dot-nav on the right side) are mounted globally in `app/layout.tsx` and sit on top of everything.

Beyond the homepage, there are a handful of standalone routes:

- `/careers` — job listings and application form
- `/team` — team profiles
- `/blog` — blog (currently a placeholder)
- `/products/[slug]` — five individual product pages

---

## Components

**Homepage sections** (`components/`):

- `Hero.tsx` — the opening splash with headline, subtext, and CTA buttons
- `Offerings.tsx` — three-column overview of service categories
- `Products.tsx` — tabbed product showcase; clicking through navigates to a product page
- `Solutions.tsx` — use-case cards
- `WhyUs.tsx` — differentiator points
- `Industries.tsx` — industry focus + scrolling client logo marquee
- `Company.tsx` — company background, team tease, company values
- `Contact.tsx` — contact form + footer (they live in the same component/section)

**Shared**:

- `Navbar.tsx` — top navigation, collapses to a hamburger on mobile
- `SectionIndex.tsx` — the subtle dot navigation on the right edge of the screen
- `ProductPageTemplate.tsx` — shared layout wrapper used by all five product pages

**Product visuals** (`components/product-visuals/`):
One animated visual component per product, rendered inside `ProductPageTemplate`. These are pure presentational — SVG/CSS animations that illustrate what the product does.

---

## Product pages

All five product pages follow the same pattern: they import `ProductPageTemplate` and pass it the relevant content (title, description, features list, visual component). The template handles layout, the back-to-products link, and the consistent section structure.

Routes:
- `/products/ai-powered-secure-sdlc`
- `/products/ai-devsecops-platform`
- `/products/ai-monitoring-incident-response`
- `/products/cloud-cost-optimization`
- `/products/cloud-migration-modernization`

---

## Forms and email

There are two forms — contact (on the homepage) and careers (`/careers`). Both work the same way:

1. The form component does a `fetch` POST to its API route
2. The API route (`app/api/contact/route.ts` or `app/api/careers/route.ts`) calls Resend to send an email to `horizonrelevance@gmail.com`
3. On success, the form flips to a success state

**Important Resend detail:** the `from` address is `onboarding@resend.dev`, which is Resend's shared sender. This only works for sending to the verified account email (which is `horizonrelevance@gmail.com`). If you ever want to send to other addresses or use a custom `from`, you'll need to verify a domain in the Resend dashboard.

The `RESEND_API_KEY` env var must be set — in `.env.local` for local dev, in Vercel's Environment Variables for production. If it's missing, the API routes fail silently with a generic error.

---

## Styling

Dark theme throughout. The base background is a deep violet-navy gradient set on `<body>` in `globals.css`. Individual sections layer their own radial gradients on top — the Contact section is dark green, the Company section is amber/purple, etc. This is all done with inline `style` props rather than Tailwind classes for the gradient values, because Tailwind doesn't cover arbitrary gradient stops cleanly.

Animations use Framer Motion almost everywhere — scroll-triggered fades, hover effects on cards and buttons, the loading spinner on form submission. The client logo marquee in Industries uses a CSS keyframe animation (`marquee-left`, defined in `globals.css`) rather than Framer Motion, since it runs continuously.

Mobile responsiveness uses Tailwind's `sm:` and `md:` breakpoint prefixes. Touch targets are at least 44px. Font sizes in a few places use `clamp()` for fluid scaling between mobile and desktop.

---

## SEO and metadata

`app/layout.tsx` sets the global metadata (title template, description, OG tags, Twitter card). Individual pages can override this by exporting their own `metadata` object. There's also:

- `app/opengraph-image.tsx` — generates the 1200×630 OG preview image dynamically
- `app/robots.ts` — generates `robots.txt`
- `app/sitemap.ts` — generates `sitemap.xml`
- JSON-LD structured data for the organisation, injected in the root layout

---

## Assets

`/public/strip1.png` and `/public/strip2.png` are the client logo strips used in the Industries marquee. They have transparent backgrounds (white pixels were removed). They're rendered with `filter: invert(1)` in the browser so the dark logos show up white against the dark section background.

Team photos live in `/public/` directly (`ankur-kashyap.jpg`, `rishi-sharma.jpg`).

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `.env.local` / Vercel | Authenticates the Resend email client |

That's the only one. No other secrets or configuration needed.
