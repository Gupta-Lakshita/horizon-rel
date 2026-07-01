# Security Enhancements

These changes extend the existing Secure SDLC pipeline by adding dynamic application security testing, strengthening HTTP security configuration, improving vulnerability traceability, and documenting the application's threat model.

---

# 1. Added OWASP ZAP Dynamic Application Security Testing (DAST)

The existing GitHub Actions security workflow was extended with **OWASP ZAP Baseline Scan** to perform Dynamic Application Security Testing (DAST) against the running HorizonRelevance application.

The security pipeline now performs:

- Semgrep – Static Application Security Testing (SAST)
- GitLeaks – Secret Detection
- Docker Image Build
- Trivy – Container Vulnerability Scanning
- OWASP ZAP Baseline Scan – Dynamic Application Security Testing (DAST)

Unlike Semgrep, which analyzes source code, OWASP ZAP evaluates the deployed application by inspecting HTTP requests and responses, allowing runtime security issues and configuration weaknesses to be identified.

## DAST Workflow

```
GitHub Actions
        ↓
Build Docker Image
        ↓
Start Application Containers
        ↓
OWASP ZAP Baseline Scan
        ↓
Generate Security Report
```

---

# 2. OWASP ZAP Validation and Remediation

The OWASP ZAP baseline scan completed successfully and validated the running application.

### Scan Summary

- 62 security checks passed
- 5 configuration warnings identified
- 0 failed security tests

The scan identified several HTTP security configuration improvements, including:

- X-Powered-By header disclosure
- Missing Content Security Policy (CSP)
- Cacheable response headers
- Missing Cross-Origin security headers

To remediate the findings, the application was updated to:

- Disable the `X-Powered-By` response header.
- Add a Content Security Policy (CSP).
- Configure Cross-Origin-Opener-Policy and Cross-Origin-Resource-Policy headers.
- Retain existing HTTP security headers, including:
  - Strict-Transport-Security (HSTS)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy

These changes strengthen browser-side protections and reduce unnecessary information disclosure.

---

# 3. Semgrep Security Remediation

Previously identified Semgrep findings were remediated as part of the Secure SDLC process.

Earlier work included Docker Compose hardening by:

- Configuring the Redis container with a read-only root filesystem.
- Restricting writable locations to the Redis data volume and temporary filesystem.
- Applying additional HTTP security header hardening identified during validation.

Security remediation commits reference the corresponding **OWASP Top 10** category to provide traceability between identified vulnerabilities and implemented fixes.

Example:

- **OWASP A05 – Security Misconfiguration**

This approach makes security improvements directly visible within the project history and links implementation work to established security standards.

---

# 4. Threat Model Documentation

A dedicated `threat_model.md` document was added to formally describe the application's security posture and threat model.

The document includes:

- Application overview
- Security architecture
- Protected assets
- Threat model
- Security controls
- Responsible vulnerability disclosure process

## Protected Assets

- Contact form submissions
- Career application submissions
- Resend API credentials
- Application source code
- Docker images
- GitHub Actions workflows
- Terraform infrastructure configuration

## Threat Model

| Threat | Mitigation |
|---------|------------|
| Automated form spam | Redis-backed rate limiting |
| Secret leakage | GitLeaks secret scanning |
| Vulnerable application code | Semgrep SAST |
| Runtime web vulnerabilities | OWASP ZAP DAST |
| Container and OS vulnerabilities | Trivy container scanning |
| Security misconfiguration | HTTP security headers, Docker hardening, Semgrep validation |
| Container compromise | Read-only filesystem and restricted writable paths |
| Infrastructure misconfiguration | Terraform Infrastructure as Code |
| Deployment risks | GitHub Actions CI/CD validation |

Documenting the threat model provides a clear understanding of the application's attack surface and the controls implemented to reduce associated risks.

---

# 5. Updated Security Coverage

The HorizonRelevance security pipeline now provides layered security controls throughout the software development lifecycle.

| Security Control | Technology |
|------------------|------------|
| Static Application Security Testing (SAST) | Semgrep |
| Secret Detection | GitLeaks |
| Container Vulnerability Scanning | Trivy |
| Dynamic Application Security Testing (DAST) | OWASP ZAP |
| HTTP Security Hardening | Next.js Security Headers |
| Docker Hardening | Read-only Filesystem and Least Privilege Configuration |
| Infrastructure as Code | Terraform |
| Continuous Integration | GitHub Actions |
| Continuous Deployment | GitHub Actions + Docker |

---

# Summary

The security implementation was extended beyond static analysis to include runtime security validation through OWASP ZAP, strengthened HTTP security configuration, improved vulnerability traceability by mapping remediation commits to OWASP Top 10 categories, and documented the application's threat model.
