-- CreateEnum
CREATE TYPE "AboutSectionKey" AS ENUM (
    'ABOUT_US',
    'MISSION',
    'WHAT_WE_PUBLISH',
    'PERSPECTIVE',
    'EDITORIAL_BACKGROUND'
);

-- CreateTable
CREATE TABLE "about_page" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'about-us',
    "title" TEXT NOT NULL DEFAULT 'About Us',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_page_section" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "sectionKey" "AboutSectionKey" NOT NULL,
    "title" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "about_page_section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "about_page_slug_key" ON "about_page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "about_page_section_pageId_sectionKey_key" ON "about_page_section"("pageId", "sectionKey");

-- CreateIndex
CREATE UNIQUE INDEX "about_page_section_pageId_sortOrder_key" ON "about_page_section"("pageId", "sortOrder");

-- CreateIndex
CREATE INDEX "about_page_section_pageId_sortOrder_idx" ON "about_page_section"("pageId", "sortOrder");

-- AddForeignKey
ALTER TABLE "about_page_section" ADD CONSTRAINT "about_page_section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "about_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
