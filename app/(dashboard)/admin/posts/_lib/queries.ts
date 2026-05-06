import 'server-only'

import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'
import type { PostFilters } from './types'

export async function getPostFilters(): Promise<PostFilters> {
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
}

export async function listPosts(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as ['title' | 'createdAt', 'asc' | 'desc']
  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' as const } },
          { slug: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {}

  const [rows, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishDate: true,
      },
    }),
    prisma.post.count({ where }),
  ])

  return { rows, total, page, pageSize }
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: { select: { categoryId: true } },
      genres: { select: { genreId: true } },
      festivals: { select: { festivalId: true } },
      years: { select: { yearId: true } },
    },
  })

  if (!post) return null

  return {
    ...post,
    categoryIds: post.categories.map((item) => item.categoryId),
    genreIds: post.genres.map((item) => item.genreId),
    festivalIds: post.festivals.map((item) => item.festivalId),
    yearIds: post.years.map((item) => item.yearId),
  }
}
