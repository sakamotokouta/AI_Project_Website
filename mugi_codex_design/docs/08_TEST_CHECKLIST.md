# 08 Test checklist

## Environment and build

- [ ] `docker compose up -d` starts PostgreSQL.
- [ ] `.env` contains valid DB settings and non-placeholder admin credentials.
- [ ] `npm run db:generate` succeeds.
- [ ] Migration succeeds without unintended data loss.
- [ ] `npm run db:seed` succeeds and is idempotent.
- [ ] `npm run dev` starts Nuxt.
- [ ] `npm run typecheck` succeeds.
- [ ] `npm run build` succeeds.

## Public APIs

### Menu

- [ ] `GET /api/menu` returns active menu items.
- [ ] Category filtering works.
- [ ] Menu response includes flattened image URL and alt text.
- [ ] Recommended endpoint returns active recommended items only.

### Hero slides

- [ ] `GET /api/site/hero-slides` returns active slides only.
- [ ] Slides are sorted by `sortOrder`, then ID.
- [ ] Empty result returns a valid empty array.
- [ ] Inactive slides are not exposed publicly.

### Reservations

- [ ] Valid reservation saves reservation and items.
- [ ] Empty customer name fails.
- [ ] Empty phone fails.
- [ ] Invalid optional email fails.
- [ ] Past pickup date fails.
- [ ] Invalid pickup time fails.
- [ ] Empty items fail.
- [ ] Quantity below 1 fails.
- [ ] Nonexistent or inactive menu item fails.

### Contacts

- [ ] Valid inquiry saves.
- [ ] Empty name fails.
- [ ] Empty or invalid email fails.
- [ ] Invalid category fails.
- [ ] Empty message fails.

## Authentication and authorization

- [ ] Seed stores a password hash, never plaintext.
- [ ] Valid admin login succeeds.
- [ ] Invalid email and invalid password show the same generic error.
- [ ] Login cookie is `HttpOnly`.
- [ ] Cookie uses `SameSite=Strict`.
- [ ] Cookie uses `Secure` in production configuration.
- [ ] Database stores only session-token hash.
- [ ] Session expiry is enforced.
- [ ] Inactive admin user is rejected.
- [ ] Logout removes database session and cookie.
- [ ] `/admin/login` is directly reachable.
- [ ] Unauthenticated `/admin` redirects to login.
- [ ] Unauthenticated nested admin pages redirect to login.
- [ ] Every protected admin API returns `401` without a valid session.
- [ ] Public navigation and footer contain no admin link.
- [ ] Admin pages use `noindex, nofollow`.
- [ ] Admin routes are not in sitemap.

## Admin menu management

- [ ] Menu list is paginated.
- [ ] Search and filters work.
- [ ] Menu creation succeeds with valid data.
- [ ] Duplicate slug fails clearly.
- [ ] Invalid price/category/order fails.
- [ ] Existing item can be edited.
- [ ] Media assignment works.
- [ ] Activation/deactivation works.
- [ ] Public menu reflects active-state changes.
- [ ] Menu item referenced by reservations is not destructively deleted.

## Admin reservations

- [ ] List is paginated.
- [ ] Search, status, and date filters work.
- [ ] Detail includes items and quantities.
- [ ] Status update works.
- [ ] Invalid status fails.
- [ ] Customer data is not exposed on public APIs.

## Admin contacts

- [ ] List is paginated.
- [ ] Search, category, and status filters work.
- [ ] Detail displays message as plain text.
- [ ] Status update works.
- [ ] Invalid status fails.

## Media upload security

- [ ] Auth is checked before processing upload.
- [ ] JPEG upload succeeds.
- [ ] PNG upload succeeds.
- [ ] WebP upload succeeds.
- [ ] SVG upload fails.
- [ ] Unsupported extension/type fails.
- [ ] Declared MIME that does not match file signature fails.
- [ ] File above 5 MiB fails with appropriate status.
- [ ] Server generates filename.
- [ ] Original filename cannot cause path traversal.
- [ ] File is stored only inside configured upload directory.
- [ ] Database failure cleans up newly saved file.
- [ ] Alt text is validated.
- [ ] Referenced media cannot be deleted.
- [ ] Static media cannot be physically deleted.
- [ ] Unused uploaded media can be deleted.
- [ ] API does not return absolute local path.

## Hero-slide administration

- [ ] Slide can be created from an existing media asset.
- [ ] Slide can be edited.
- [ ] Active state works.
- [ ] Sort order works.
- [ ] Object-position value is validated.
- [ ] Slide deletion does not automatically delete media.
- [ ] Reordering is keyboard accessible without requiring drag-and-drop.

## Home hero responsive checks

Check widths: 320, 375, 390, 600, 768, 900, 1024, 1280, 1440 px.

At each width:

- [ ] Header does not cover shop name or hero heading.
- [ ] Shop name and image do not create unreadable overlap.
- [ ] Text does not overlap carousel controls.
- [ ] Controls remain within viewport.
- [ ] No horizontal scroll.
- [ ] Focus outlines are not clipped.
- [ ] Image crop is acceptable.
- [ ] Hero height remains stable while changing slides.

## Carousel behavior

- [ ] Multiple active slides render.
- [ ] Slide changes approximately every 5 seconds.
- [ ] Fade is subtle and does not flash.
- [ ] Previous and next work.
- [ ] Dots select slides.
- [ ] Pause/play works.
- [ ] Autoplay pauses on hover.
- [ ] Autoplay pauses on keyboard focus within carousel.
- [ ] Autoplay pauses when tab is hidden.
- [ ] Reduced-motion mode disables autoplay and significant transitions.
- [ ] One-slide mode has no timer or unnecessary controls.
- [ ] API error or empty result uses fallback content.
- [ ] Images have meaningful alt text.

## Button and interaction checks

- [ ] Hover feedback is subtle.
- [ ] Pressed feedback is visible.
- [ ] Focus-visible ring is clear.
- [ ] Loading state prevents duplicate submission.
- [ ] Disabled state is semantically and visually clear.
- [ ] Interaction effects do not move surrounding layout.
- [ ] Reduced-motion mode removes significant transforms/transitions.
- [ ] Mobile targets are large enough.

## General accessibility

- [ ] One `h1` per page.
- [ ] Heading order is logical.
- [ ] Inputs have labels.
- [ ] Errors use `aria-invalid` and `aria-describedby`.
- [ ] Navigation, carousel, tables/cards, forms, pagination, and dialogs are keyboard operable.
- [ ] Focus is visible.
- [ ] Images use meaningful or empty alt appropriately.
- [ ] Color contrast is readable.
- [ ] Status is not conveyed by color alone.
- [ ] Reduced motion is respected in CSS and JavaScript.

## Error handling and privacy

- [ ] Unexpected API errors do not expose stack traces.
- [ ] Logs do not contain credentials, cookies, tokens, password hashes, or full sensitive payloads.
- [ ] User text is never rendered as raw HTML.
- [ ] `DATABASE_URL` and admin credentials are not exposed to client bundles.
- [ ] Missing records return `404`.
- [ ] Conflicts such as referenced-media deletion return `409`.
