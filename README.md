# Horizon Relevance

Marketing and product site for [Horizon Relevance LLC](https://horizonrelevance.com) — a company offering AI, Cloud, and DevSecOps services.

Built with Next.js 16 App Router, deployed on Vercel. **[Live site →](https://horizonrelevance.com)**

---

## My Contributions

- [✓] Production-grade multi-stage Dockerfile (Next.js standalone output)
- [✓] CI pipeline via GitHub Actions: type-check → lint → build on every push
- [ ] Security pipeline: Semgrep (SAST) + GitLeaks (secrets detection) + Trivy (container scan)
- [ ] Fixed real vulnerabilities surfaced by the security scan

*Currently in progress — tracking against internship milestones.*

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Email | Resend v6 |
| Hosting | Vercel |

> **Tailwind v4 note:** No `tailwind.config.ts`. Theme customisation lives in `app/globals.css` under `@theme`.

---

## Site Structure

Single-domain app. The homepage is a stacked sequence of section components:

```
Hero → Offerings → Products → Solutions → WhyUs → Industries → Company → Contact
```

Additional routes:

- `/careers` — job listings and application form  
- `/team` — team profiles  
- `/products/[slug]` — five individual product pages  
- `/blog` — placeholder

---

## Forms and Email

Two forms (contact and careers) both POST to Next.js API routes, which call Resend to deliver to the company inbox. The `from` address is Resend's shared sender (`onboarding@resend.dev`), which only works for the verified account email. Custom domain sending requires domain verification in the Resend dashboard.

---

## Local Setup

```bash
npm install

# Create .env.local:
# RESEND_API_KEY=your_key_here

npm run dev
```

Runs at `http://localhost:3000`. No database, no auth, no external data fetching.

**Required environment variables:**

| Variable | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `.env.local` / Vercel | Authenticates the Resend email client |

---

## CI / Security Pipeline

> This section updates as the pipeline is built. See `.github/workflows/` for current state.

**Planned:**
- `ci.yml` — install, `tsc --noEmit`, ESLint, `next build`
- `security.yml` — Semgrep SAST, GitLeaks secrets scan, Trivy container scan

**When live:** pipeline status badge will appear here.

