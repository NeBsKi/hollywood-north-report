-- CreateEnum
CREATE TYPE "HomePageLayoutKey" AS ENUM ('FEATURED_WITH_ROW', 'SPLIT_FEATURE_LIST', 'NUMBERED_LIST_WITH_CARDS', 'TRIPLE_COLUMN_SPOTLIGHT', 'NUMBERED_ROW');

-- CreateTable
CREATE TABLE "home_page_section" (
    "id" TEXT NOT NULL,
    "layoutKey" "HomePageLayoutKey" NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT,
    "postLimit" INTEGER,
    "viewMoreHref" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_page_section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "home_page_section_layoutKey_key" ON "home_page_section"("layoutKey");

-- CreateIndex
CREATE INDEX "home_page_section_sortOrder_idx" ON "home_page_section"("sortOrder");

-- CreateIndex
CREATE INDEX "home_page_section_categoryId_idx" ON "home_page_section"("categoryId");

-- AddForeignKey
ALTER TABLE "home_page_section" ADD CONSTRAINT "home_page_section_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
