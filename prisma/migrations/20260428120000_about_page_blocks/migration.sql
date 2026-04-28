-- CreateEnum
CREATE TYPE "AboutBlockType" AS ENUM ('CONTENT', 'CONTENT_WITH_QUOTE', 'NESTED_CARDS');

-- CreateTable
CREATE TABLE "about_page_block" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "type" "AboutBlockType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "quote" TEXT,
    "cards" JSONB,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_block_pkey" PRIMARY KEY ("id")
);

-- Data from legacy about_page_section (if present)
INSERT INTO "about_page_block" (
    "id",
    "sortOrder",
    "type",
    "title",
    "content",
    "quote",
    "cards",
    "isPublished",
    "createdAt",
    "updatedAt"
)
SELECT
    s."id",
    s."sortOrder",
    CASE s."sectionKey"::text
        WHEN 'PERSPECTIVE' THEN 'NESTED_CARDS'::"AboutBlockType"
        WHEN 'MISSION' THEN 'CONTENT_WITH_QUOTE'::"AboutBlockType"
        ELSE 'CONTENT'::"AboutBlockType"
    END,
    s."title",
    CASE WHEN s."sectionKey"::text = 'PERSPECTIVE' THEN NULL ELSE s."content" END,
    s."quote",
    CASE WHEN s."sectionKey"::text = 'PERSPECTIVE' THEN s."cards" ELSE NULL END,
    s."isPublished",
    NOW(),
    NOW()
FROM "about_page_section" AS s
ORDER BY s."sortOrder";

-- CreateIndex
CREATE INDEX "about_page_block_sortOrder_idx" ON "about_page_block"("sortOrder");

-- DropTable
DROP TABLE "about_page_section";

-- DropEnum
DROP TYPE "AboutSectionKey";
