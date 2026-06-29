# AGENTS.md

## Project

Boulangerie Mugi no Akari Webサイト制作

This repository is a portfolio web application for a fictional bakery. Build it as a full-stack Nuxt application.

## Must-read documents

Before editing code, read the following documents in order:

1. `docs/00_PROJECT_OVERVIEW.md`
2. `docs/01_ENVIRONMENT_SETUP.md`
3. `docs/02_SYSTEM_DESIGN.md`
4. `docs/03_DATABASE_DESIGN.md`
5. `docs/04_API_DESIGN.md`
6. `docs/05_FRONTEND_DESIGN.md`
7. `docs/06_IMPLEMENTATION_TASKS.md`
8. `docs/07_TEST_CHECKLIST.md`

## Fixed technology stack

Use the following stack. Do not replace it without an explicit user request.

- Framework: Nuxt 3
- UI: Vue 3
- Language: TypeScript
- Backend: Nuxt `server/api`
- Runtime: Node.js LTS
- Database: PostgreSQL
- ORM: Prisma
- Local DB: Docker Compose
- Validation: Zod
- Styling: SCSS
- Package manager: npm

## Important architectural rules

- Do not create a separate Express server.
- Do not create a separate backend repository.
- Implement backend APIs under Nuxt `server/api`.
- Access PostgreSQL only through Prisma.
- Keep Prisma Client initialization in a server-only utility.
- Do not expose `DATABASE_URL` to the client.
- Keep form validation schemas reusable between API implementation and frontend where practical.
- Store menu data, reservations, and contact inquiries in PostgreSQL.
- Keep store information and SNS links as local constants for the initial release.
- Do not implement admin screens, authentication, payment, actual email sending, or real-time inventory in the initial release.

## Development priorities

Prioritize implementation in this order:

1. Create Nuxt project and install dependencies.
2. Add Docker Compose and PostgreSQL environment.
3. Add Prisma schema, migration, seed data, and Prisma Client setup.
4. Implement API endpoints.
5. Implement pages and components.
6. Implement SCSS design and responsive layout.
7. Implement validation and completion states.
8. Add SEO metadata.
9. Add README and test checklist.
10. Run lint/build/test commands and fix issues.

## Coding rules

- Use Composition API and `<script setup lang="ts">`.
- Use TypeScript types for props, emits, API responses, and form state.
- Keep components small and responsibility-based.
- Prefer server-side API calls through `$fetch` or `useFetch`.
- Do not duplicate business logic in many files.
- Use semantic HTML where possible.
- Ensure forms have labels, accessible error messages, and keyboard operability.
- Support `prefers-reduced-motion` in animation CSS.
- External SNS links must include `target="_blank"` and `rel="noopener noreferrer"`.

## Commands to verify before finishing

Run the following commands when relevant and fix errors:

```bash
npm run dev
npm run db:migrate
npm run db:seed
npm run db:generate
npm run build
```

If a command cannot be executed due to local environment limitations, document the reason in the final report.
