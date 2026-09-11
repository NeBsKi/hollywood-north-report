import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

import { HOME_SECTION_CLASS } from '../../home-section.constants'
import type { HomeSectionLayoutProps } from '../../home-section.types'

export const SplitFeatureList = ({ title, posts, viewMoreHref }: HomeSectionLayoutProps) => {
  const [featured, ...rest] = posts

  return (
    <Section
      title={title}
      viewMoreButton={viewMoreHref ? { href: viewMoreHref } : undefined}
      className={HOME_SECTION_CLASS}
    >
      <div className="flex flex-col justify-between gap-12 sm:flex-row sm:gap-0">
        <div className="w-full pr-0 sm:w-1/2 sm:pr-8 lg:pr-26">
          {featured && (
            <Link href={`/film/${featured.slug}`}>
              <FilmCard
                title={featured.title}
                author={featured.author}
                category={featured.primaryCategory}
                description={featured.metaDescription}
                imageUrl={featured.coverImageUrl}
                orientation="vertical"
                contentClassName="py-4"
              />
            </Link>
          )}
        </div>
        <div className="border-accent-500/10 flex w-full flex-col justify-between gap-6 border-x px-8 sm:w-1/2 sm:px-10">
          {rest.map((post) => (
            <Link
              href={`/film/${post.slug}`}
              className="border-accent-500/10 border-b pb-6 last:border-b-0"
              key={post.id}
            >
              <FilmCard
                title={post.title}
                author={post.author}
                category={post.primaryCategory}
                orientation="vertical"
                contentAlignment="center"
              />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
