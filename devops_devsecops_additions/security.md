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

I reviewed the Trivy findings and performed vulnerability triage.
The latest scan reports:

* 0 Critical vulnerabilities
* 2 High and 8 Medium vulnerabilities in Alpine OS packages
* 11 High and 3 Medium vulnerabilities in Node package dependencies

The High-severity OS findings are in OpenSSL libraries (`libcrypto3` and `libssl3`) provided by the Alpine base image. Trivy indicates fixed versions are available (`3.5.7-r0`), so these can be remediated through a base image upgrade.

The Node.js findings are primarily in transitive dependencies bundled with npm (e.g., `cross-spawn`, `glob`, `minimatch`, and `tar`) rather than in the Horizon Relevance application code itself. Trivy provides fixed versions for these packages, indicating that future npm or Node image updates should reduce the remaining findings.

No Critical vulnerabilities or exposed secrets were detected. I understand how to classify findings by severity, determine whether fixes are available, identify whether vulnerabilities originate from application code, transitive dependencies, or the container base image, and propose remediation actions accordingly.

(Why didn't the vulnerability count go to zero?

Because Trivy scans the entire container image, including Alpine Linux packages and npm bundled within the Node runtime. Many findings are inherited from upstream components rather than the Horizon Relevance application code. The appropriate remediation path is upgrading the base image and runtime dependencies as patched versions become available.)