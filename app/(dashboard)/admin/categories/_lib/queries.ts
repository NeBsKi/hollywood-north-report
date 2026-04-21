import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listCategories(params: ListParams) {
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
    prisma.category.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.category.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getCategory = (id: string) =>
  prisma.category.findUnique({ where: { id } })
