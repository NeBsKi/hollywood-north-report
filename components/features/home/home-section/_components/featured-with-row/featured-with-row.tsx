import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

import { HOME_SECTION_CLASS } from '../../home-section.constants'
import type { HomeSectionLayoutProps } from '../../home-section.types'

export const FeaturedWithRow = ({ title, posts, viewMoreHref }: HomeSectionLayoutProps) => {
  const [featured, ...rest] = posts

  return (
    <Section
      title={title}
      viewMoreButton={viewMoreHref ? { href: viewMoreHref } : undefined}
      className={HOME_SECTION_CLASS}
    >
      {featured && (
        <Link href={`/film/${featured.slug}`}>
          <FilmCard
            title={featured.title}
            author={featured.author}
            category={featured.primaryCategory}
            description={featured.metaDescription}
            imageUrl={featured.coverImageUrl}
            hasBackground
          />
        </Link>
      )}
      <div className="mt-12 flex flex-col justify-between gap-8 sm:mt-20 sm:flex-row sm:gap-6">
        {rest.map((post) => (
          <Link href={`/film/${post.slug}`} key={post.id}>
            <FilmCard
              title={post.title}
              author={post.author}
              category={post.primaryCategory}
              imageUrl={post.coverImageUrl}
              contentAlignment="center"
              contentClassName="py-4"
              orientation="vertical"
            />
          </Link>
        ))}
      </div>
    </Section>
  )
}
