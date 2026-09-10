import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listHomePageSections(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as ['sortOrder' | 'createdAt', 'asc' | 'desc']
  const where = q
    ? { title: { contains: q, mode: 'insensitive' as const } }
    : {}

  const [rows, total] = await Promise.all([
    prisma.homePageSection.findMany({
      where,
      orderBy: [{ [field]: dir }, { createdAt: 'asc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { category: { select: { id: true, name: true } } },
    }),
    prisma.homePageSection.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getHomePageSection = (id: string) =>
  prisma.homePageSection.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true } } },
  })

export const listCategoryOptions = () =>
  prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
