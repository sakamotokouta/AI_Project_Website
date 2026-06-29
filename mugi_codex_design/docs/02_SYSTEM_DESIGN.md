# 02_SYSTEM_DESIGN.md

## Architecture overview

Build this project as a full-stack Nuxt 3 application.

```txt
Browser
  ↓
Nuxt 3 pages/components
  ↓ $fetch / useFetch
Nuxt server/api
  ↓ Prisma Client
PostgreSQL
```

## Important rule

Do not create a separate Express backend. Backend APIs must be implemented in Nuxt `server/api`.

## Application responsibilities

### Frontend

- Render pages.
- Display menu, store information, SNS links, and forms.
- Provide responsive UI.
- Perform client-side validation for better UX.
- Call Nuxt API endpoints.
- Display confirmation and completion states.

### Backend

- Implement API handlers under `server/api`.
- Validate request bodies using Zod.
- Read/write PostgreSQL through Prisma.
- Return consistent JSON responses.
- Prevent invalid reservation/contact data from being saved.

### Database

- Store menu items.
- Store reservations.
- Store reservation items.
- Store contact inquiries.

## Directory structure

Use the following structure.

```txt
boulangerie-mugi-no-akari/
├─ app.vue
├─ nuxt.config.ts
├─ package.json
├─ docker-compose.yml
├─ .env
├─ .env.example
├─ README.md
├─ AGENTS.md
│
├─ assets/
│  ├─ images/
│  │  ├─ hero/
│  │  ├─ menu/
│  │  └─ common/
│  └─ styles/
│     ├─ _variables.scss
│     ├─ _mixins.scss
│     ├─ _base.scss
│     └─ main.scss
│
├─ components/
│  ├─ layout/
│  │  ├─ AppHeader.vue
│  │  ├─ AppFooter.vue
│  │  └─ MobileMenu.vue
│  ├─ common/
│  │  ├─ BaseButton.vue
│  │  ├─ SectionTitle.vue
│  │  ├─ PageHero.vue
│  │  ├─ SnsLinks.vue
│  │  └─ FadeInSection.vue
│  ├─ top/
│  │  ├─ HeroSection.vue
│  │  ├─ ConceptSection.vue
│  │  ├─ RecommendedMenuSection.vue
│  │  ├─ StoreInfoSection.vue
│  │  └─ CtaSection.vue
│  ├─ menu/
│  │  ├─ MenuCard.vue
│  │  ├─ MenuCategoryFilter.vue
│  │  └─ MenuList.vue
│  ├─ reserve/
│  │  ├─ ReserveForm.vue
│  │  ├─ ReserveConfirm.vue
│  │  └─ ReserveComplete.vue
│  └─ contact/
│     ├─ ContactForm.vue
│     └─ ContactComplete.vue
│
├─ composables/
│  ├─ useMenu.ts
│  ├─ useReserveForm.ts
│  ├─ useContactForm.ts
│  └─ useScrollAnimation.ts
│
├─ constants/
│  ├─ storeInfo.ts
│  ├─ snsLinks.ts
│  └─ pickupTimes.ts
│
├─ pages/
│  ├─ index.vue
│  ├─ about.vue
│  ├─ menu.vue
│  ├─ reserve.vue
│  └─ contact.vue
│
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
│
├─ server/
│  ├─ api/
│  │  ├─ menu.get.ts
│  │  ├─ menu/
│  │  │  └─ recommended.get.ts
│  │  ├─ reservations.post.ts
│  │  └─ contacts.post.ts
│  ├─ utils/
│  │  └─ prisma.ts
│  └─ validation/
│     ├─ reservation.ts
│     └─ contact.ts
│
├─ types/
│  ├─ menu.ts
│  ├─ reservation.ts
│  ├─ contact.ts
│  └─ api.ts
│
└─ utils/
   ├─ date.ts
   ├─ formatPrice.ts
   └─ validation.ts
```

## Page structure

```txt
/
├─ Top page
├─ /about
│  └─ Store concept, commitment, store information, access
├─ /menu
│  └─ Menu list and category filter
├─ /reserve
│  └─ Reservation form, confirmation, completion
└─ /contact
   └─ Contact form and completion
```

## Data flow examples

### Menu page

```txt
/menu page
  ↓ useFetch('/api/menu')
server/api/menu.get.ts
  ↓ prisma.menuItem.findMany()
PostgreSQL
  ↓
MenuList + MenuCard
```

### Reservation page

```txt
ReserveForm
  ↓ client-side validation
ReserveConfirm
  ↓ POST /api/reservations
server/api/reservations.post.ts
  ↓ Zod validation
  ↓ prisma.reservation.create()
PostgreSQL
  ↓
ReserveComplete
```

### Contact page

```txt
ContactForm
  ↓ client-side validation
POST /api/contacts
  ↓ Zod validation
  ↓ prisma.contactInquiry.create()
PostgreSQL
  ↓
ContactComplete
```

## Store information policy

For initial release, store information can be managed as constants in `constants/storeInfo.ts`.

Example items:

- Store name
- Address
- Business hours
- Regular holiday
- Phone number
- Nearest station
- Parking
- Map embed URL

## SNS links policy

For initial release, SNS links can be managed as constants in `constants/snsLinks.ts`.

External links must use:

```html
rel="noopener noreferrer"
target="_blank"
```

## SEO policy

Use `useSeoMeta` or `useHead` per page.

Set at least:

- title
- description
- og:title
- og:description
- og:type
- og:image

## Accessibility policy

- Use semantic HTML.
- Use one `h1` per page.
- Add `alt` to meaningful images.
- Use `label` for every form field.
- Use `aria-invalid` and `aria-describedby` for form errors.
- Ensure keyboard operation.
- Do not rely on color alone.
