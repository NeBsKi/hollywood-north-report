-- DropForeignKey
ALTER TABLE "about_page_section" DROP CONSTRAINT "about_page_section_pageId_fkey";

-- DropIndex
DROP INDEX "about_page_section_pageId_sectionKey_key";

-- DropIndex
DROP INDEX "about_page_section_pageId_sortOrder_idx";

-- DropIndex
DROP INDEX "about_page_section_pageId_sortOrder_key";

-- AlterTable
ALTER TABLE "about_page_section" DROP COLUMN "pageId";

-- CreateIndex
CREATE UNIQUE INDEX "about_page_section_sectionKey_key" ON "about_page_section"("sectionKey");

-- CreateIndex
CREATE UNIQUE INDEX "about_page_section_sortOrder_key" ON "about_page_section"("sortOrder");

-- DropTable
DROP TABLE "about_page";
