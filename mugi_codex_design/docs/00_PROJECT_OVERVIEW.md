# 00 Project overview

## Project name

**Boulangerie Mugi no Akari**  
Japanese reading: ブーランジェリー 麦の灯り

## Product type

A portfolio-grade full-stack website for a fictional neighborhood bakery.

## Product goal

Communicate the bakery's atmosphere and product quality, help customers visit the shop, accept product reservations and inquiries, and give shop staff a secure, practical administration area.

## Brand concept

Theme: **“A gentle light for the morning table.”**

The bakery uses domestic wheat, natural yeast, and seasonal ingredients. The visual tone should feel warm, handmade, calm, and trustworthy rather than overly decorative.

## Public-user objectives

- Understand the shop concept, opening hours, holidays, address, access, and phone number.
- Browse bakery products with photos, prices, descriptions, categories, and allergy information.
- Reserve products for pickup and save the reservation in PostgreSQL.
- Submit inquiries and save them in PostgreSQL.
- Reach Instagram, X, and the official LINE account.
- Use the site comfortably on desktop, tablet, and smartphone.

## Staff objectives

Authenticated staff must be able to:

- View an admin dashboard.
- Add and edit menu items.
- Activate or deactivate menu items without destructive deletion.
- View reservation lists and details and update reservation status.
- View contact inquiry lists and details and update inquiry status.
- Upload and manage site images.
- Assign images to menu items.
- Create, reorder, activate, edit, and remove home hero slides.

## Admin discoverability and security

- Do not place an admin link in the public header, footer, sitemap, or ordinary public navigation.
- The login page is reached by entering `/admin/login` directly.
- The hidden URL is not considered protection. Authentication and server-side authorization are mandatory.
- Every admin page except the login page requires a valid admin session.
- Every admin API requires a valid admin session.

## Public pages

- `/` — home
- `/about` — bakery concept and access
- `/menu` — menu list and category filtering
- `/reserve` — reservation input, confirmation, submission, and completion
- `/contact` — inquiry input, submission, and completion

## Admin pages

- `/admin/login`
- `/admin`
- `/admin/menu`
- `/admin/menu/new`
- `/admin/menu/[id]`
- `/admin/reservations`
- `/admin/reservations/[id]`
- `/admin/contacts`
- `/admin/contacts/[id]`
- `/admin/images`
- `/admin/hero-slides`

## Home-page revision requirements

### Responsive hero fix

The shop name, public header/navigation, and hero image must not overlap at supported viewport sizes. Avoid fragile fixed coordinates and negative margins. Use responsive layout rules and a separate readable text region on small screens.

### Multi-image hero carousel

- Load active hero slides from the database through a public API.
- Change slides every 5 seconds by default.
- Use a subtle fade transition.
- Include previous, next, indicator dots, and pause/play controls.
- Pause while hovered, focused, or when the browser tab is hidden.
- When `prefers-reduced-motion: reduce` is active, disable autoplay and significant transitions.
- If only one active slide exists, do not start a timer and hide unnecessary controls.
- Keep the hero dimensions stable to prevent layout shift.

## Interaction-quality requirement

Buttons and interactive controls should feel responsive through restrained hover, focus, loading, and active states. Use small transform and shadow changes only when they do not reduce clarity, readability, performance, or accessibility.

## In-scope features

- Public pages and shared navigation
- PostgreSQL-backed menu, reservations, reservation items, and contacts
- Protected admin authentication
- Admin menu management
- Admin reservation and contact management
- Media library and local image upload for the local/portfolio release
- Hero-slide management and public carousel
- Responsive SCSS design
- Client and server validation
- Accessibility and reduced-motion support
- Basic public SEO
- Admin `noindex, nofollow`
- README and setup documentation

## Out of scope

- Payment
- Customer accounts
- Real-time inventory
- Actual email sending
- Staff push notifications
- Multi-language UI
- Production-grade anti-spam service
- Production object storage implementation
- Advanced audit logs and multi-role authorization

## Completion criteria

The release is complete when:

- All public and admin routes are implemented.
- Public functionality continues to work after the admin additions.
- Unauthenticated users cannot access protected admin pages or APIs.
- Menu data is displayed from PostgreSQL.
- Reservations and contacts validate and save successfully.
- Admin users can manage the required records and images.
- Active hero slides render on the home page and the carousel meets accessibility rules.
- The shop name and hero never overlap at the required viewport widths.
- Buttons have subtle, consistent interaction states.
- Type checking and production build succeed.
- The README documents environment setup, admin seeding, migrations, uploads, and limitations.
