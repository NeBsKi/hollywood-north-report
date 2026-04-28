-- AlterTable
ALTER TABLE "about_page_section" ADD COLUMN "content" TEXT;
ALTER TABLE "about_page_section" ADD COLUMN "quote" TEXT;
ALTER TABLE "about_page_section" ADD COLUMN "cards" JSONB;

-- MigrateJsonBodyToColumns
UPDATE "about_page_section"
SET "content" = body->>'content'
WHERE "sectionKey" IN ('ABOUT_US', 'MISSION', 'WHAT_WE_PUBLISH', 'EDITORIAL_BACKGROUND');

UPDATE "about_page_section"
SET "quote" = body->>'quote'
WHERE "sectionKey" = 'MISSION';

UPDATE "about_page_section"
SET "cards" = body->'cards'
WHERE "sectionKey" = 'PERSPECTIVE';

-- AlterTable
ALTER TABLE "about_page_section" DROP COLUMN "body";
