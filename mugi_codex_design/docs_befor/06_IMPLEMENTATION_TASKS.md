# 06_IMPLEMENTATION_TASKS.md

## Implementation policy

Implement the project in small, verifiable steps.

Do not skip environment setup, DB setup, or validation.

## Phase 1: Project setup

- Create Nuxt 3 project.
- Install dependencies.
- Add SCSS support.
- Add Zod.
- Add Prisma.
- Add Docker Compose.
- Add `.env` and `.env.example`.
- Add package scripts.

Verification:

```bash
npm run dev
```

## Phase 2: Database setup

- Create Prisma schema.
- Create Prisma Client utility.
- Create seed file.
- Start PostgreSQL with Docker Compose.
- Run migration.
- Run seed.

Verification:

```bash
docker compose up -d
npm run db:migrate -- --name init
npm run db:seed
npm run db:studio
```

## Phase 3: API implementation

Implement:

- `GET /api/menu`
- `GET /api/menu/recommended`
- `POST /api/reservations`
- `POST /api/contacts`

Add:

- Zod schemas
- Field-level validation errors
- Consistent API response format
- Basic error handling

Verification:

- Confirm menu endpoint returns seed data.
- Confirm reservation endpoint saves a reservation and reservation item.
- Confirm contact endpoint saves inquiry.
- Confirm invalid input returns 400.

## Phase 4: Shared constants and types

Create:

- `constants/storeInfo.ts`
- `constants/snsLinks.ts`
- `constants/pickupTimes.ts`
- `types/menu.ts`
- `types/reservation.ts`
- `types/contact.ts`
- `types/api.ts`

## Phase 5: Layout implementation

Create:

- `AppHeader.vue`
- `AppFooter.vue`
- `MobileMenu.vue`

Requirements:

- PC header: horizontal navigation.
- Mobile header: hamburger menu.
- Footer: store info and SNS links.
- SNS external links are safe.

## Phase 6: Common components

Create:

- `BaseButton.vue`
- `SectionTitle.vue`
- `PageHero.vue`
- `SnsLinks.vue`
- `FadeInSection.vue`

## Phase 7: Top page

Create:

- `HeroSection.vue`
- `ConceptSection.vue`
- `RecommendedMenuSection.vue`
- `StoreInfoSection.vue`
- `CtaSection.vue`
- `pages/index.vue`

Requirements:

- Warm bakery hero.
- Recommended menu from `/api/menu/recommended`.
- Store info visible.
- CTA links to `/reserve` and `/menu`.

## Phase 8: About page

Create:

- `pages/about.vue`
- About concept section.
- Commitment section.
- Store information/access section.
- Map placeholder or iframe area.

## Phase 9: Menu page

Create:

- `MenuCategoryFilter.vue`
- `MenuList.vue`
- `MenuCard.vue`
- `pages/menu.vue`

Requirements:

- Fetch data from `/api/menu`.
- Category filtering works.
- Recommended/seasonal labels visible.
- Allergies visible.
- Responsive grid works.

## Phase 10: Reservation page

Create:

- `ReserveForm.vue`
- `ReserveConfirm.vue`
- `ReserveComplete.vue`
- `useReserveForm.ts`
- `pages/reserve.vue`

Requirements:

- Input step.
- Confirmation step.
- Completion step.
- Client-side validation.
- Server-side validation.
- Save data to DB.
- Show field-level errors.

## Phase 11: Contact page

Create:

- `ContactForm.vue`
- `ContactComplete.vue`
- `useContactForm.ts`
- `pages/contact.vue`

Requirements:

- Client-side validation.
- Server-side validation.
- Save data to DB.
- Show completion message.

## Phase 12: Styling and responsive design

Create:

- `assets/styles/_variables.scss`
- `assets/styles/_mixins.scss`
- `assets/styles/_base.scss`
- `assets/styles/main.scss`

Add global SCSS to `nuxt.config.ts`.

Requirements:

- PC, tablet, smartphone layouts.
- Menu card grid: 3/2/1 columns.
- Form width optimized for mobile.
- Warm bakery style.

## Phase 13: Animation and accessibility

Implement:

- Hero fade-in.
- Scroll fade-in.
- Card hover animation.
- Button hover animation.
- `prefers-reduced-motion` support.

Accessibility checks:

- Labels for all inputs.
- `aria-invalid` and `aria-describedby` for errors.
- Keyboard operation.
- Focus visible.
- Alt text for images.

## Phase 14: SEO

Set per-page SEO metadata using `useSeoMeta` or `useHead`.

Add OGP defaults where practical.

## Phase 15: README

Create README with:

- Project overview
- Technology stack
- Main features
- Setup steps
- Environment variables
- DB commands
- Development commands
- Design points
- Future improvements

## Phase 16: Final verification

Run:

```bash
npm run build
```

Also manually verify:

- All pages load.
- Header/footer navigation works.
- Menu data displays.
- Reservation saves to DB.
- Contact inquiry saves to DB.
- Validation errors are displayed.
- Responsive design works.
- No console errors.

## Suggested commit order

1. `chore: initialize nuxt project`
2. `chore: add docker compose and prisma setup`
3. `feat: add menu database and api`
4. `feat: add reservation api`
5. `feat: add contact api`
6. `feat: add shared layout and common components`
7. `feat: add top and about pages`
8. `feat: add menu page`
9. `feat: add reservation form`
10. `feat: add contact form`
11. `style: add responsive bakery design`
12. `docs: add readme and setup docs`
