import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FilmCard } from '@/components/shared/film-card'
import { PostPaginator } from '@/components/shared/post-paginator'
import { Section } from '@/components/shared/section'

import { getCategoryBySlug } from '@/lib/categories/categories'
import { getPosts } from '@/lib/posts/posts'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}): Promise<Metadata> {
  const { categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)

  if (!category) {
    return {
      title: 'Category not found',
      description: 'The requested category does not exist.',
    }
  }

  return {
    title: `${category.name} Posts`,
    description: `Browse all published posts in the ${category.name} category.`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>
  searchParams: SearchParams
}) {
  const [{ categorySlug }, queryParams] = await Promise.all([params, searchParams])

  const [category, { rows, total = 0, page = 1, pageSize = 10 }] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPosts({ categorySlug, params: queryParams }),
  ])

  if (!category) notFound()

  const hasResults = rows.length > 0

  return (
    <Section title={category.name}>
      {!hasResults ? (
        <div className="text-accent-500 mt-12 flex min-h-60 flex-col items-center justify-center gap-2 text-center sm:mt-20">
          <p className="font-lora text-xl">No posts in this category</p>
          <p className="text-accent-400 text-sm">
            New posts will appear here once they are published.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3 lg:gap-6">
            {rows.map((post) => (
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

          <PostPaginator total={total} pageSize={pageSize} page={page} rows={rows} />
        </>
      )}
    </Section>
  )
}
