Implemented GitHub Actions CI workflow (ci.yml) to run on every push and pull request.

The workflow performs:

Dependency installation (npm ci)
TypeScript type checking (tsc --noEmit)
ESLint validation
Production build verification (next build)

While validating the pipeline, CI exposed several existing issues:

Fixed ESLint violations (unescaped entities and Next.js Link usage)
Resolved Redis initialization causing build failures during route evaluation
Refactored Redis initialization to occur lazily within request handling instead of at module load time

Verified locally that:

TypeScript checks pass
ESLint passes
Production build succeeds

The Redis client was being initialized at module import time (await getRedisClient() at the route level). During Next.js build, route modules are evaluated, which caused Redis connection attempts and build failures when Redis environment variables were unavailable. I moved initialization into the request handler so Redis is only accessed when the endpoint receives a request.