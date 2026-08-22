# AGENTS.md

## Project

Boulangerie Mugi no Akari website.

This repository is a portfolio-grade full-stack Nuxt application for a fictional bakery. Implement and maintain it according to the documents in `docs/`.

## Required reading order

Before editing code, read these files in order:

1. `docs/00_PROJECT_OVERVIEW.md`
2. `docs/01_ENVIRONMENT_SETUP.md`
3. `docs/02_SYSTEM_DESIGN.md`
4. `docs/03_DATABASE_DESIGN.md`
5. `docs/04_API_DESIGN.md`
6. `docs/05_FRONTEND_DESIGN.md`
7. `docs/06_ADMIN_AND_MEDIA_DESIGN.md`
8. `docs/07_IMPLEMENTATION_TASKS.md`
9. `docs/08_TEST_CHECKLIST.md`

When the repository already contains implementation code, inspect the existing code before changing it. Preserve working behavior unless a specification explicitly replaces it.

## Fixed technology stack

Do not replace this stack unless the user explicitly requests a change:

- Framework: Nuxt 3
- UI: Vue 3
- Language: TypeScript
- Backend: Nuxt `server/api`
- Runtime: Node.js LTS
- Database: PostgreSQL
- ORM: Prisma
- Local database: Docker Compose
- Validation: Zod
- Styling: SCSS
- Package manager: npm
- Password hashing: `bcryptjs`
- Uploaded-file signature validation: `file-type`

## Architecture rules

- Do not create a separate Express server or backend repository.
- Implement APIs under Nuxt `server/api`.
- Access PostgreSQL only through Prisma.
- Keep Prisma Client initialization in a server-only utility.
- Never expose `DATABASE_URL`, password hashes, session tokens, or admin credentials to client code.
- Reuse validation schemas between frontend and backend where practical, but always validate again on the server.
- Store menu data, reservations, reservation items, contact inquiries, admin users, admin sessions, media metadata, and hero-slide configuration in PostgreSQL.
- Store shop information and SNS links as local constants for this release.
- Use local filesystem uploads only for local/portfolio deployment. Keep the storage boundary isolated so object storage can replace it later.
- Do not implement payment, actual email sending, customer accounts, or real-time inventory unless explicitly requested.

## Admin access rules

- The public header, footer, sitemap, and other public navigation must not link to the admin area.
- Hiding the URL is not security. Every admin page and every admin API must require a valid authenticated admin session.
- `/admin/login` may be opened directly by URL.
- Unauthenticated access to any other `/admin/**` page must redirect to `/admin/login`.
- Unauthorized admin API access must return `401` or `403` and must not leak sensitive details.
- Use an opaque random session token in an `HttpOnly` cookie. Store only a hash of the token in the database.
- Use `Secure` cookies in production and `SameSite=Strict` unless a documented integration requires otherwise.
- Admin pages must use `noindex, nofollow` metadata.

## Coding rules

- Use Composition API and `<script setup lang="ts">`.
- Use TypeScript types for props, emits, API payloads, API responses, route data, and form state.
- Keep components small and responsibility-focused.
- Prefer `$fetch` or `useFetch` for Nuxt API calls.
- Avoid duplicated business logic.
- Use semantic HTML and accessible labels.
- Every form field must have a label and accessible error messaging.
- Ensure keyboard operation and visible focus states.
- Respect `prefers-reduced-motion` for every animation, including the hero carousel.
- External SNS links must include `target="_blank"` and `rel="noopener noreferrer"`.
- Never render user input as raw HTML.
- Do not log credentials, cookies, tokens, password hashes, or full sensitive form payloads.

## Image upload rules

- Accept only JPEG, PNG, and WebP.
- Maximum file size is 5 MiB unless the user changes the requirement.
- Validate both the declared MIME type and the file signature.
- Generate server-side filenames; never trust the original filename as a storage path.
- Prevent path traversal.
- Require useful alt text for meaningful images.
- Do not delete a media file while it is referenced by a menu item or hero slide.
- Static seed assets must not be physically deleted by the admin UI.

## UI quality rules

- Prefer subtle, responsive micro-interactions over decorative motion.
- Buttons may use small shadow, translate, and press-state changes, but readability and accessibility take priority.
- The home hero must not overlap the shop name, header, or navigation at supported viewport sizes.
- Use a stable hero aspect ratio and responsive typography with `clamp()`.
- On small screens, place hero text in a separate readable region rather than relying on fragile absolute positioning.
- The hero carousel must include manual controls and a pause control. Disable autoplay for reduced-motion users.

## Work process

For substantial work:

1. Read the required documents.
2. Inspect the current repository and identify gaps against the specification.
3. Present a short implementation plan.
4. Make changes in small, verifiable groups.
5. Create or update Prisma migrations when the schema changes.
6. Run relevant checks.
7. Report changed files, migrations, commands run, results, and any remaining limitations.

Do not stop after only describing code when the user asked for implementation. Modify the repository and verify it.

## Verification commands

Run the relevant commands and fix failures:

```bash
docker compose up -d
npm install
npm run db:generate
npm run db:migrate -- --name <migration-name>
npm run db:seed
npm run typecheck
npm run build
```

If a command cannot run because of environment limitations, state the exact reason and provide the command the user should run locally.
