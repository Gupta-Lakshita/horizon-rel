# Horizon Relevance

Marketing and product site for Horizon Relevance LLC — a company offering AI, Cloud, and DevSecOps services.

Built with Next.js 16 App Router.

**Production:** https://horizonrelevance.com

**Vercel Deployment:** https://horizon-rel.vercel.app/

---

## Project Status

| Component                                    | Status     |
| -------------------------------------------- | ---------- |
| Docker Containerization                      | ✅ Complete |
| Redis Integration                            | ✅ Complete |
| GitHub Actions CI                            | ✅ Complete |
| Security Pipeline (Semgrep, GitLeaks, Trivy) | ✅ Complete |
| Terraform Infrastructure as Code             | ✅ Complete |
| AWS EC2 Deployment                           | ✅ Complete |
| Docker Compose Deployment                    | ✅ Complete |
| GitHub Actions Continuous Deployment         | ✅ Complete |

---

## My Contributions

* [✓] Production-grade multi-stage Dockerfile (Next.js standalone output)
* [✓] Docker Compose setup for application and Redis services
* [✓] Redis integration and Redis-backed API rate limiting
* [✓] Request throttling and spam protection for contact and careers endpoints
* [✓] CI pipeline via GitHub Actions: type-check → lint → build on every push
* [✓] Security pipeline: Semgrep (SAST) + GitLeaks (secrets detection) + Trivy (container vulnerability scanning)
* [✓] Remediated security findings surfaced by automated scanning
* [✓] Infrastructure as Code (IaC) using Terraform
* [✓] Automated AWS EC2 provisioning and deployment
* [✓] GitHub Actions Continuous Deployment pipeline
* [✓] Docker Hub image publishing and automated cloud deployment

---

## Architecture

```text
Developer
    ↓
Git Push
    ↓
GitHub Actions CI
    ├── TypeScript Validation
    ├── ESLint Validation
    └── Next.js Production Build
    ↓
GitHub Actions Security
    ├── Semgrep
    ├── GitLeaks
    └── Trivy
    ↓
Docker Build
    ↓
Docker Hub
    ↓
GitHub Actions CD
    ↓
AWS EC2 (Terraform Provisioned)
    ↓
Docker Compose
    ├── Horizon Relevance (Next.js)
    └── Redis
```

---

## Stack

| Layer                  | Technology               |
| ---------------------- | ------------------------ |
| Framework              | Next.js 16 (App Router)  |
| UI                     | React 19 + TypeScript    |
| Styling                | Tailwind CSS v4          |
| Animations             | Framer Motion            |
| Email                  | Resend v6                |
| Containerization       | Docker, Docker Compose   |
| Infrastructure as Code | Terraform                |
| Cloud                  | AWS EC2                  |
| CI/CD                  | GitHub Actions           |
| Security               | Semgrep, GitLeaks, Trivy |
| Hosting                | Vercel                   |

> **Tailwind v4 note:** No `tailwind.config.ts`. Theme customisation lives in `app/globals.css` under `@theme`.

---

## Site Structure

Single-domain app. The homepage is a stacked sequence of section components:

```text
Hero → Offerings → Products → Solutions → WhyUs → Industries → Company → Contact
```

Additional routes:

* `/careers` — job listings and application form
* `/team` — team profiles
* `/products/[slug]` — five individual product pages
* `/blog` — placeholder

---

## Forms and Email

Two forms (contact and careers) POST to Next.js API routes, which call Resend to deliver messages to the company inbox.

The application includes Redis-backed rate limiting to protect public-facing endpoints from spam and abuse. Rate limit entries expire automatically, providing lightweight protection without requiring a database.

The `from` address is Resend's shared sender (`onboarding@resend.dev`), which only works for the verified account email. Custom domain sending requires domain verification in the Resend dashboard.

---

## Local Setup

```bash
npm install

# Create .env.local:
# RESEND_API_KEY=your_key_here

npm run dev
```

Runs at:

```text
http://localhost:3000
```

**Required environment variables:**

| Variable         | Where                 | Purpose                               |
| ---------------- | --------------------- | ------------------------------------- |
| `RESEND_API_KEY` | `.env.local` / Vercel | Authenticates the Resend email client |

---

## Infrastructure & Deployment

Infrastructure is provisioned through Terraform and deployed to AWS EC2.

Terraform bootstraps the instance using a user-data script that:

1. Installs Docker and Docker Compose
2. Deploys the application stack
3. Starts the Horizon Relevance and Redis containers

Deployment architecture:

```text
Terraform
    ↓
AWS EC2
    ↓
Docker Compose
    ├── Horizon Relevance (Next.js)
    └── Redis
```

---

## CI / Security / Deployment Pipelines

GitHub Actions workflows are located in `.github/workflows/`.

### CI (`ci.yml`)

Runs on every push and pull request:

* Dependency installation (`npm ci`)
* TypeScript validation (`tsc --noEmit`)
* ESLint validation
* Production build verification (`next build`)

### Security (`security.yml`)

Runs automated security checks:

* Semgrep SAST scanning
* GitLeaks secret detection
* Docker image build
* Trivy container vulnerability scanning
* Security report artifact generation

### Deployment (`deploy.yml`)

Runs on pushes to the main branch:

```text
git push
    ↓
GitHub Actions
    ↓
Build Docker Image
    ↓
Push Docker Hub
    ↓
Deploy to AWS EC2
    ↓
docker-compose pull
    ↓
docker-compose up -d
```

This provides automated container publishing and Continuous Deployment to the cloud-hosted environment.
