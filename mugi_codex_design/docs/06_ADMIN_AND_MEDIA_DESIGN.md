# 06 Admin and media design

## Purpose

Define the protected staff interface, authentication behavior, image management, and hero-slide management.

## Admin navigation

The admin layout contains:

- Dashboard
- Menu
- Reservations
- Contact inquiries
- Images
- Hero slides
- Logout

The public site contains no admin link.

## Admin login `/admin/login`

Fields:

- Email
- Password

Requirements:

- Use a standard password field with show/hide control if implemented accessibly.
- Submit to `POST /api/admin/auth/login`.
- Use one generic invalid-credentials message.
- Do not reveal whether an email exists.
- Disable duplicate submission while loading.
- Redirect authenticated users to `/admin`.
- Include `noindex, nofollow`.

## Admin layout and route guard

- `/admin/login` uses a minimal login layout or the admin layout without protected navigation.
- All other admin pages use `layouts/admin.vue` and `middleware/admin-auth.ts`.
- Middleware calls the session endpoint and redirects to `/admin/login` when unauthorized.
- Server API authorization remains mandatory even when middleware exists.
- Include a clear logout action.
- On `401` from a protected API, clear client session state and redirect to login.

## Dashboard `/admin`

Show concise operational summaries:

- New contact inquiries count.
- Pending reservations count.
- Active menu items count.
- Active hero slides count.
- Links to each management section.

Do not expose sensitive customer data in summary cards.

## Menu administration

### List `/admin/menu`

- Search by name or slug.
- Filter by category and active state.
- Show image thumbnail, name, category, price, active state, recommended flag, seasonal flag, and display order.
- Use pagination.
- Provide “Add menu item” and edit actions.
- Use activation/deactivation instead of physical deletion.

### Create `/admin/menu/new`

### Edit `/admin/menu/[id]`

Fields:

- Name
- Slug
- Price
- Description
- Category
- Image asset
- Recommended
- Seasonal
- Allergies
- Active
- Display order

Use the media picker to select an existing asset. Provide a link to the image-management page, but preserve unsaved-form state where practical.

## Reservation administration

### List `/admin/reservations`

- Search by customer name, phone, or email.
- Filter by status and pickup date range.
- Show reservation ID, customer, pickup date/time, item summary, status, and creation time.
- Use pagination.

### Detail `/admin/reservations/[id]`

Show:

- Customer name
- Phone
- Email
- Pickup date/time
- Reserved items and quantities
- Note
- Current status
- Created and updated timestamps

Allow status update with confirmation for cancellation when practical.

## Contact administration

### List `/admin/contacts`

- Search by name, email, or message.
- Filter by category and status.
- Show name, email, category, status, created time, and a short message excerpt.
- Use pagination.

### Detail `/admin/contacts/[id]`

Show full inquiry content as plain text, never raw HTML. Allow status updates.

## Image management `/admin/images`

### Goals

- Upload site images.
- Review existing static and uploaded assets.
- Edit alt text and category.
- See where an image is used.
- Delete only unused uploaded assets.
- Assign media to menu items and hero slides from their respective forms.

### Upload form

Fields:

- File
- Category: hero, menu, about, common
- Alt text

Client checks improve UX, but server checks are authoritative.

Accepted files:

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

Maximum size: 5 MiB by default.

### Media card/list

Show:

- Thumbnail
- Original filename
- Category
- File type
- Human-readable file size
- Alt text
- Static/uploaded badge
- Menu usage count
- Hero usage count
- Edit metadata action
- Delete action when eligible

### Delete behavior

- Disable delete when referenced.
- Explain why deletion is blocked.
- Static assets cannot be physically deleted.
- Require confirmation before deleting an eligible uploaded asset.
- Deleting media does not happen implicitly when deleting a hero slide.

### Replacement behavior

Do not overwrite an existing file in place. Use this safe flow:

1. Upload a new asset.
2. Reassign menu items or hero slides.
3. Verify references.
4. Delete the old asset if unused and uploaded.

This gives a reversible workflow and avoids broken references during partial failures.

## Hero-slide administration `/admin/hero-slides`

Show all slides in display order.

For each slide:

- Preview image
- Title
- Description
- Object position
- Active state
- Sort order
- Edit
- Delete slide

Create/edit fields:

- Media asset
- Optional title
- Optional description
- Object-position preset or validated value
- Sort order
- Active

Recommended object-position presets:

- Center: `50% 50%`
- Left center: `25% 50%`
- Right center: `75% 50%`
- Center top: `50% 25%`
- Center bottom: `50% 75%`

Reordering may use explicit numeric order or accessible move-up/move-down controls. Drag-and-drop is optional and must not be the only method.

## Public carousel acceptance behavior

- Active slides only.
- Sorted by `sortOrder`, then ID.
- Default 5-second interval.
- Fade transition.
- Manual previous/next controls.
- Slide indicator buttons.
- Pause/play control.
- Pause on hover and focus-within.
- Pause when the document is hidden.
- No autoplay for reduced-motion users.
- No timer or unnecessary controls for one slide.
- Stable aspect ratio.
- Fallback slide on empty or failed API response.

## Responsive-overlap acceptance criteria

At 320, 375, 390, 600, 768, 900, 1024, 1280, and 1440 px widths:

- Header does not cover the hero heading or shop name.
- Shop name does not become unreadable against the image.
- Text does not overlap carousel controls.
- Carousel controls remain inside the viewport.
- No horizontal scroll.
- No clipped focus outlines.
- Image crop remains visually reasonable.

## Admin UI interaction quality

Use the same restrained design system as the public site, with higher information density.

- Clear hover and active states.
- Visible focus.
- Loading and success feedback.
- Confirmation for destructive actions.
- Tables become cards or horizontally safe layouts on small screens.
- Avoid large decorative animations in admin workflows.
- Button press feedback must not move surrounding layout.

## Empty, loading, and error states

Every admin page must handle:

- initial loading;
- empty result;
- validation error;
- unauthorized session;
- network/server error;
- successful mutation.

Do not leave blank screens.

## Local-storage limitation

The local storage adapter is suitable for local development and persistent traditional servers. Document that serverless or ephemeral deployments may lose uploaded files and require object storage such as S3-compatible storage or a media service.
