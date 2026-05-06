-- Clear values that are not valid Media ids before adding the foreign key
UPDATE "post"
SET "coverImage" = NULL
WHERE "coverImage" IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM "media" m WHERE m.id = "post"."coverImage");

-- CreateIndex
CREATE INDEX "post_coverImage_idx" ON "post"("coverImage");

-- AddForeignKey
ALTER TABLE "post"
ADD CONSTRAINT "post_coverImage_fkey" FOREIGN KEY ("coverImage") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
