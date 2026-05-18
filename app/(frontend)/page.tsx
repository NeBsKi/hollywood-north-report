import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'
import { getPosts } from '@/lib/posts/posts'

export default async function Home() {
  const reviews = await getPosts({ limit: 4, categorySlug: 'reviews' })
  const awards = await getPosts({ limit: 4, categorySlug: 'industries-and-awards' })

  const featuredReview = reviews.rows[0]
  const featuredAward = awards.rows[0]

  const otherReviews = reviews.rows.slice(1)
  const otherAwards = awards.rows.slice(1)

  return (
    <>
      <Section
        title="Latest Film Reviews"
        viewMoreButton={{ href: '/reviews' }}
        className="mb-12 md:mb-20 xl:mb-26"
      >
        {featuredReview && (
          <Link href={`/film/${featuredReview.slug}`}>
            <FilmCard
              title={featuredReview.title}
              author={featuredReview.author}
              category={featuredReview.primaryCategory}
              description={featuredReview.metaDescription}
              imageUrl={featuredReview.coverImageUrl}
              hasBackground
            />
          </Link>
        )}
        <div className="mt-12 flex flex-col justify-between gap-8 sm:mt-20 sm:flex-row sm:gap-6">
          {otherReviews.map((review) => (
            <Link href={`/film/${review.slug}`} key={review.id}>
              <FilmCard
                title={review.title}
                author={review.author}
                category={review.primaryCategory}
                imageUrl={review.coverImageUrl}
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Industries & Awards"
        viewMoreButton={{ href: '/industries-awards' }}
        className="mb-12 md:mb-20 xl:mb-26"
      >
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:gap-0">
          <div className="w-full pr-0 sm:w-1/2 sm:pr-8 lg:pr-26">
            {featuredAward && (
              <Link href={`/film/${featuredAward.slug}`}>
                <FilmCard
                  title={featuredAward.title}
                  author={featuredAward.author}
                  category={featuredAward.primaryCategory}
                  description={featuredAward.metaDescription}
                  imageUrl={featuredAward.coverImageUrl}
                  orientation="vertical"
                  contentClassName="py-4"
                />
              </Link>
            )}
          </div>
          <div className="border-accent-500/10 flex w-full flex-col justify-between gap-6 border-x px-8 sm:w-1/2 sm:px-10">
            {otherAwards.map((award) => (
              <Link
                href={`/film/${award.slug}`}
                className="border-accent-500/10 border-b pb-6 last:border-b-0"
                key={award.id}
              >
                <FilmCard
                  title={award.title}
                  author={award.author}
                  category={award.primaryCategory}
                  orientation="vertical"
                  contentAlignment="center"
                />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Selected Essays" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-8 lg:gap-14">
          <div className="flex w-full flex-col gap-4 sm:w-1/3 lg:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={1}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={2}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={3}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col justify-between gap-8 px-0 sm:w-2/3 sm:flex-row sm:gap-6 md:w-3/4 md:px-8">
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-49.png"
                imageWrapperClassName="mx-0 xl:mx-8"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-50.png"
                imageWrapperClassName="mx-0 xl:mx-8"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          </div>
        </div>
      </Section>

      <Section title="Editor's Selections" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
          <div className="flex w-full flex-col gap-4 sm:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
          </div>
          <div className="w-full px-0 sm:w-1/2 sm:px-10">
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-51.png"
                imageWrapperClassName="mx-0 xl:mx-16"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
          </div>
        </div>
      </Section>

      <Section title="You May Also Like" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-6">
          <Link
            href="/film/blow-out-when-obsession-noise-and-consequence-collide"
            className="border-accent-500/10 border-b pb-4"
          >
            <FilmCard
              title="Blow Out: When Obsession, Noise, and Consequence Collide"
              author="Ryan Lattanzio"
              orientation="vertical"
              numericId={1}
              numericIdSize="large"
              contentSize="small"
            />
          </Link>
          <Link
            href="/film/blow-out-when-obsession-noise-and-consequence-collide"
            className="border-accent-500/10 border-b pb-4"
          >
            <FilmCard
              title="Blow Out: When Obsession, Noise, and Consequence Collide"
              author="Ryan Lattanzio"
              orientation="vertical"
              numericId={2}
              numericIdSize="large"
              contentSize="small"
            />
          </Link>
          <Link
            href="/film/blow-out-when-obsession-noise-and-consequence-collide"
            className="border-accent-500/10 border-b pb-4"
          >
            <FilmCard
              title="Blow Out: When Obsession, Noise, and Consequence Collide"
              author="Ryan Lattanzio"
              orientation="vertical"
              numericId={3}
              numericIdSize="large"
              contentSize="small"
            />
          </Link>
        </div>
      </Section>
    </>
  )
}
