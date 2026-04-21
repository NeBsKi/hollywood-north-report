-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_category" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "post_category_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "post_genre" (
    "postId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "post_genre_pkey" PRIMARY KEY ("postId","genreId")
);

-- CreateTable
CREATE TABLE "post_festival" (
    "postId" TEXT NOT NULL,
    "festivalId" TEXT NOT NULL,

    CONSTRAINT "post_festival_pkey" PRIMARY KEY ("postId","festivalId")
);

-- CreateTable
CREATE TABLE "post_year" (
    "postId" TEXT NOT NULL,
    "yearId" TEXT NOT NULL,

    CONSTRAINT "post_year_pkey" PRIMARY KEY ("postId","yearId")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- CreateIndex
CREATE INDEX "post_title_idx" ON "post"("title");

-- CreateIndex
CREATE INDEX "post_category_categoryId_idx" ON "post_category"("categoryId");

-- CreateIndex
CREATE INDEX "post_genre_genreId_idx" ON "post_genre"("genreId");

-- CreateIndex
CREATE INDEX "post_festival_festivalId_idx" ON "post_festival"("festivalId");

-- CreateIndex
CREATE INDEX "post_year_yearId_idx" ON "post_year"("yearId");

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_genre" ADD CONSTRAINT "post_genre_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_genre" ADD CONSTRAINT "post_genre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_festival" ADD CONSTRAINT "post_festival_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_festival" ADD CONSTRAINT "post_festival_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "festival"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_year" ADD CONSTRAINT "post_year_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_year" ADD CONSTRAINT "post_year_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "year"("id") ON DELETE CASCADE ON UPDATE CASCADE;
