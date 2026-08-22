# 07 Implementation tasks

Implement in small, verifiable phases. When upgrading an existing repository, map these phases to the current implementation and avoid recreating completed work.

## Phase 1: Repository audit

- Read all specification files.
- Inspect existing code, package scripts, Prisma schema, migrations, and public UI.
- Identify conflicts with the old “no admin/auth” scope.
- Present a short implementation plan.

## Phase 2: Dependencies and environment

- Add `bcryptjs`, `file-type`, and missing TypeScript/typecheck dependencies.
- Update package scripts.
- Update Docker Compose to read DB credentials from environment variables.
- Add safe `.env.example` placeholders.
- Add upload-directory configuration and `.gitignore` rules.

Verification:

```bash
npm install
npm run typecheck
```

## Phase 3: Database migration and seed

- Add admin, session, media, and hero-slide models.
- Add menu-to-media relation.
- Safely migrate existing `imageUrl` data when present.
- Add idempotent static-media and hero-slide seed data.
- Seed or update the initial admin from environment credentials.

Verification:

```bash
docker compose up -d
npm run db:generate
npm run db:migrate -- --name add_admin_media_and_hero
npm run db:seed
```

Inspect migration SQL before applying it to non-disposable data.

## Phase 4: Authentication foundation

- Implement login validation.
- Hash and compare passwords with `bcryptjs`.
- Create random session token and store only SHA-256 hash.
- Set secure cookie attributes.
- Implement session lookup, expiry, logout, and cleanup.
- Implement `requireAdmin`.
- Add admin route middleware and safe session composable.
- Add login page and admin layout shell.

Verification:

- Valid login succeeds.
- Invalid credentials use generic error.
- Unauthenticated admin page redirects.
- Unauthenticated admin API returns `401`.
- Logout invalidates the session.

## Phase 5: Public API compatibility

- Update public menu APIs for media relations.
- Add public hero-slide API.
- Preserve reservation and contact APIs.
- Keep response shapes stable where practical.

Verification:

- Existing menu page still displays.
- Recommended menu still displays.
- Reservations and contacts still save.
- Empty hero-slide result does not break the home page.

## Phase 6: Admin menu management

- Implement protected menu list/detail/create/update APIs.
- Implement pagination and filters.
- Implement admin menu pages and form.
- Add media picker.
- Use active-state toggling rather than deletion.

## Phase 7: Reservation administration

- Implement protected paginated list and detail APIs.
- Implement status update API.
- Implement list/detail pages with filters and status controls.

## Phase 8: Contact administration

- Implement protected paginated list and detail APIs.
- Implement status update API.
- Implement list/detail pages with filters and status controls.

## Phase 9: Media storage and APIs

- Create isolated storage service.
- Create safe controlled category directories.
- Validate size, MIME, and signature.
- Generate UUID filenames.
- Handle cleanup on partial failure.
- Implement media list, upload, metadata update, usage checks, and safe delete.

Verification:

- JPEG, PNG, and WebP succeed.
- SVG, executable, mismatched signature, and oversized files fail.
- Path traversal attempts fail.
- Referenced and static assets cannot be deleted.

## Phase 10: Media and hero admin UI

- Implement media library page.
- Implement upload form and previews.
- Implement metadata edit and guarded delete.
- Implement hero-slide list/create/edit/delete/reorder UI.
- Provide keyboard-accessible ordering controls.

## Phase 11: Home hero repair

- Remove fragile overlapping layout rules.
- Add stable responsive hero structure.
- Use `clamp()` typography.
- Separate text and image on small screens.
- Verify all required widths.

## Phase 12: Accessible carousel

- Fetch public hero slides.
- Implement 5-second autoplay.
- Implement fade transition and stable dimensions.
- Add previous/next/dots/pause controls.
- Pause on hover, focus, hidden page.
- Disable autoplay for reduced motion.
- Add static fallback and single-slide handling.

## Phase 13: Button and UI interaction refinement

- Update `BaseButton` interaction states.
- Add loading, disabled, active, and focus-visible behavior.
- Apply restrained consistent states to admin controls.
- Verify no layout shift or unreadable effects.

## Phase 14: Accessibility, SEO, and security review

- Verify headings, labels, errors, focus, keyboard operation, alt text, and color contrast.
- Verify reduced motion in CSS and carousel logic.
- Add public SEO metadata.
- Add admin `noindex, nofollow`.
- Ensure admin routes are absent from public navigation and sitemap.
- Verify all admin API handlers call `requireAdmin`.
- Verify no sensitive logging or client exposure.

## Phase 15: README

Document:

- project purpose;
- stack;
- setup;
- environment variables;
- Docker and Prisma commands;
- admin seeding and login path;
- uploads and accepted file types;
- local-filesystem persistence limitation;
- verification commands;
- future object-storage migration.

Do not place real admin credentials in README.

## Phase 16: Final verification

Run:

```bash
npm run typecheck
npm run build
```

Also complete `docs/08_TEST_CHECKLIST.md` as far as the environment permits.

## Suggested commit order

1. `docs: update project specification for admin and hero media`
2. `chore: add auth and media dependencies`
3. `feat: add admin session and media database models`
4. `feat: add admin authentication`
5. `feat: add protected menu administration`
6. `feat: add reservation and contact administration`
7. `feat: add media upload and management`
8. `feat: add hero slide administration`
9. `fix: make home hero responsive without overlap`
10. `feat: add accessible home hero carousel`
11. `style: refine button interactions and admin ui`
12. `test: verify auth uploads responsive layout and build`
13. `docs: update setup and operations readme`
