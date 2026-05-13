import Link from 'next/link'

import { cn } from '@/lib/utils'
import { FilmCard, Section, PostFilters } from '@/components/shared'
import { getPosts, getPostsFilters } from '@/lib/posts/posts'
import { PostPaginator } from '@/components/shared/post-paginator'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function IndustriesAwardsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const [{ rows, total = 0, pageSize = 0, page = 1 }, filters] = await Promise.all([
    getPosts({ params, categorySlug: 'industries-and-awards' }),
    getPostsFilters(),
  ])

  const featuredPost = rows[0]
  const otherPosts = rows.slice(1)
  const [leftPosts, rightPosts] = [otherPosts.slice(0, 5), otherPosts.slice(5)]
  const hasResults = otherPosts.length > 0

  return (
    <Section title="Industries & Awards">
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
      <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:mt-20 sm:flex-row sm:gap-8 xl:gap-32">
        <div className="flex w-full flex-col gap-8 sm:w-2/3">
          {leftPosts.length > 0 && (
            <div className="flex flex-col gap-8">
              {leftPosts.map((post) => (
                <Link key={post.id} href={`/film/${post.slug}`}>
                  <FilmCard
                    title={post.title}
                    author={post.author}
                    category={post.primaryCategory}
                    contentClassName="py-4"
                    imageUrl={post.coverImageUrl}
                    imageWrapperClassName="w-full sm:w-1/2 shrink-0"
                    description={post.metaDescription}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full justify-end sm:w-1/3">
          <div className="border-accent-500/10 flex w-full flex-col justify-start gap-6 border-x px-6 xl:px-10">
            {rightPosts.length > 0 && (
              <div className="flex flex-col gap-8">
                {rightPosts.map((post) => (
                  <Link key={post.id} href={`/film/${post.slug}`}>
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
            )}
          </div>
        </div>
      </div>

      <PostPaginator total={total} pageSize={pageSize} />
    </Section>
  )
}
