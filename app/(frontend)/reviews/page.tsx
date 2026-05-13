import Link from 'next/link'

import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

import { PostFilters } from '@/components/shared/post-filters'
import { getPosts, getPostsFilters } from '@/lib/posts/posts'
import { cn } from '@/lib/utils'
import { PostPaginator } from '@/components/shared/post-paginator'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ReviewsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams

  const [{ rows, total = 0, pageSize = 0, page = 1 }, filters] = await Promise.all([
    getPosts({ params, categorySlug: 'reviews' }),
    getPostsFilters(),
  ])

  const featuredPost = rows[0]
  const otherPosts = rows.slice(1)
  const hasResults = otherPosts.length > 0

  return (
    <Section title="Film Reviews">
      {featuredPost && (
        <Link href={`/film/${featuredPost.slug}`}>
          <FilmCard
            title={featuredPost.title}
            author={featuredPost.author}
            category={featuredPost.primaryCategory}
            description={featuredPost.metaDescription}
            imageUrl={featuredPost.coverImageUrl}
            hasBackground
          />
        </Link>
      )}

      <div
        className={cn(
          'flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end',
          featuredPost && 'mt-12 sm:mt-20',
        )}
      >
        <div className="hidden sm:block">
          <p className="text-white-900 font-brandon text-sm/6">
            Showing {page}-{rows.length} from {total}
          </p>
        </div>
        <PostFilters filters={filters} />
      </div>

      {!hasResults ? (
        <div className="text-accent-500 mt-12 flex min-h-60 flex-col items-center justify-center gap-2 text-center sm:mt-20">
          <p className="font-lora text-xl">No reviews found</p>
          <p className="text-accent-400 text-sm">
            Try adjusting the filters to discover more reviews.
          </p>
        </div>
      ) : (
        <>
          {otherPosts.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 lg:gap-6">
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/film/${post.slug}`}>
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
          )}

          <PostPaginator total={total} pageSize={pageSize} />
        </>
      )}
    </Section>
  )
}
