# Horizon Relevance

Marketing and product site for Horizon Relevance LLC — a company offering AI, Cloud, and DevSecOps services.

Built with **Next.js 16 App Router** and enhanced with a production-ready DevSecOps pipeline, Infrastructure as Code (IaC), automated cloud deployment, and layered security validation.

**Production:** https://horizonrelevance.com

**Vercel Deployment:** https://horizon-rel.vercel.app/

---

# Project Status

| Component | Status |
| ---------- | ------ |
| Docker Containerization | ✅ Complete |
| Redis Integration | ✅ Complete |
| GitHub Actions CI | ✅ Complete |
| Security Pipeline (Semgrep, GitLeaks, Trivy, OWASP ZAP) | ✅ Complete |
| HTTP Security Hardening | ✅ Complete |
| Threat Modeling & Security Documentation | ✅ Complete |
| Terraform Infrastructure as Code | ✅ Complete |
| AWS EC2 Deployment | ✅ Complete |
| Docker Compose Deployment | ✅ Complete |
| GitHub Actions Continuous Deployment | ✅ Complete |

---

# Key Features

- Next.js 16 App Router application
- Production-grade multi-stage Docker build
- Docker Compose orchestration
- Redis-backed API rate limiting
- Automated CI/CD with GitHub Actions
- Infrastructure as Code using Terraform
- Automated AWS EC2 deployment
- Integrated DevSecOps pipeline
- Static Application Security Testing (SAST)
- Dynamic Application Security Testing (DAST)
- Container vulnerability scanning
- Automated secret detection
- HTTP security hardening
- Threat modeling and security documentation

---

# My Contributions

- [✓] Production-grade multi-stage Dockerfile using Next.js standalone output
- [✓] Docker Compose setup for the application and Redis services
- [✓] Redis integration with Redis-backed API rate limiting
- [✓] Request throttling and spam protection for contact and careers endpoints
- [✓] GitHub Actions CI pipeline (TypeScript → ESLint → Production Build)
- [✓] Automated security pipeline using Semgrep (SAST), GitLeaks, Trivy, and OWASP ZAP (DAST)
- [✓] Remediated security findings surfaced by Semgrep and OWASP ZAP
- [✓] Implemented HTTP security hardening through Content Security Policy (CSP), HSTS, Referrer Policy, X-Frame-Options, X-Content-Type-Options, Permissions Policy, Cross-Origin policies, and removal of the X-Powered-By header
- [✓] Infrastructure as Code (Terraform) for automated AWS EC2 provisioning
- [✓] GitHub Actions Continuous Deployment pipeline
- [✓] Docker Hub image publishing and automated cloud deployment
- [✓] Created comprehensive security documentation and application threat model

---

# Architecture

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
    ├── Semgrep (SAST)
    ├── GitLeaks
    ├── Docker Build
    ├── Trivy
    └── OWASP ZAP (DAST)
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

# Technology Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Email | Resend v6 |
| Caching / Rate Limiting | Redis |
| Containerization | Docker, Docker Compose |
| Infrastructure as Code | Terraform |
| Cloud | AWS EC2 |
| CI/CD | GitHub Actions |
| Security | Semgrep, GitLeaks, Trivy, OWASP ZAP |
| Hosting | Vercel |

> **Tailwind CSS v4 Note:** Tailwind v4 no longer uses `tailwind.config.ts`. Theme customization is defined in `app/globals.css` using the `@theme` directive.

---

# Site Structure

The application is a single-domain Next.js website composed of stacked homepage sections.

```text
Hero
   ↓
Offerings
   ↓
Products
   ↓
Solutions
   ↓
Why Us
   ↓
Industries
   ↓
Company
   ↓
Contact
```

Additional routes:

- `/careers` — Job listings and application form
- `/team` — Team profiles
- `/products/[slug]` — Individual product pages
- `/blog` — Blog (placeholder)

---

# Forms & Email

The application provides two public-facing forms:

- Contact Form
- Careers Application Form

Both forms submit requests to Next.js API routes which use the Resend API to deliver emails.

To prevent abuse, Redis-backed rate limiting is applied to each endpoint.

Request flow:

```text
User Request
      ↓
Redis Counter Lookup
      ↓
Limit Exceeded?
      ├── Yes → HTTP 429 Too Many Requests
      └── No
             ↓
      Increment Counter
             ↓
      Send Email via Resend
```

Rate-limit counters automatically expire using Redis TTL, providing lightweight spam protection without requiring a database.

---

# Local Development

```bash
npm install

# Create .env.local
RESEND_API_KEY=your_api_key

npm run dev
```

Application URL:

```text
http://localhost:3000
```

Required environment variables:

| Variable | Purpose |
| -------- | ------- |
| `RESEND_API_KEY` | Authenticates the Resend email client |

---

# Infrastructure & Deployment

Infrastructure is provisioned using Terraform.

Terraform automatically creates an AWS EC2 instance and bootstraps it using a user-data script which:

1. Installs Docker
2. Installs Docker Compose
3. Pulls the latest Docker images
4. Starts the Horizon Relevance application stack

Deployment architecture:

```text
Terraform
      ↓
AWS EC2
      ↓
Docker Compose
      ├── Horizon Relevance
      └── Redis
```

---

# CI / Security / Deployment Pipelines

GitHub Actions workflows are located in:

```text
.github/workflows/
```

## Continuous Integration (`ci.yml`)

Runs on every push and pull request.

Pipeline:

- Install dependencies (`npm ci`)
- TypeScript validation (`tsc --noEmit`)
- ESLint validation
- Production build verification (`next build`)

---

## Security Pipeline (`security.yml`)

Runs automated application security validation.

Pipeline:

- Semgrep Static Application Security Testing (SAST)
- GitLeaks secret scanning
- Docker image build
- Trivy container vulnerability scanning
- OWASP ZAP Baseline Scan (DAST)
- Security report generation

Security findings are reviewed and remediated throughout development. HTTP security headers are enforced through the Next.js configuration, and remediation commits reference the relevant OWASP Top 10 category where applicable.

---

## Continuous Deployment (`deploy.yml`)

Runs on pushes to the main branch.

```text
Git Push
      ↓
GitHub Actions
      ↓
Build Docker Image
      ↓
Push Docker Hub
      ↓
SSH to AWS EC2
      ↓
docker compose pull
      ↓
docker compose up -d
```

This provides automated container publishing and Continuous Deployment to the cloud-hosted environment.

---

# Documentation

Implementation details for each major milestone are documented separately within the repository.

| Document | Description |
|----------|-------------|
| `docker_redis.md` | Docker containerization, Docker Compose setup, Redis integration, and API rate limiting |
| `ci.md` | GitHub Actions Continuous Integration pipeline implementation and build validation |
| `security.md` | Initial security pipeline implementation using Semgrep, GitLeaks, Trivy, vulnerability analysis, and remediation |
| `security_enhancements.md` | Reviewer-requested security enhancements including OWASP ZAP (DAST), HTTP security hardening, OWASP-based remediation, and security documentation |
| `threat_model.md` | Application threat model, trust boundaries, identified threats, mitigations, assumptions, and residual risks |
| `deploy.md` | Terraform Infrastructure as Code, AWS EC2 provisioning, Docker Hub integration, and Continuous Deployment pipeline |
| `final.md` | Consolidated implementation summary of all completed project phases |

The application follows a layered defense strategy consisting of:

- Secure coding practices
- Static Application Security Testing (Semgrep)
- Dynamic Application Security Testing (OWASP ZAP)
- Secret detection (GitLeaks)
- Container vulnerability scanning (Trivy)
- Redis-backed API rate limiting
- Docker container hardening
- HTTP security hardening
- Infrastructure as Code (Terraform)
- Automated CI/CD security validation

---

# Security Coverage

| Security Control | Technology |
| ---------------- | ---------- |
| Static Application Security Testing | Semgrep |
| Dynamic Application Security Testing | OWASP ZAP |
| Secret Detection | GitLeaks |
| Container Vulnerability Scanning | Trivy |
| HTTP Security Headers | Next.js Security Configuration |
| API Abuse Protection | Redis Rate Limiting |
| Docker Hardening | Read-only Filesystem & Least Privilege Configuration |
| Infrastructure Security | Terraform |
| Continuous Integration | GitHub Actions |
| Continuous Deployment | GitHub Actions + Docker |

---

# Summary

This project demonstrates an end-to-end Secure Software Development Lifecycle (Secure SDLC) implementation for a production-ready Next.js application.

The solution combines containerization, Infrastructure as Code, automated CI/CD, cloud deployment, static and dynamic security testing, container vulnerability scanning, secret detection, HTTP security hardening, and documented threat modeling to provide layered security throughout the software development lifecycle.