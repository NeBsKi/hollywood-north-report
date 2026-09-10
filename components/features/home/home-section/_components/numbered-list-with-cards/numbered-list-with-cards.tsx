import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

import { HOME_SECTION_CLASS } from '../../home-section.constants'
import type { HomeSectionLayoutProps } from '../../home-section.types'

const NUMBERED_COLUMN_SIZE = 3

export const NumberedListWithCards = ({ title, posts, viewMoreHref }: HomeSectionLayoutProps) => {
  const numbered = posts.slice(0, NUMBERED_COLUMN_SIZE)
  const cards = posts.slice(NUMBERED_COLUMN_SIZE)

  return (
    <Section
      title={title}
      viewMoreButton={viewMoreHref ? { href: viewMoreHref } : undefined}
      className={HOME_SECTION_CLASS}
    >
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-8 lg:gap-14">
        <div className="flex w-full flex-col gap-4 sm:w-1/3 lg:w-1/4">
          {numbered.map((post, index) => (
            <Link href={`/film/${post.slug}`} key={post.id}>
              <FilmCard
                title={post.title}
                author={post.author}
                orientation="vertical"
                numericId={index + 1}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
          ))}
        </div>
        <div className="flex w-full flex-col justify-between gap-8 px-0 sm:w-2/3 sm:flex-row sm:gap-6 md:w-3/4 md:px-8">
          {cards.map((post) => (
            <Link href={`/film/${post.slug}`} key={post.id}>
              <FilmCard
                title={post.title}
                author={post.author}
                category={post.primaryCategory}
                imageUrl={post.coverImageUrl}
                imageWrapperClassName="mx-0 xl:mx-8"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
