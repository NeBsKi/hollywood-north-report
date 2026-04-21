import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listGenres(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as ['name' | 'createdAt', 'asc' | 'desc']
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { slug: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {}

  const [rows, total] = await Promise.all([
    prisma.genre.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.genre.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getGenre = (id: string) =>
  prisma.genre.findUnique({ where: { id } })
