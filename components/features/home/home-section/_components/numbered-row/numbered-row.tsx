import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

import { HOME_SECTION_CLASS } from '../../home-section.constants'
import type { HomeSectionLayoutProps } from '../../home-section.types'

export const NumberedRow = ({ title, posts, viewMoreHref }: HomeSectionLayoutProps) => {
  return (
    <Section
      title={title}
      viewMoreButton={viewMoreHref ? { href: viewMoreHref } : undefined}
      className={HOME_SECTION_CLASS}
    >
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-6">
        {posts.map((post, index) => (
          <Link
            href={`/film/${post.slug}`}
            className="border-accent-500/10 border-b pb-4"
            key={post.id}
          >
            <FilmCard
              title={post.title}
              author={post.author}
              orientation="vertical"
              numericId={index + 1}
              numericIdSize="large"
              contentSize="small"
            />
          </Link>
        ))}
      </div>
    </Section>
  )
}
