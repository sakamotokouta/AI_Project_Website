# Codex initial implementation prompt

Read `AGENTS.md` and every document under `docs/` in the required order.

Build the full-stack website for the fictional bakery **Boulangerie Mugi no Akari**. If this repository already contains code, inspect it first and update it instead of replacing working functionality without reason.

## Required outcome

Implement the public bakery website and a protected admin area using the fixed stack in `AGENTS.md`.

### Public pages

- `/`
- `/about`
- `/menu`
- `/reserve`
- `/contact`

### Admin pages

- `/admin/login`
- `/admin`
- `/admin/menu`
- `/admin/menu/new`
- `/admin/menu/[id]`
- `/admin/reservations`
- `/admin/reservations/[id]`
- `/admin/contacts`
- `/admin/contacts/[id]`
- `/admin/images`
- `/admin/hero-slides`

The public site must not contain an admin link. `/admin/login` is reached only by entering its URL. However, URL obscurity is not authentication: every other admin page and every admin API must require a valid admin session.

## Required additions and fixes

1. Add admin authentication and protected admin routes.
2. Add menu creation and editing in the admin area.
3. Add reservation-list/detail/status management.
4. Add contact-inquiry-list/detail/status management.
5. Add a media library that can upload, replace metadata for, and safely delete unused uploaded images.
6. Add hero-slide management that assigns media to the home carousel, controls order, active state, text, and image position.
7. Fix the home hero so the shop name and hero image never collide at supported viewport sizes.
8. Show multiple home hero images as an accessible carousel that changes every 5 seconds by default.
9. Add subtle, pleasant button micro-interactions without reducing readability or accessibility.

## Implementation constraints

- Nuxt 3 + Vue 3 + TypeScript.
- Backend only in Nuxt `server/api`; do not create Express.
- PostgreSQL with Prisma.
- Docker Compose for local PostgreSQL.
- Zod validation on both client and server, with server validation authoritative.
- SCSS styling.
- Use `bcryptjs` for admin password hashes.
- Use random opaque session tokens stored in an `HttpOnly` cookie and store only token hashes in PostgreSQL.
- Use `file-type` to validate uploaded file signatures.
- Local uploads go under a dedicated `public/uploads` boundary for this portfolio/local release.
- Accept JPEG, PNG, and WebP only, maximum 5 MiB.
- Do not expose credentials, hashes, session tokens, or stack traces.
- Do not implement payment, actual email sending, customer accounts, or real-time inventory.

## Work sequence

1. Briefly summarize the current repository state and provide a short plan.
2. Create or update project dependencies and configuration.
3. Create or update Docker, environment, Prisma schema, migration, seed, and server utilities.
4. Implement authentication and admin authorization guards.
5. Implement public and admin APIs.
6. Implement public pages and responsive hero/carousel fixes.
7. Implement admin pages and image-management UI.
8. Add accessibility, reduced-motion behavior, SEO, and `noindex` for admin pages.
9. Update the repository README with setup, admin seeding, uploads, and verification instructions.
10. Run `npm run typecheck` and `npm run build`, fix failures, and report results.

## Completion report

At the end, report:

- files added or changed;
- Prisma migration name;
- environment variables added;
- commands run and their results;
- test coverage or manual checks completed;
- any limitation, especially local filesystem upload persistence in production environments.

Do not stop after generating a plan. Continue through implementation and verification.
