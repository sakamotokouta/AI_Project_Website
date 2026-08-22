# Codex execution prompts

Use the prompt that matches the current task. Keep `AGENTS.md` and `docs/` in the repository root before running these prompts.

---

## A. Apply the complete specification to an existing repository

Read `AGENTS.md` and all files under `docs/` in the required order. Inspect the existing implementation before editing.

Compare the repository against the specification and implement every missing or conflicting requirement, with priority on:

- protected admin authentication and route/API guards;
- menu administration;
- reservation and contact administration;
- image upload and media management;
- hero-slide management;
- the responsive home-hero overlap fix;
- the accessible 5-second hero carousel;
- subtle button micro-interactions.

Preserve working public functionality and existing visual identity where it does not conflict with the specification. Do not rebuild unrelated parts.

Create the necessary Prisma migration and seed changes. Run the relevant database commands, `npm run typecheck`, and `npm run build`. Fix failures. Finish with a concise report of changed files, migration name, commands, results, and limitations.

---

## B. Implement only admin authentication and route protection

Read `AGENTS.md`, `docs/02_SYSTEM_DESIGN.md`, `docs/03_DATABASE_DESIGN.md`, `docs/04_API_DESIGN.md`, and `docs/06_ADMIN_AND_MEDIA_DESIGN.md`.

Implement only the admin authentication foundation:

- `AdminUser` and `AdminSession` Prisma models;
- environment-based admin seeding with a `bcryptjs` password hash;
- login, logout, and session endpoints;
- opaque random session token in an `HttpOnly` cookie;
- token hash stored in PostgreSQL;
- reusable `requireAdmin` server utility;
- protected `/admin/**` route middleware except `/admin/login`;
- admin layout shell and login page;
- `noindex, nofollow` metadata;
- no public admin links.

Do not implement the remaining admin CRUD screens in this task. Add focused validation and tests/manual verification. Create and apply the migration, run typecheck/build, and report results.

---

## C. Implement menu, reservation, and contact administration

Read the full specification and inspect the existing auth implementation first.

Implement protected admin pages and APIs for:

- menu list, creation, editing, activation/deactivation, ordering, recommendation and seasonal flags, allergies, price, description, category, and image assignment;
- reservation list, filters, details, reservation items, and status changes;
- contact inquiry list, filters, details, and status changes.

Every endpoint must call the shared admin authorization guard and validate input with Zod. Use pagination for list endpoints. Do not expose private fields or stack traces. Preserve public APIs.

Run typecheck/build and relevant API checks, then report changed files and results.

---

## D. Implement media library and hero-slide management

Read the full specification, especially `docs/03_DATABASE_DESIGN.md`, `docs/04_API_DESIGN.md`, and `docs/06_ADMIN_AND_MEDIA_DESIGN.md`.

Implement:

- `MediaAsset` and `HeroSlide` data models and migration;
- protected media list/upload/update/delete APIs;
- JPEG/PNG/WebP-only uploads;
- maximum 5 MiB;
- MIME and file-signature validation with `file-type`;
- generated safe filenames under the configured upload directory;
- path-traversal protection;
- delete prevention while an asset is referenced;
- static seed assets that cannot be physically deleted;
- admin media-library UI;
- admin hero-slide create/edit/reorder/activate UI;
- public `GET /api/site/hero-slides` endpoint.

Keep the storage implementation isolated so object storage can replace local filesystem storage later. Run migration, seed, typecheck, and build. Report results and the local-storage production limitation.

---

## E. Fix the home hero overlap and add the carousel

Read `AGENTS.md`, `docs/05_FRONTEND_DESIGN.md`, `docs/06_ADMIN_AND_MEDIA_DESIGN.md`, and `docs/08_TEST_CHECKLIST.md`. Inspect the current hero and header implementation.

Fix the home page without redesigning unrelated sections:

- ensure the shop name, header/navigation, and hero media never collide at 320, 375, 390, 600, 768, 900, 1024, 1280, and 1440 pixel widths;
- remove fragile negative margins or fixed coordinates that cause overlap;
- use responsive typography with `clamp()`;
- use a stable media aspect ratio and `object-fit: cover`;
- place hero text in a separate readable region on small screens;
- render active slides from `GET /api/site/hero-slides`;
- switch slides every 5 seconds with a subtle fade;
- add previous, next, dots, and pause/play controls;
- pause on hover, focus-within, and hidden document state;
- disable autoplay and significant transitions for `prefers-reduced-motion`;
- avoid layout shift and provide meaningful alt text.

Run typecheck/build and report the viewport checks performed.

---

## F. Final audit and repair

Read all project instructions and inspect the complete repository. Do not add new features unless required to satisfy the specification.

Audit and repair:

- public-page regressions;
- admin authorization gaps;
- direct unauthenticated admin API access;
- validation and error handling;
- upload security;
- database relations and deletion safety;
- responsive hero overlap;
- carousel accessibility and reduced motion;
- keyboard operation and focus visibility;
- SEO and admin `noindex`;
- TypeScript errors, console errors, and build errors.

Run the full relevant checklist in `docs/08_TEST_CHECKLIST.md`, `npm run typecheck`, and `npm run build`. Report passed checks, failed checks, fixes, and any unverified items with reasons.
