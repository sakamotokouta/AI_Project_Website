# 04_API_DESIGN.md

## Overview

Implement backend APIs using Nuxt `server/api`.

Do not create Express.

## Common response format

For successful responses:

```ts
export interface ApiSuccess<T> {
  ok: true
  data: T
}
```

For errors:

```ts
export interface ApiError {
  ok: false
  message: string
  issues?: Record<string, string[]>
}
```

## Validation

Use Zod for API request validation.

Recommended files:

```txt
server/validation/reservation.ts
server/validation/contact.ts
```

## Prisma Client setup

Create `server/utils/prisma.ts`.

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

## GET /api/menu

### Purpose

Return active menu items.

### File

```txt
server/api/menu.get.ts
```

### Query parameters

| Name | Type | Required | Description |
|---|---|---|---|
| category | string | no | `ALL`, `SHOKUPAN`, `SOZAI`, `KASHI`, `SEASONAL` |

### Behavior

- If category is missing or `ALL`, return all active menu items.
- If category is one of the menu categories, filter by category.
- Sort by `displayOrder` ascending, then `id` ascending.

### Response

```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "麦の灯り食パン",
      "slug": "mugi-no-akari-shokupan",
      "price": 420,
      "description": "国産小麦と天然酵母でふんわり焼き上げた看板食パンです。",
      "category": "SHOKUPAN",
      "imageUrl": "/images/menu/shokupan.webp",
      "isRecommended": true,
      "isSeasonal": false,
      "allergies": ["小麦", "乳"]
    }
  ]
}
```

## GET /api/menu/recommended

### Purpose

Return recommended active menu items for top page.

### File

```txt
server/api/menu/recommended.get.ts
```

### Behavior

- Return active items where `isRecommended = true`.
- Limit to 3 or 4 items.
- Sort by `displayOrder` ascending.

## POST /api/reservations

### Purpose

Create a reservation.

### File

```txt
server/api/reservations.post.ts
```

### Request body

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

### Validation rules

- `customerName` is required.
- `phone` is required.
- `email` is optional but must be valid if provided.
- `pickupDate` is required and must not be in the past.
- `pickupTime` is required and must be one of:
  - 10:00
  - 10:30
  - 11:00
  - 11:30
  - 12:00
  - 12:30
  - 13:00
  - 13:30
  - 14:00
  - 14:30
  - 15:00
  - 15:30
  - 16:00
  - 16:30
  - 17:00
  - 17:30
- `items` must contain at least one item.
- `menuItemId` must reference an active menu item.
- `quantity` must be 1 or greater.
- `note` is optional.

### Success response

```json
{
  "ok": true,
  "data": {
    "id": 1,
    "message": "ご予約を受け付けました。"
  }
}
```

### Error response

```json
{
  "ok": false,
  "message": "入力内容を確認してください。",
  "issues": {
    "customerName": ["お名前を入力してください。"]
  }
}
```

## POST /api/contacts

### Purpose

Create a contact inquiry.

### File

```txt
server/api/contacts.post.ts
```

### Request body

```ts
interface CreateContactRequest {
  name: string
  email: string
  category: 'PRODUCT' | 'ALLERGY' | 'BULK_ORDER' | 'MEDIA_EVENT' | 'OTHER'
  message: string
}
```

### Validation rules

- `name` is required.
- `email` is required.
- `email` must be valid.
- `category` is required.
- `message` is required.

### Success response

```json
{
  "ok": true,
  "data": {
    "id": 1,
    "message": "お問い合わせを受け付けました。"
  }
}
```

## HTTP status policy

| Case | Status |
|---|---|
| Success | 200 or 201 |
| Validation error | 400 |
| Not found | 404 |
| Unexpected server error | 500 |

## Error handling policy

- Do not return stack traces to the client.
- For validation errors, return field-level messages.
- For unexpected errors, return a generic message.

## Security policy

- Do not render user input as HTML.
- Validate request body on server side.
- Keep `DATABASE_URL` server-only.
- Add spam protection such as reCAPTCHA only in future versions.
