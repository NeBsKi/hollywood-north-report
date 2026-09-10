import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'
import type { PostListItem } from '@/lib/posts/posts.types'

import { HOME_SECTION_CLASS } from '../../home-section.constants'
import type { HomeSectionLayoutProps } from '../../home-section.types'

const SIDE_COLUMN_SIZE = 3

const SideColumn = ({ posts }: { posts: PostListItem[] }) => (
  <div className="flex w-full flex-col gap-4 sm:w-1/4">
    {posts.map((post) => (
      <Link
        href={`/film/${post.slug}`}
        className="border-accent-500/10 border-b pb-4 last:border-b-0 last:pb-0"
        key={post.id}
      >
        <FilmCard
          title={post.title}
          author={post.author}
          orientation="vertical"
          contentSize="small"
        />
      </Link>
    ))}
  </div>
)

export const TripleColumnSpotlight = ({ title, posts, viewMoreHref }: HomeSectionLayoutProps) => {
  const [spotlight, ...rest] = posts
  const leftColumn = rest.slice(0, SIDE_COLUMN_SIZE)
  const rightColumn = rest.slice(SIDE_COLUMN_SIZE, SIDE_COLUMN_SIZE * 2)

  return (
    <Section
      title={title}
      viewMoreButton={viewMoreHref ? { href: viewMoreHref } : undefined}
      className={HOME_SECTION_CLASS}
    >
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
        <SideColumn posts={leftColumn} />
        <div className="w-full px-0 sm:w-1/2 sm:px-10">
          {spotlight && (
            <Link href={`/film/${spotlight.slug}`}>
              <FilmCard
                title={spotlight.title}
                author={spotlight.author}
                category={spotlight.primaryCategory}
                imageUrl={spotlight.coverImageUrl}
                imageWrapperClassName="mx-0 xl:mx-16"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          )}
        </div>
        <SideColumn posts={rightColumn} />
      </div>
    </Section>
  )
}
