import 'server-only'

import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'

import { DEFAULT_PAGE_SIZE } from './posts.constants'
import type { GetPostsArgs, GetPostsResult, PostListItem } from './posts.types'
import { coerceInt, normalizeIds, toListItem } from './posts.utils'
import type { PostsFilters } from './posts.types'

const POST_SELECT = {
  id: true,
  title: true,
  slug: true,
  author: true,
  publishDate: true,
  metaDescription: true,
  coverMedia: { select: { cardUrl: true, url: true } },
  categories: {
    select: {
      category: { select: { id: true, name: true, slug: true } },
    },
  },
} as const

const POSTS_LIST_CACHE_REVALIDATE_SECONDS = 60
const POSTS_FILTERS_CACHE_REVALIDATE_SECONDS = 300

const getPostsCacheKeyParts = ({ categorySlug, params = {}, limit }: GetPostsArgs): string[] => {
  const categories = normalizeIds(params.categories).sort().join(',')
  const genres = normalizeIds(params.genres).sort().join(',')
  const festivals = normalizeIds(params.festivals).sort().join(',')
  const years = normalizeIds(params.years).sort().join(',')
  const query = typeof params.q === 'string' ? params.q.trim().toLowerCase() : ''
  const page = String(coerceInt(params.page, 1))
  const pageSize = String(coerceInt(params.pageSize, DEFAULT_PAGE_SIZE))

  return [
    `category:${categorySlug ?? ''}`,
    `limit:${String(limit ?? '')}`,
    `page:${page}`,
    `pageSize:${pageSize}`,
    `categories:${categories}`,
    `genres:${genres}`,
    `festivals:${festivals}`,
    `years:${years}`,
    `q:${query}`,
  ]
}

export async function getPosts({
  categorySlug,
  params = {},
  limit,
}: GetPostsArgs = {}): Promise<GetPostsResult> {
  return unstable_cache(
    async () => {
      if (limit) {
        const rows = await prisma.post.findMany({
          where: {
            status: 'PUBLISHED' as const,
            categories: { some: { category: { slug: categorySlug } } },
          },
          orderBy: { publishDate: 'desc' },
          take: limit,
          select: POST_SELECT,
        })

        return {
          rows: rows.map(toListItem()),
        }
      }

      const categories = normalizeIds(params.categories)
      const genres = normalizeIds(params.genres)
      const festivals = normalizeIds(params.festivals)
      const years = normalizeIds(params.years)
      const query = typeof params.q === 'string' ? params.q.trim() : ''

      const andClauses: Array<Record<string, unknown>> = []

      if (categories.length > 0) {
        andClauses.push({ categories: { some: { categoryId: { in: categories } } } })
      }

      if (genres.length > 0) {
        andClauses.push({ genres: { some: { genreId: { in: genres } } } })
      }

      if (festivals.length > 0) {
        andClauses.push({ festivals: { some: { festivalId: { in: festivals } } } })
      }

      if (years.length > 0) {
        andClauses.push({ years: { some: { yearId: { in: years } } } })
      }

      if (query.length > 0) {
        andClauses.push({
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
          ],
        })
      }

      const where = {
        status: 'PUBLISHED' as const,
        categories: { some: { category: { slug: categorySlug } } },
        ...(andClauses.length > 0 ? { AND: andClauses } : {}),
      }

      const page = coerceInt(params.page, 1)
      const pageSize = coerceInt(params.pageSize, DEFAULT_PAGE_SIZE)

      const [rows, total] = await Promise.all([
        prisma.post.findMany({
          where,
          orderBy: { publishDate: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: POST_SELECT,
        }),
        prisma.post.count({ where }),
      ])

      return {
        rows: rows.map(toListItem()),
        total,
        page,
        pageSize,
      }
    },
    ['posts', ...getPostsCacheKeyParts({ categorySlug, params, limit })],
    {
      tags: ['posts', `posts:list:${categorySlug ?? 'all'}`],
      revalidate: POSTS_LIST_CACHE_REVALIDATE_SECONDS,
    },
  )()
}

export async function getPostsFilters(): Promise<PostsFilters> {
  return unstable_cache(
    async () => {
      const [categories, genres, festivals, years] = await Promise.all([
        prisma.category.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        }),
        prisma.genre.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        }),
        prisma.festival.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        }),
        prisma.year.findMany({
          select: { id: true, value: true },
          orderBy: { value: 'desc' },
        }),
      ])

      return {
        categories: categories.map((category) => ({ value: category.id, label: category.name })),
        genres: genres.map((genre) => ({ value: genre.id, label: genre.name })),
        festivals: festivals.map((festival) => ({ value: festival.id, label: festival.name })),
        years: years.map((year) => ({ value: year.id, label: String(year.value) })),
      }
    },
    ['post-filters'],
    {
      tags: ['post-filters'],
      revalidate: POSTS_FILTERS_CACHE_REVALIDATE_SECONDS,
    },
  )()
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { ...POST_SELECT, content: true },
  })

  if (!post) return null

  return post
}
