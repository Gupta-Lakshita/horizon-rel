Dockerized HorizonRelevance using a production-ready multi-stage Docker build.
Enabled Next.js standalone output for optimized container runtime.
Added Docker Compose configuration for Next.js + Redis.
Integrated Redis into the application.
Implemented Redis-backed rate limiting on /api/contact and /api/careers.
Added request throttling with automatic expiry to prevent form spam and protect Resend email endpoints.
Verified successful container build and startup using docker compose up --build.

Work Completed:

1. Dockerized the Next.js Application
Added a production-ready multi-stage Dockerfile.
Configured Next.js standalone output mode (output: "standalone").
Separated dependency installation, build, and runtime stages.
Reduced final image size by shipping only the production runtime artifacts.
Verified successful image build and application startup inside Docker.

2. Added Docker Compose
Created docker-compose.yml.
Configured a multi-container setup with:
HorizonRelevance (Next.js)
Redis
Added container networking and service discovery.
Configured environment variable injection through Compose.
Verified both containers start successfully using:
docker compose up --build

3. Added Redis Integration
Installed Redis client library.
Created a reusable Redis connection module.
Connected the application container to the Redis service defined in Compose.

4. Implemented Rate Limiting for Form APIs

Added Redis-backed rate limiting to:
/api/contact
/api/careers

Implementation details:
Extract client IP address.
Store request counters in Redis.
Increment counters per request.
Apply automatic key expiration (TTL).
Return HTTP 429 when limits are exceeded.

Example flow:

Request
  ↓
Redis Counter Check
  ↓
Limit Exceeded?
  ├─ Yes → 429 Too Many Requests
  └─ No  → Increment Counter → Process Request

5. Security Improvement

This prevents abuse of:
Contact form email submissions
Career application submissions
and protects the Resend email infrastructure from spam and automated attacks.

6. Supporting Files Added
Dockerfile
docker-compose.yml
.dockerignore
lib/redis.ts
and updates to:

next.config.ts
app/api/contact/route.ts
app/api/careers/route.ts