Implemented `security.yml` and verified the workflow executes successfully on push/PR.

Security pipeline now includes:

* Semgrep SAST scan for TypeScript/Next.js code
* GitLeaks scan for secrets in repository history
* Docker image build
* Trivy container vulnerability scan
* Security report artifact generation and upload

During validation, Semgrep flagged a Docker Compose hardening issue on the Redis service (`writable-filesystem-service`). I remediated it by configuring the Redis container with a read-only root filesystem and restricting writable paths to the Redis data volume and temporary filesystem mounts.

After the remediation:

* Semgrep passes
* GitLeaks passes
* Docker image builds successfully
* Trivy scan completes successfully
* Security workflow completes successfully and uploads the security report artifact

I also reviewed the Trivy findings and understand the distinction between Critical, High, Medium, and Low severities, as well as the significance of vulnerabilities that have a fix available versus those awaiting upstream patches.

I reviewed the Trivy results and performed an initial vulnerability triage. The scan reported 0 Critical vulnerabilities, 2 High and 8 Medium OS-package vulnerabilities in the Alpine base image, and 11 High and 3 Medium vulnerabilities in transitive Node.js dependencies. Most findings have a vendor-provided fixed version available, indicating they can be remediated through base image and dependency upgrades. The High-severity OpenSSL findings originate from Alpine packages (libcrypto3 and libssl3) rather than application code. No secrets were detected in the container image.