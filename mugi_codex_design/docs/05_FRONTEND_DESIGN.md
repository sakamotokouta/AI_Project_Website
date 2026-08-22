# 05 Frontend design

## Design direction

Theme: **“A gentle light for the morning table.”**

Use warm cream, wheat, brown, and muted accent tones. The site should feel calm, handcrafted, and modern. Avoid excessive animation, low-contrast text, and decorative effects that make information harder to read.

## Public layout

### Header

- Text/logo for the shop name.
- Home, About, Menu, Reserve, Contact.
- SNS links where space permits.
- Mobile hamburger navigation.
- No admin link.
- Header height and hero spacing must be explicit; do not overlap the hero through fragile negative margins.

### Footer

- Shop information.
- SNS links.
- Public navigation.
- No admin link.

## Home page `/`

Sections:

```txt
HeroCarousel
ConceptSection
RecommendedMenuSection
StoreInfoSection
CtaSection
```

### Hero responsive layout

The existing overlap defect must be prevented structurally.

Desktop/tablet:

- The hero may overlay text on media only inside a defined safe content area.
- Use CSS Grid or a stable positioned container.
- Use a gradient or surface panel to preserve contrast.
- Use `clamp()` for shop-name and headline sizes.
- Avoid fixed pixel offsets tied to one viewport.

Small screens:

- Place shop-name/headline content in a separate region above or below the image.
- Do not rely on text floating over a cropped image.
- Keep horizontal padding at least 16 px.
- Prevent header, logo, carousel controls, and text from colliding.

Required viewport checks:

- 320
- 375
- 390
- 600
- 768
- 900
- 1024
- 1280
- 1440 pixels wide

### Hero carousel behavior

- Fetch from `/api/site/hero-slides`.
- Default interval: 5000 ms.
- Fade duration: approximately 500–800 ms.
- One active slide is visible to assistive technology.
- Controls: previous, next, dots, pause/play.
- Provide descriptive accessible labels in Japanese.
- Pause autoplay on pointer hover and `focus-within`.
- Pause while `document.hidden` is true.
- Do not autoplay if reduced motion is requested.
- When only one slide exists, hide controls and timers.
- Use a fixed `aspect-ratio` or min-height strategy to avoid layout shift.
- Use `object-fit: cover` and the configured `objectPosition`.
- First visible image should load eagerly; subsequent images may load lazily.
- Use a static fallback slide if the API returns no active slides or fails.

## Other public pages

### `/about`

- Page hero.
- Concept and commitment.
- Shop information.
- Access/map area.

### `/menu`

- Page hero.
- Category filter.
- Responsive card grid: 3/2/1 columns.
- Card image, alt text, name, price, description, labels, and allergies.

### `/reserve`

Steps:

```ts
type ReserveStep = 'input' | 'confirm' | 'complete'
```

Fields:

- customer name;
- phone;
- optional email;
- pickup date;
- pickup time;
- product;
- quantity;
- optional note.

### `/contact`

Fields:

- name;
- email;
- category;
- message.

## Button component and micro-interactions

`BaseButton.vue` should support:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'

type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  label?: string
  to?: string
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
}
```

Interaction rules:

- Hover: subtle shadow increase and up to 1–2 px upward movement.
- Active/pressed: return toward the surface and optional small scale, no aggressive bounce.
- Focus-visible: clear high-contrast ring.
- Loading: preserve width, show progress state, set `aria-busy`.
- Disabled: no hover transform, clear disabled appearance, correct native semantics.
- Reduced motion: remove transforms and transition duration.
- Minimum mobile target size: approximately 44 × 44 px.

Apply consistent interaction feedback to admin table actions, carousel controls, and navigation controls, but do not animate every surface.

## SCSS tokens

```scss
:root {
  --color-base: #fff8ec;
  --color-surface: #ffffff;
  --color-main: #d8a85f;
  --color-main-strong: #b77a31;
  --color-accent: #9b5c2e;
  --color-text: #3f2a1d;
  --color-muted: #7a6a5d;
  --color-border: #ead8bd;
  --color-danger: #a33b32;
  --color-success: #4d7355;
  --shadow-card: 0 10px 24px rgba(63, 42, 29, 0.08);
  --shadow-button: 0 6px 14px rgba(63, 42, 29, 0.16);
  --radius-card: 18px;
  --radius-button: 999px;
  --focus-ring: 0 0 0 3px rgba(155, 92, 46, 0.28);
}
```

Breakpoints:

```scss
$breakpoint-sm: 600px;
$breakpoint-md: 900px;
$breakpoint-lg: 1200px;
```

## Reduced motion

At minimum:

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

The hero carousel JavaScript must also detect reduced motion and not start autoplay. CSS alone is not sufficient.

## Accessibility

- One `h1` per page.
- Logical heading order.
- Meaningful image alt text.
- Decorative images use empty alt.
- Labels for every input.
- Field errors use `aria-invalid` and `aria-describedby`.
- Keyboard-accessible menu, carousel, tables, forms, dialogs, and pagination.
- Visible focus.
- Do not communicate status through color alone.
- Modal focus must be managed when modals are used.
- Status changes should announce success or failure without intrusive animation.

## SEO

Public pages use page-specific title and description.

Admin pages:

```ts
useSeoMeta({
  robots: 'noindex, nofollow'
})
```

Do not include admin routes in public sitemap output.
