import Link from 'next/link'
import type { Metadata } from 'next'

import { FilmCard } from '@/components/shared/film-card'
import { PostPaginator } from '@/components/shared/post-paginator'
import { Section } from '@/components/shared/section'
import { getPosts } from '@/lib/posts/posts'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const getFirstParamValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

const normalizeQuery = (value: string | string[] | undefined): string =>
  getFirstParamValue(value).trim()

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const params = await searchParams
  const query = normalizeQuery(params.q)

  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query
      ? `Browse film posts matching "${query}".`
      : 'Search for reviews, industries and awards content.',
  }
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = normalizeQuery(params.q)

  if (!query) {
    return (
      <Section title="Search">
        <div className="text-accent-500 mt-12 flex min-h-60 flex-col items-center justify-center gap-2 text-center sm:mt-20">
          <p className="font-lora text-xl">Enter a search term to begin</p>
          <p className="text-accent-400 text-sm">
            Try searching by title, slug, author, or description.
          </p>
        </div>
      </Section>
    )
  }

  const queryParams: Record<string, string | string[] | undefined> = {
    ...params,
    q: query,
  }

  const {
    rows,
    total = 0,
    pageSize = 0,
    page = 1,
  } = await getPosts({
    params: queryParams,
  })

  const hasResults = rows.length > 0
  const rangeStart = total > 0 ? (page - 1) * pageSize + 1 : 0
  const rangeEnd = total > 0 ? rangeStart + rows.length - 1 : 0

  return (
    <Section title="Search">
      <div className="mt-12 flex flex-col gap-2 sm:mt-20">
        <p className="text-accent-500 font-lora text-xl">Results for "{query}"</p>
        {hasResults ? (
          <p className="text-white-900 font-brandon text-sm/6">
            Showing {rangeStart}-{rangeEnd} from {total}
          </p>
        ) : (
          <p className="text-accent-400 text-sm">
            No matches found. Try a different term or a broader phrase.
          </p>
        )}
      </div>

      {!hasResults ? (
        <div className="text-accent-500 mt-12 flex min-h-60 flex-col items-center justify-center gap-2 text-center sm:mt-20">
          <p className="font-lora text-xl">No results found</p>
          <p className="text-accent-400 text-sm">We could not find posts matching "{query}".</p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 lg:gap-6">
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

          <PostPaginator total={total} pageSize={pageSize} />
        </>
      )}
    </Section>
  )
}
