# 04 API design

## General rules

- Implement APIs under Nuxt `server/api`.
- Do not create Express.
- Validate request bodies, query parameters, and route parameters with Zod.
- Public APIs return public DTOs only.
- Every admin endpoint except login requires `requireAdmin(event)`.
- Do not return stack traces, password hashes, session hashes, local filesystem paths, or internal Prisma errors.

## Response types

```ts
export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiError {
  ok: false
  message: string
  issues?: Record<string, string[]>
}

export interface PaginatedData<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
```

## Public APIs

### `GET /api/menu`

Returns active menu items.

Query:

- `category`: `ALL`, `SHOKUPAN`, `SOZAI`, `KASHI`, or `SEASONAL`.

Behavior:

- Missing or `ALL` returns all active items.
- Sort by `displayOrder`, then `id`.
- Include flattened image URL and alt text from `MediaAsset`.

### `GET /api/menu/recommended`

Returns active recommended items, limited to 3 or 4, sorted by display order.

### `GET /api/site/hero-slides`

Returns active hero slides sorted by `sortOrder`, then `id`.

Example:

```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "imageUrl": "/images/hero/hero-bread-01.webp",
      "altText": "朝の店内に並ぶ焼きたてのパン",
      "title": "朝の食卓に、やさしい灯りを。",
      "description": "国産小麦と天然酵母で焼き上げます。",
      "objectPosition": "50% 50%"
    }
  ]
}
```

If no active slide exists, return an empty array. The frontend must provide a static fallback rather than failing.

### `POST /api/reservations`

Creates a reservation and its items in a transaction.

```ts
interface CreateReservationRequest {
  customerName: string
  phone: string
  email?: string
  pickupDate: string
  pickupTime: string
  items: Array<{
    menuItemId: number
    quantity: number
  }>
  note?: string
}
```

Rules:

- Validate required fields.
- Reject dates in the past.
- Validate allowed pickup times.
- Require at least one item.
- Require positive integer quantities.
- Verify every referenced menu item exists and is active.
- Do not trust client-provided prices or names.

### `POST /api/contacts`

Creates a contact inquiry.

```ts
interface CreateContactRequest {
  name: string
  email: string
  category: 'PRODUCT' | 'ALLERGY' | 'BULK_ORDER' | 'MEDIA_EVENT' | 'OTHER'
  message: string
}
```

## Admin authentication APIs

### `POST /api/admin/auth/login`

Request:

```ts
interface AdminLoginRequest {
  email: string
  password: string
}
```

Behavior:

1. Normalize email to lowercase.
2. Look up an active admin user.
3. Compare password with `bcryptjs`.
4. Use the same generic error for invalid email and invalid password.
5. Generate a cryptographically random token.
6. Store SHA-256 token hash in `AdminSession`.
7. Set raw token in an `HttpOnly` cookie.
8. Use `SameSite=Strict`; use `Secure` in production.
9. Return safe admin identity only.

Success:

```json
{
  "ok": true,
  "data": {
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "displayName": "Bakery Administrator"
    }
  }
}
```

Failure should not reveal whether the account exists.

### `GET /api/admin/auth/session`

Returns the current safe admin identity when authenticated. Returns `401` otherwise.

### `POST /api/admin/auth/logout`

Deletes the current server-side session when present and clears the cookie. Logout should be idempotent.

## Shared admin authorization helper

Create a utility such as:

```ts
export async function requireAdmin(event: H3Event): Promise<SafeAdminUser>
```

It must:

- read the cookie;
- hash the raw token;
- find an unexpired session with an active user;
- reject missing, invalid, expired, or inactive sessions;
- never trust client-supplied user IDs;
- optionally update `lastUsedAt` with throttling.

Every admin route handler must call this utility before reading or mutating protected data.

## Admin menu APIs

### `GET /api/admin/menu`

Query:

- `page`, default 1.
- `pageSize`, default 20, maximum 100.
- `search` for name or slug.
- `category`.
- `active`: `true`, `false`, or omitted.

Return paginated records including media assignment and reservation-reference count if useful.

### `POST /api/admin/menu`

Creates a menu item.

```ts
interface AdminCreateMenuRequest {
  name: string
  slug: string
  price: number
  description: string
  category: MenuCategory
  imageAssetId?: number | null
  isRecommended: boolean
  isSeasonal: boolean
  allergies: string[]
  isActive: boolean
  displayOrder: number
}
```

Validate slug format and uniqueness. Validate that `imageAssetId` exists when provided.

### `GET /api/admin/menu/:id`

Returns one menu item for editing.

### `PATCH /api/admin/menu/:id`

Updates allowed fields. Do not permit direct updates to system timestamps or relation internals.

Do not physically delete menu items in this release because reservations may reference them. Use `isActive`.

## Admin reservation APIs

### `GET /api/admin/reservations`

Query:

- `page`, `pageSize`.
- `status`.
- `dateFrom`, `dateTo`.
- `search` for customer name, phone, or email.

Return paginated summary rows.

### `GET /api/admin/reservations/:id`

Return reservation details and menu-item snapshots from the current related records. Include items and quantities.

### `PATCH /api/admin/reservations/:id`

Allow status changes only:

```ts
interface UpdateReservationStatusRequest {
  status: ReservationStatus
}
```

Reject invalid values. A simple status transition policy is acceptable, but do not silently convert values.

## Admin contact APIs

### `GET /api/admin/contacts`

Query:

- `page`, `pageSize`.
- `status`.
- `category`.
- `search` for name, email, or message.

### `GET /api/admin/contacts/:id`

Returns full inquiry details.

### `PATCH /api/admin/contacts/:id`

Allows status updates:

```ts
interface UpdateContactStatusRequest {
  status: ContactStatus
}
```

## Admin media APIs

### `GET /api/admin/media`

Query:

- `page`, `pageSize`.
- `category`.
- `search` for original name or alt text.

Return metadata plus usage counts:

```ts
interface AdminMediaAsset {
  id: number
  url: string
  originalName: string
  mimeType: string
  sizeBytes: number
  altText: string
  category: MediaCategory
  storageType: MediaStorageType
  menuUsageCount: number
  heroUsageCount: number
  createdAt: string
}
```

### `POST /api/admin/media`

Content type: `multipart/form-data`.

Fields:

- `file`: required.
- `category`: required.
- `altText`: required for meaningful images.

Upload rules:

- Authenticate before processing bytes.
- Enforce configured maximum, default 5 MiB.
- Accept JPEG, PNG, and WebP only.
- Validate file signature with `file-type` in addition to multipart metadata.
- Reject SVG and executable content.
- Generate UUID-based filename and extension from verified type.
- Map category to a controlled subdirectory.
- Never join storage paths using unchecked user input.
- Save file, then create database metadata.
- If database creation fails, remove the saved file.
- Return URL and safe metadata, not local absolute path.

Status:

- `413` for too large.
- `415` for unsupported or mismatched type.
- `400` for invalid metadata.

### `PATCH /api/admin/media/:id`

Allow updates to:

- `altText`.
- `category` metadata.

Do not accept arbitrary URL or filesystem-path replacement.

A new file replacement should be implemented as upload new asset, reassign references, then delete the old unused uploaded asset. This avoids partial replacement failures.

### `DELETE /api/admin/media/:id`

Rules:

- Reject deletion if referenced by any menu item or hero slide (`409`).
- Reject physical deletion of `STATIC` assets (`409` or `400`).
- Ensure resolved path is inside `UPLOAD_DIR`.
- Delete the file and database row consistently.
- If the file is already missing, remove the stale database row only after confirming the path boundary and log a safe warning.

## Admin hero-slide APIs

### `GET /api/admin/hero-slides`

Returns all slides, including inactive, ordered by `sortOrder` then `id`.

### `POST /api/admin/hero-slides`

```ts
interface CreateHeroSlideRequest {
  mediaAssetId: number
  title?: string | null
  description?: string | null
  objectPosition: string
  sortOrder: number
  isActive: boolean
}
```

Require a valid media asset. Prefer category `HERO`, but do not rely on category alone for security.

### `PATCH /api/admin/hero-slides/:id`

Updates slide fields.

For reordering, the client may send individual `sortOrder` changes. A transaction is recommended when updating multiple orders.

### `DELETE /api/admin/hero-slides/:id`

Deletes only the slide record. It does not automatically delete the media asset.

## Validation error shape

Convert Zod issues into field-level errors when practical:

```json
{
  "ok": false,
  "message": "Please review the entered values.",
  "issues": {
    "email": ["Enter a valid email address."]
  }
}
```

Use Japanese end-user messages in the UI. Internal field names may remain English.

## Security controls

- Do not render user text with `v-html`.
- Normalize and trim inputs where appropriate.
- Use Prisma parameters rather than raw SQL.
- Add a request-origin check for state-changing admin requests when practical.
- Use `SameSite=Strict` session cookies.
- Return generic login failures.
- Do not expose admin APIs through public composables.
- Do not authorize based only on the existence of an admin page route.
