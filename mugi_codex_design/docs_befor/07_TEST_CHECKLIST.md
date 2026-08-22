# 07_TEST_CHECKLIST.md

## Environment checks

- [ ] `docker compose up -d` starts PostgreSQL.
- [ ] `.env` contains valid `DATABASE_URL`.
- [ ] `npm run db:migrate -- --name init` succeeds.
- [ ] `npm run db:seed` succeeds.
- [ ] `npm run dev` starts Nuxt.
- [ ] `npm run build` succeeds.

## API checks

### GET /api/menu

- [ ] Returns all active menu items.
- [ ] `category=SHOKUPAN` filters shokupan items.
- [ ] `category=SOZAI` filters sozai items.
- [ ] `category=KASHI` filters kashi items.
- [ ] `category=SEASONAL` filters seasonal items.
- [ ] Invalid category returns a useful error or defaults safely.

### GET /api/menu/recommended

- [ ] Returns recommended items only.
- [ ] Returns limited number of items.

### POST /api/reservations

Valid case:

- [ ] Saves reservation.
- [ ] Saves reservation item.
- [ ] Returns reservation id.

Validation cases:

- [ ] Empty customer name returns error.
- [ ] Empty phone returns error.
- [ ] Invalid email returns error.
- [ ] Past pickup date returns error.
- [ ] Invalid pickup time returns error.
- [ ] Empty items returns error.
- [ ] Quantity less than 1 returns error.
- [ ] Nonexistent menu item returns error.

### POST /api/contacts

Valid case:

- [ ] Saves contact inquiry.
- [ ] Returns inquiry id.

Validation cases:

- [ ] Empty name returns error.
- [ ] Empty email returns error.
- [ ] Invalid email returns error.
- [ ] Empty category returns error.
- [ ] Empty message returns error.

## Page checks

### Top page `/`

- [ ] Hero is visible.
- [ ] Concept section is visible.
- [ ] Recommended menu is visible.
- [ ] Store information is visible.
- [ ] CTA buttons navigate correctly.

### About page `/about`

- [ ] Store concept is visible.
- [ ] Commitment content is visible.
- [ ] Store info is visible.
- [ ] Map area is visible.
- [ ] Phone link is tappable.

### Menu page `/menu`

- [ ] Menu cards are visible.
- [ ] Category filter works.
- [ ] Recommended label is visible when applicable.
- [ ] Seasonal label is visible when applicable.
- [ ] Allergies are visible.
- [ ] Images have alt text.

### Reservation page `/reserve`

- [ ] Input form is visible.
- [ ] Required errors appear near fields.
- [ ] Valid input moves to confirmation screen.
- [ ] Back button returns to input screen.
- [ ] Submit saves data.
- [ ] Completion message is displayed.

### Contact page `/contact`

- [ ] Input form is visible.
- [ ] Required errors appear near fields.
- [ ] Valid input saves data.
- [ ] Completion message is displayed.

## Responsive checks

### PC

- [ ] Header navigation is horizontal.
- [ ] Menu grid is 3 columns.
- [ ] Main content has readable max width.

### Tablet

- [ ] Menu grid is 2 columns.
- [ ] Layout does not overflow.

### Smartphone

- [ ] Header uses hamburger menu.
- [ ] Menu grid is 1 column.
- [ ] Forms are full width.
- [ ] Tap targets are large enough.
- [ ] No horizontal scroll.

## Accessibility checks

- [ ] Each page has one h1.
- [ ] Heading order is logical.
- [ ] Inputs have labels.
- [ ] Errors use `aria-invalid` and `aria-describedby` where practical.
- [ ] Links and buttons are keyboard focusable.
- [ ] Focus style is visible.
- [ ] Images have meaningful alt text or empty alt for decorative images.
- [ ] Color contrast is readable.
- [ ] UI does not rely only on color.
- [ ] `prefers-reduced-motion` is respected.

## SEO checks

- [ ] Each page has title.
- [ ] Each page has description.
- [ ] Store name appears as text.
- [ ] Address appears as text.
- [ ] Business hours appear as text.
- [ ] OGP metadata is configured where practical.

## Security checks

- [ ] Server-side validation exists.
- [ ] User input is not rendered as raw HTML.
- [ ] SNS external links use `rel="noopener noreferrer"`.
- [ ] `DATABASE_URL` is not exposed to client code.
- [ ] Unexpected API errors do not expose stack traces.
