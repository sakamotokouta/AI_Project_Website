# 05_FRONTEND_DESIGN.md

## Frontend stack

- Nuxt 3
- Vue 3
- TypeScript
- SCSS
- Zod or shared validation utilities for form validation

## Design concept

Theme: 「朝の食卓に、やさしい灯りを。」

Use a warm, handmade, calm bakery design.

## Pages

### `/` Top page

Purpose:

- Communicate brand atmosphere.
- Show concept, recommended menu, store info, and CTA.

Sections:

```txt
HeroSection
ConceptSection
RecommendedMenuSection
StoreInfoSection
CtaSection
```

Hero copy example:

```txt
朝の食卓に、やさしい灯りを。
国産小麦と天然酵母で焼き上げる、住宅街の小さなベーカリー。
```

### `/about` About page

Purpose:

- Explain store concept and commitment.
- Show location and access details.

Sections:

```txt
PageHero
AboutConceptSection
CommitmentSection
StoreInfoSection
MapSection
```

### `/menu` Menu page

Purpose:

- Display menu cards from DB.
- Allow category filtering.

Components:

```txt
PageHero
MenuCategoryFilter
MenuList
MenuCard
```

Layout:

- PC: 3 columns
- Tablet: 2 columns
- Smartphone: 1 column

### `/reserve` Reservation page

Purpose:

- Allow users to reserve bakery items for pickup.
- Save reservation to DB.

States:

```ts
type ReserveStep = 'input' | 'confirm' | 'complete'
```

Components:

```txt
PageHero
ReserveForm
ReserveConfirm
ReserveComplete
```

Input fields:

- Customer name
- Phone
- Email optional
- Pickup date
- Pickup time
- Menu item
- Quantity
- Note optional

### `/contact` Contact page

Purpose:

- Receive inquiries other than reservations.
- Save inquiry to DB.

States:

```ts
type ContactStep = 'input' | 'complete'
```

Input fields:

- Name
- Email
- Category
- Message

## Components

### Layout components

#### AppHeader.vue

Responsibilities:

- Logo
- Global navigation
- SNS links
- Mobile hamburger menu
- Active page style

Navigation:

- Home
- About
- Menu
- Reserve
- Contact

#### AppFooter.vue

Responsibilities:

- Store name
- Address
- Business hours
- Regular holiday
- Phone
- SNS links
- Copyright

### Common components

#### BaseButton.vue

Props:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface Props {
  label?: string
  to?: string
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  disabled?: boolean
}
```

#### SectionTitle.vue

Props:

```ts
interface Props {
  title: string
  subTitle?: string
}
```

#### PageHero.vue

Props:

```ts
interface Props {
  title: string
  lead?: string
}
```

#### SnsLinks.vue

Requirements:

- Render Instagram, X, LINE.
- Use `target="_blank"`.
- Use `rel="noopener noreferrer"`.
- Ensure tap target size is large enough on mobile.

### Menu components

#### MenuCategoryFilter.vue

Props:

```ts
interface Props {
  selectedCategory: MenuCategoryFilterValue
}
```

Emits:

```ts
emit('change', category)
```

#### MenuCard.vue

Display:

- Image
- Name
- Price
- Description
- Category label
- Recommended label
- Seasonal label
- Allergies

### Reservation components

#### ReserveForm.vue

Responsibilities:

- Display inputs.
- Manage input UI.
- Show validation errors.
- Move to confirmation when valid.

#### ReserveConfirm.vue

Responsibilities:

- Display confirmation details.
- Back button.
- Submit button.

#### ReserveComplete.vue

Responsibilities:

- Display completion message.
- Link to top and menu page.

### Contact components

#### ContactForm.vue

Responsibilities:

- Display contact form.
- Validate input.
- Submit to `/api/contacts`.

#### ContactComplete.vue

Responsibilities:

- Display completion message.

## Composables

### useMenu.ts

Responsibilities:

- Fetch menu from `/api/menu`.
- Manage selected category.
- Return filtered menu data.

### useReserveForm.ts

Responsibilities:

- Manage reservation form state.
- Manage validation errors.
- Manage step state.
- Submit to `/api/reservations`.

### useContactForm.ts

Responsibilities:

- Manage contact form state.
- Manage validation errors.
- Submit to `/api/contacts`.

## Constants

### constants/storeInfo.ts

Example:

```ts
export const storeInfo = {
  name: 'Boulangerie Mugi no Akari',
  address: '東京都〇〇区〇〇 1-2-3',
  businessHours: '7:00〜18:00',
  regularHoliday: '火曜日・第2水曜日',
  phone: '03-1234-5678',
  nearestStation: '〇〇駅から徒歩8分',
  parking: '近隣コインパーキングをご利用ください',
  mapEmbedUrl: ''
}
```

### constants/snsLinks.ts

Example:

```ts
export const snsLinks = [
  {
    type: 'instagram',
    label: 'Instagram',
    url: 'https://example.com/instagram'
  },
  {
    type: 'x',
    label: 'X',
    url: 'https://example.com/x'
  },
  {
    type: 'line',
    label: 'LINE',
    url: 'https://example.com/line'
  }
]
```

### constants/pickupTimes.ts

```ts
export const pickupTimes = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30'
] as const
```

## Styling

Use SCSS.

### assets/styles/_variables.scss

```scss
:root {
  --color-base: #fff8ec;
  --color-surface: #ffffff;
  --color-main: #d8a85f;
  --color-accent: #9b5c2e;
  --color-text: #3f2a1d;
  --color-muted: #7a6a5d;
  --color-border: #ead8bd;
  --shadow-card: 0 10px 24px rgba(63, 42, 29, 0.08);
  --radius-card: 18px;
  --radius-button: 999px;
}
```

### Breakpoints

```scss
$breakpoint-sm: 600px;
$breakpoint-md: 900px;
$breakpoint-lg: 1200px;
```

## Animation

Implement subtle animation:

- Hero fade-in
- Scroll fade-in
- Menu card hover lift
- Button micro-interaction
- Decorative wheat/steam/handwritten lines

Must support:

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

## SEO metadata

Use per-page metadata.

| Page | title | description |
|---|---|---|
| `/` | Boulangerie Mugi no Akari｜住宅街の小さなベーカリー | 国産小麦と天然酵母で焼き上げる、住宅街の小さなパン屋です。 |
| `/about` | お店について｜Boulangerie Mugi no Akari | こだわり、店舗情報、アクセスをご紹介します。 |
| `/menu` | メニュー｜Boulangerie Mugi no Akari | 食パン、惣菜パン、菓子パン、季節限定メニューをご覧いただけます。 |
| `/reserve` | 取り置き予約｜Boulangerie Mugi no Akari | 人気商品の取り置き予約はこちらから。 |
| `/contact` | お問い合わせ｜Boulangerie Mugi no Akari | 商品、大量注文、イベント出店、アレルギーに関するお問い合わせはこちらから。 |
