# HorizonRelevance Threat Model

## 1. Overview

This document describes the threat model for the HorizonRelevance application and the security controls implemented to reduce identified risks.

The application is a Next.js-based marketing website that provides:

- Public marketing pages
- Contact form
- Careers application form
- Email delivery using Resend
- Redis-backed API rate limiting
- Dockerized deployment
- Automated CI/CD pipeline
- Terraform-managed infrastructure

The application does not include user authentication, databases containing customer information, or payment processing functionality.

---

# 2. Security Objectives

The primary security objectives are:

- Maintain application availability.
- Protect the Resend API key.
- Prevent abuse of public-facing forms.
- Prevent deployment of vulnerable software.
- Reduce infrastructure and container security risks.
- Detect security issues early within the CI/CD pipeline.

---

# 3. Assets

The following assets are considered security-sensitive:

| Asset | Importance |
|--------|------------|
| Contact form submissions | High |
| Career application submissions | High |
| Resend API key | Critical |
| Source code repository | High |
| GitHub Actions workflows | High |
| Docker images | High |
| Terraform configuration | High |
| Redis rate-limiting data | Medium |

---

# 4. Trust Boundaries

The application contains several trust boundaries.

```
Internet Users
        │
        ▼
Next.js Application
        │
        ├────────────► Redis
        │
        ├────────────► Resend API
        │
        └────────────► GitHub Actions
                         │
                         ▼
                    Docker Hub
                         │
                         ▼
                     AWS EC2
```

Data crossing these boundaries is validated before processing.

---

# 5. Threat Analysis

## 5.1 Form Spam and Abuse

### Threat

Attackers repeatedly submit public forms to generate excessive email traffic or consume application resources.

### Impact

- Email spam
- Increased infrastructure usage
- Potential Resend quota exhaustion

### Mitigation

- Redis-backed rate limiting
- Request counters with expiration (TTL)
- HTTP 429 responses when limits are exceeded

---

## 5.2 Secret Leakage

### Threat

Sensitive credentials may be accidentally committed to the repository.

### Impact

- Unauthorized service access
- Credential compromise

### Mitigation

- GitLeaks scanning
- GitHub Actions security pipeline
- Environment variables for secrets
- No secrets committed to source control

---

## 5.3 Vulnerable Source Code

### Threat

Developers may introduce insecure coding patterns.

### Impact

- Injection attacks
- Information disclosure
- Security misconfiguration

### Mitigation

- Semgrep Static Application Security Testing
- ESLint validation
- Pull request validation

---

## 5.4 Vulnerable Dependencies

### Threat

Application dependencies or container packages may contain known CVEs.

### Impact

- Exploitable third-party vulnerabilities

### Mitigation

- Trivy vulnerability scanning
- Regular dependency updates
- Base image upgrades

---

## 5.5 Runtime Web Vulnerabilities

### Threat

Security weaknesses may only appear when the application is running.

### Impact

- Missing security headers
- Browser security weaknesses
- Information disclosure

### Mitigation

- OWASP ZAP Baseline Scan
- HTTP security headers
- Content Security Policy
- HSTS
- Referrer Policy
- X-Frame-Options
- X-Content-Type-Options

---

## 5.6 Container Security

### Threat

Container compromise through insecure configuration.

### Impact

- Increased attack surface
- Unauthorized file modification

### Mitigation

- Read-only root filesystem
- Restricted writable directories
- Multi-stage Docker build
- Docker Compose hardening

---

## 5.7 Infrastructure Misconfiguration

### Threat

Incorrect infrastructure configuration exposes cloud resources.

### Impact

- Unauthorized access
- Misconfigured deployments

### Mitigation

- Terraform Infrastructure as Code
- Version-controlled infrastructure
- Automated deployment pipeline

---

# 6. Security Controls

| Security Area | Control |
|---------------|---------|
| Static Analysis | Semgrep |
| Secret Detection | GitLeaks |
| Dependency Scanning | Trivy |
| Runtime Security | OWASP ZAP |
| HTTP Security | Security Headers |
| Rate Limiting | Redis |
| Container Security | Docker Hardening |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |

---

# 7. Assumptions

The threat model assumes:

- HTTPS is enforced in production.
- Secrets are stored securely using environment variables.
- GitHub repository permissions are appropriately configured.
- Docker images are rebuilt regularly to receive upstream security patches.
- Terraform remains the source of truth for infrastructure provisioning.

---

# 8. Residual Risk

Some risks remain despite implemented controls:

- Newly disclosed vulnerabilities in upstream dependencies before patches become available.
- Zero-day vulnerabilities affecting Node.js, Next.js, Docker, or Redis.
- Denial-of-service attacks exceeding application-level rate limiting.
- Human error during infrastructure or deployment changes.

These risks are reduced through continuous security scanning, dependency updates, infrastructure version control, and automated CI/CD validation.

---

# 9. Conclusion

The HorizonRelevance application follows a layered defense approach that combines secure development practices, automated security testing, container hardening, infrastructure as code, and runtime validation. Security controls are integrated throughout the Secure SDLC, providing protection across source code, dependencies, containers, runtime behavior, infrastructure, and deployment.