# 02 System design

## Architecture

Build one full-stack Nuxt 3 application.

```txt
Public browser / Admin browser
        ↓
Nuxt pages, layouts, middleware, components, composables
        ↓ $fetch / useFetch
Nuxt server/api
        ↓
Validation + authentication/authorization + service utilities
        ↓ Prisma Client
PostgreSQL

Admin image upload
        ↓ multipart API + validation
Storage adapter
        ↓
public/uploads for the local/portfolio release
```

Do not create a separate Express server.

## Responsibility boundaries

### Public frontend

- Render public pages.
- Fetch public menu and hero-slide data.
- Handle client-side form validation for user experience.
- Submit reservations and inquiries.
- Render the responsive, accessible hero carousel.

### Admin frontend

- Render the login page and protected admin pages.
- Never determine authorization by client state alone.
- Use route middleware to redirect unauthenticated navigation.
- Call protected admin APIs.
- Manage menu items, reservations, contacts, images, and hero slides.

### Backend

- Validate all payloads with Zod.
- Authenticate admin requests server-side.
- Authorize every protected admin endpoint.
- Read and write PostgreSQL through Prisma.
- Store only session-token hashes.
- Handle multipart uploads safely.
- Return consistent JSON responses without stack traces.

### Database

Store:

- menu items;
- reservations and reservation items;
- contact inquiries;
- admin users;
- admin sessions;
- media metadata;
- hero-slide configuration.

### Local storage adapter

- Save uploaded image bytes under `public/uploads`.
- Generate safe filenames.
- Expose a narrow interface such as `save`, `delete`, and `exists`.
- Keep storage-specific logic out of route handlers so object storage can replace it later.

## Suggested directory structure

```txt
boulangerie-mugi-no-akari/
├─ app.vue
├─ nuxt.config.ts
├─ package.json
├─ docker-compose.yml
├─ .env
├─ .env.example
├─ .gitignore
├─ README.md
├─ AGENTS.md
├─ CODEX_INITIAL_PROMPT.md
├─ CODEX_EXECUTION_PROMPTS.md
│
├─ assets/
│  └─ styles/
│     ├─ _variables.scss
│     ├─ _mixins.scss
│     ├─ _base.scss
│     ├─ _animations.scss
│     ├─ _admin.scss
│     └─ main.scss
│
├─ public/
│  ├─ images/
│  │  ├─ hero/
│  │  ├─ menu/
│  │  ├─ about/
│  │  └─ common/
│  └─ uploads/
│     ├─ hero/
│     ├─ menu/
│     ├─ about/
│     └─ common/
│
├─ components/
│  ├─ layout/
│  │  ├─ AppHeader.vue
│  │  ├─ AppFooter.vue
│  │  └─ MobileMenu.vue
│  ├─ common/
│  │  ├─ BaseButton.vue
│  │  ├─ BaseAlert.vue
│  │  ├─ BaseModal.vue
│  │  ├─ SectionTitle.vue
│  │  ├─ PageHero.vue
│  │  ├─ SnsLinks.vue
│  │  └─ FadeInSection.vue
│  ├─ top/
│  │  ├─ HeroCarousel.vue
│  │  ├─ HeroSlide.vue
│  │  ├─ ConceptSection.vue
│  │  ├─ RecommendedMenuSection.vue
│  │  ├─ StoreInfoSection.vue
│  │  └─ CtaSection.vue
│  ├─ menu/
│  ├─ reserve/
│  ├─ contact/
│  └─ admin/
│     ├─ AdminSidebar.vue
│     ├─ AdminHeader.vue
│     ├─ AdminDataTable.vue
│     ├─ AdminPagination.vue
│     ├─ AdminStatusBadge.vue
│     ├─ AdminMenuForm.vue
│     ├─ AdminMediaPicker.vue
│     ├─ AdminMediaUpload.vue
│     └─ AdminHeroSlideForm.vue
│
├─ composables/
│  ├─ useMenu.ts
│  ├─ useHeroSlides.ts
│  ├─ useReserveForm.ts
│  ├─ useContactForm.ts
│  ├─ useAdminSession.ts
│  ├─ useAdminApi.ts
│  └─ useScrollAnimation.ts
│
├─ constants/
│  ├─ storeInfo.ts
│  ├─ snsLinks.ts
│  └─ pickupTimes.ts
│
├─ layouts/
│  ├─ default.vue
│  └─ admin.vue
│
├─ middleware/
│  └─ admin-auth.ts
│
├─ pages/
│  ├─ index.vue
│  ├─ about.vue
│  ├─ menu.vue
│  ├─ reserve.vue
│  ├─ contact.vue
│  └─ admin/
│     ├─ login.vue
│     ├─ index.vue
│     ├─ menu/
│     │  ├─ index.vue
│     │  ├─ new.vue
│     │  └─ [id].vue
│     ├─ reservations/
│     │  ├─ index.vue
│     │  └─ [id].vue
│     ├─ contacts/
│     │  ├─ index.vue
│     │  └─ [id].vue
│     ├─ images.vue
│     └─ hero-slides.vue
│
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
│
├─ server/
│  ├─ api/
│  │  ├─ menu.get.ts
│  │  ├─ menu/recommended.get.ts
│  │  ├─ site/hero-slides.get.ts
│  │  ├─ reservations.post.ts
│  │  ├─ contacts.post.ts
│  │  └─ admin/
│  │     ├─ auth/login.post.ts
│  │     ├─ auth/logout.post.ts
│  │     ├─ auth/session.get.ts
│  │     ├─ menu/index.get.ts
│  │     ├─ menu/index.post.ts
│  │     ├─ menu/[id].get.ts
│  │     ├─ menu/[id].patch.ts
│  │     ├─ reservations/index.get.ts
│  │     ├─ reservations/[id].get.ts
│  │     ├─ reservations/[id].patch.ts
│  │     ├─ contacts/index.get.ts
│  │     ├─ contacts/[id].get.ts
│  │     ├─ contacts/[id].patch.ts
│  │     ├─ media/index.get.ts
│  │     ├─ media/index.post.ts
│  │     ├─ media/[id].patch.ts
│  │     ├─ media/[id].delete.ts
│  │     ├─ hero-slides/index.get.ts
│  │     ├─ hero-slides/index.post.ts
│  │     ├─ hero-slides/[id].patch.ts
│  │     └─ hero-slides/[id].delete.ts
│  ├─ services/
│  │  ├─ admin-session.ts
│  │  ├─ media-storage.ts
│  │  └─ media-usage.ts
│  ├─ utils/
│  │  ├─ prisma.ts
│  │  ├─ auth.ts
│  │  ├─ api-response.ts
│  │  └─ pagination.ts
│  └─ validation/
│     ├─ auth.ts
│     ├─ menu.ts
│     ├─ reservation.ts
│     ├─ contact.ts
│     ├─ media.ts
│     └─ hero-slide.ts
│
├─ types/
│  ├─ api.ts
│  ├─ menu.ts
│  ├─ reservation.ts
│  ├─ contact.ts
│  ├─ admin.ts
│  ├─ media.ts
│  └─ hero-slide.ts
│
└─ utils/
   ├─ date.ts
   ├─ formatPrice.ts
   └─ validation.ts
```

Equivalent organization is acceptable if responsibilities and security boundaries remain clear.

## Public data flows

### Menu

```txt
/menu
  ↓ GET /api/menu
server/api/menu.get.ts
  ↓ Prisma
MenuItem + MediaAsset
  ↓ flattened public DTO
Menu cards
```

### Hero slides

```txt
/
  ↓ GET /api/site/hero-slides
HeroSlide + MediaAsset
  ↓ active slides ordered by sortOrder
HeroCarousel
```

### Reservation

```txt
ReserveForm
  ↓ client validation
ReserveConfirm
  ↓ POST /api/reservations
server Zod validation
  ↓ transaction
Reservation + ReservationItem
```

## Admin authentication flow

```txt
/admin/login
  ↓ POST /api/admin/auth/login
validate email/password
  ↓ compare bcrypt hash
create random token
  ↓ store SHA-256 token hash in AdminSession
set opaque token in HttpOnly cookie
  ↓
redirect /admin
```

For every protected request:

```txt
cookie token
  ↓ hash token
AdminSession lookup + expiry + active user check
  ↓
allow or return 401/403
```

Logout deletes the server-side session and clears the cookie.

## Admin route protection

- Apply named middleware to all admin pages except login.
- During SSR, forward the request cookie when checking the session.
- Client middleware improves navigation UX, but the server API guard is the security boundary.
- Do not render protected data before authorization succeeds.

## API response format

Success:

```ts
export interface ApiSuccess<T> {
  ok: true
  data: T
}
```

Error:

```ts
export interface ApiError {
  ok: false
  message: string
  issues?: Record<string, string[]>
}
```

Paginated success:

```ts
export interface PaginatedData<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
```

## Error policy

- `400`: validation or invalid state transition.
- `401`: missing or invalid admin session.
- `403`: authenticated but not permitted or inactive user.
- `404`: entity not found.
- `409`: uniqueness conflict or attempted deletion of a referenced asset.
- `413`: upload too large.
- `415`: unsupported media type.
- `500`: generic unexpected error.

Never return stack traces, password hashes, session hashes, or filesystem paths to clients.

## SEO and indexing

- Public pages use page-specific metadata.
- Admin pages use `robots: noindex, nofollow`.
- Do not include admin routes in sitemap generation.
- Avoid relying on robots rules as an access-control mechanism.
