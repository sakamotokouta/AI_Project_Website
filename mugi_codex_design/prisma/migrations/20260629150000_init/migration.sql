CREATE TYPE "MenuCategory" AS ENUM ('SHOKUPAN', 'SOZAI', 'KASHI', 'SEASONAL');
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED');
CREATE TYPE "ContactCategory" AS ENUM ('PRODUCT', 'ALLERGY', 'BULK_ORDER', 'MEDIA_EVENT', 'OTHER');
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CLOSED');

CREATE TABLE "MenuItem" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "category" "MenuCategory" NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "isRecommended" BOOLEAN NOT NULL DEFAULT false,
  "isSeasonal" BOOLEAN NOT NULL DEFAULT false,
  "allergies" TEXT[],
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reservation" (
  "id" SERIAL NOT NULL,
  "customerName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "pickupDate" TIMESTAMP(3) NOT NULL,
  "pickupTime" TEXT NOT NULL,
  "note" TEXT,
  "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReservationItem" (
  "id" SERIAL NOT NULL,
  "reservationId" INTEGER NOT NULL,
  "menuItemId" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReservationItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactInquiry" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "category" "ContactCategory" NOT NULL,
  "message" TEXT NOT NULL,
  "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MenuItem_slug_key" ON "MenuItem"("slug");
CREATE INDEX "MenuItem_category_idx" ON "MenuItem"("category");
CREATE INDEX "MenuItem_isRecommended_idx" ON "MenuItem"("isRecommended");
CREATE INDEX "MenuItem_isActive_idx" ON "MenuItem"("isActive");
CREATE INDEX "Reservation_pickupDate_idx" ON "Reservation"("pickupDate");
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");
CREATE INDEX "ReservationItem_reservationId_idx" ON "ReservationItem"("reservationId");
CREATE INDEX "ReservationItem_menuItemId_idx" ON "ReservationItem"("menuItemId");
CREATE INDEX "ContactInquiry_category_idx" ON "ContactInquiry"("category");
CREATE INDEX "ContactInquiry_status_idx" ON "ContactInquiry"("status");
CREATE INDEX "ContactInquiry_createdAt_idx" ON "ContactInquiry"("createdAt");

ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
