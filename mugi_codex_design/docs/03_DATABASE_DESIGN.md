# 03 Database design

## Database and ORM

- PostgreSQL
- Prisma

## Stored entities

- Menu items
- Reservations
- Reservation items
- Contact inquiries
- Admin users
- Admin sessions
- Media assets
- Hero slides

## Relationship overview

```txt
AdminUser 1 ── * AdminSession

MediaAsset 1 ── * MenuItem
MediaAsset 1 ── * HeroSlide

MenuItem 1 ── * ReservationItem * ── 1 Reservation

ContactInquiry is independent.
```

## Prisma schema

Use this schema as the target. Adapt migration mechanics to the existing repository when necessary.

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

enum MediaCategory {
  HERO
  MENU
  ABOUT
  COMMON
}

enum MediaStorageType {
  STATIC
  UPLOAD
}

model AdminUser {
  id           Int            @id @default(autoincrement())
  email        String         @unique
  passwordHash String
  displayName  String
  isActive     Boolean        @default(true)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  sessions     AdminSession[]

  @@index([isActive])
}

model AdminSession {
  id         String    @id @default(cuid())
  userId     Int
  tokenHash  String    @unique
  expiresAt  DateTime
  createdAt  DateTime  @default(now())
  lastUsedAt DateTime  @default(now())
  user       AdminUser @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}

model MediaAsset {
  id           Int              @id @default(autoincrement())
  fileName     String
  originalName String
  url          String           @unique
  mimeType     String
  sizeBytes    Int
  altText      String
  category     MediaCategory
  storageType  MediaStorageType @default(UPLOAD)
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
  menuItems    MenuItem[]       @relation("MenuItemImage")
  heroSlides   HeroSlide[]

  @@index([category])
  @@index([storageType])
  @@index([createdAt])
}

model HeroSlide {
  id             Int        @id @default(autoincrement())
  mediaAssetId   Int
  title          String?
  description    String?
  objectPosition String     @default("50% 50%")
  sortOrder      Int        @default(0)
  isActive       Boolean    @default(true)
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
  mediaAsset     MediaAsset @relation(fields: [mediaAssetId], references: [id], onDelete: Restrict)

  @@index([isActive, sortOrder])
  @@index([mediaAssetId])
}

model MenuItem {
  id               Int               @id @default(autoincrement())
  name             String
  slug             String            @unique
  price            Int
  description      String
  category         MenuCategory
  imageAssetId     Int?
  isRecommended    Boolean           @default(false)
  isSeasonal       Boolean           @default(false)
  allergies        String[]
  isActive         Boolean           @default(true)
  displayOrder     Int               @default(0)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  imageAsset       MediaAsset?       @relation("MenuItemImage", fields: [imageAssetId], references: [id], onDelete: SetNull)
  reservationItems ReservationItem[]

  @@index([category])
  @@index([isRecommended])
  @@index([isActive, displayOrder])
  @@index([imageAssetId])
}

model Reservation {
  id           Int               @id @default(autoincrement())
  customerName String
  phone        String
  email        String?
  pickupDate   DateTime
  pickupTime   String
  note         String?
  status       ReservationStatus @default(PENDING)
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  items        ReservationItem[]

  @@index([pickupDate])
  @@index([status])
  @@index([createdAt])
}

model ReservationItem {
  id            Int         @id @default(autoincrement())
  reservationId Int
  menuItemId    Int
  quantity      Int
  createdAt     DateTime    @default(now())
  reservation   Reservation @relation(fields: [reservationId], references: [id], onDelete: Cascade)
  menuItem      MenuItem    @relation(fields: [menuItemId], references: [id], onDelete: Restrict)

  @@index([reservationId])
  @@index([menuItemId])
}

model ContactInquiry {
  id        Int             @id @default(autoincrement())
  name      String
  email     String
  category  ContactCategory
  message   String
  status    ContactStatus   @default(NEW)
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt

  @@index([category])
  @@index([status])
  @@index([createdAt])
}
```

## Migration policy for an existing project

The earlier design stored menu images directly in `MenuItem.imageUrl`. When upgrading an existing database:

1. Add `MediaAsset`, `HeroSlide`, `AdminUser`, and `AdminSession`.
2. Add nullable `MenuItem.imageAssetId` first.
3. Create media records for existing static menu image paths.
4. Populate `imageAssetId` for existing menu items.
5. Remove `imageUrl` only after application code uses the relation and data migration is verified.

If preserving `imageUrl` temporarily makes the migration safer, keep it as a deprecated fallback for one migration and remove it in a later migration. Do not lose existing menu images.

## Public menu DTO

Do not expose the entire database row. Return a flattened public shape:

```ts
interface PublicMenuItem {
  id: number
  name: string
  slug: string
  price: number
  description: string
  category: MenuCategory
  imageUrl: string | null
  imageAlt: string | null
  isRecommended: boolean
  isSeasonal: boolean
  allergies: string[]
}
```

## Hero-slide public DTO

```ts
interface PublicHeroSlide {
  id: number
  imageUrl: string
  altText: string
  title: string | null
  description: string | null
  objectPosition: string
}
```

## Admin seed policy

`prisma/seed.ts` must:

- read `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_DISPLAY_NAME`;
- reject missing or obviously placeholder credentials;
- hash the password with `bcryptjs` before saving;
- upsert the admin account by email;
- never print the plaintext password or hash;
- seed static media records and hero slides idempotently;
- seed menu items idempotently.

## Seed media and hero data

Create at least three static hero assets and three active hero slides using placeholder paths such as:

- `/images/hero/hero-bread-01.webp`
- `/images/hero/hero-bread-02.webp`
- `/images/hero/hero-bread-03.webp`

Seed meaningful Japanese alt text.

Seed menu assets and menu items for at least:

- 麦の灯り食パン
- 天然酵母バゲット
- クロワッサン
- くるみと蜂蜜のカンパーニュ
- 季節の果実デニッシュ
- 自家製カレーパン
- クリームパン
- 明太ポテトフランス

## Data constraints

- `price` is a non-negative integer in JPY.
- `quantity` is an integer of at least 1.
- `pickupDate` must not be in the past.
- `pickupTime` must match the configured pickup slots.
- Reservation email is optional but valid when provided.
- Contact email is required and valid.
- Admin email is normalized to lowercase before lookup.
- Hero `objectPosition` must be validated against a safe CSS-position pattern or a controlled preset list.
- `sortOrder` and `displayOrder` are integers.
- Uploaded `sizeBytes` must be at most the configured limit.
- Media deletion is blocked while relations exist.
- Static media metadata may be edited, but static files cannot be deleted through the admin API.

## Session lifecycle

- Generate at least 32 cryptographically random bytes for the session token.
- Store a SHA-256 hash in `AdminSession.tokenHash`.
- Store the raw token only in the cookie.
- Default expiry is 8 hours, configurable by `ADMIN_SESSION_HOURS`.
- Delete expired sessions during login/session checks or through periodic cleanup logic.
- Update `lastUsedAt` with throttling to avoid a write on every request.
