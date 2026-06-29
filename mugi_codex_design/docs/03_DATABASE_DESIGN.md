# 03_DATABASE_DESIGN.md

## Database

Use PostgreSQL.

## ORM

Use Prisma.

## Stored data

Initial release stores:

- Menu items
- Reservations
- Reservation items
- Contact inquiries

Initial release does not store:

- Admin users
- Customer accounts
- Payments
- Inventory counts
- Email sending logs

## ER overview

```txt
MenuItem 1 ── * ReservationItem * ── 1 Reservation

ContactInquiry is independent.
```

## Prisma schema

Replace `prisma/schema.prisma` with the following.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum MenuCategory {
  SHOKUPAN
  SOZAI
  KASHI
  SEASONAL
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  CANCELED
  COMPLETED
}

enum ContactCategory {
  PRODUCT
  ALLERGY
  BULK_ORDER
  MEDIA_EVENT
  OTHER
}

enum ContactStatus {
  NEW
  IN_PROGRESS
  CLOSED
}

model MenuItem {
  id             Int               @id @default(autoincrement())
  name           String
  slug           String            @unique
  price          Int
  description    String
  category       MenuCategory
  imageUrl       String
  isRecommended  Boolean           @default(false)
  isSeasonal     Boolean           @default(false)
  allergies      String[]
  isActive       Boolean           @default(true)
  displayOrder   Int               @default(0)
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
  reservationItems ReservationItem[]

  @@index([category])
  @@index([isRecommended])
  @@index([isActive])
}

model Reservation {
  id             Int               @id @default(autoincrement())
  customerName   String
  phone          String
  email          String?
  pickupDate     DateTime
  pickupTime     String
  note           String?
  status         ReservationStatus @default(PENDING)
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
  items          ReservationItem[]

  @@index([pickupDate])
  @@index([status])
}

model ReservationItem {
  id            Int         @id @default(autoincrement())
  reservationId Int
  menuItemId    Int
  quantity      Int
  createdAt     DateTime    @default(now())

  reservation   Reservation @relation(fields: [reservationId], references: [id], onDelete: Cascade)
  menuItem      MenuItem    @relation(fields: [menuItemId], references: [id])

  @@index([reservationId])
  @@index([menuItemId])
}

model ContactInquiry {
  id          Int             @id @default(autoincrement())
  name        String
  email       String
  category    ContactCategory
  message     String
  status      ContactStatus   @default(NEW)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([category])
  @@index([status])
  @@index([createdAt])
}
```

## MenuCategory mapping

Frontend labels should map as follows:

| API value | Display label |
|---|---|
| `ALL` | すべて |
| `SHOKUPAN` | 食パン |
| `SOZAI` | 惣菜パン |
| `KASHI` | 菓子パン |
| `SEASONAL` | 季節限定 |

`ALL` is only a frontend/API query filter value. It is not stored as a Prisma enum.

## Reservation design

The UI may start with one selected product and quantity, but DB design supports multiple reservation items for future expansion.

Initial form can send:

```json
{
  "customerName": "山田 太郎",
  "phone": "090-1234-5678",
  "email": "taro@example.com",
  "pickupDate": "2026-07-01",
  "pickupTime": "10:30",
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    }
  ],
  "note": "袋は少なめでお願いします。"
}
```

## Contact design

Contact inquiry is independent from reservation.

```json
{
  "name": "山田 太郎",
  "email": "taro@example.com",
  "category": "BULK_ORDER",
  "message": "イベント用に30個ほど注文したいです。"
}
```

## Seed data

Create `prisma/seed.ts` and insert initial menu items.

Minimum seed items:

- 麦の灯り食パン
- 天然酵母バゲット
- クロワッサン
- くるみと蜂蜜のカンパーニュ
- 季節の果実デニッシュ
- 自家製カレーパン
- クリームパン
- 明太ポテトフランス

Use placeholder image paths such as `/images/menu/shokupan.webp`.

## Data constraints

- `price` is an integer in JPY.
- `quantity` must be at least 1. Enforce with Zod and frontend validation.
- `pickupDate` must not be in the past. Enforce with Zod and frontend validation.
- `pickupTime` must be one of the allowed time slots from 10:00 to 17:30 in 30-minute intervals.
- `email` is optional for reservations but must be valid if present.
- `email` is required for contact inquiries.
