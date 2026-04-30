import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listMedia(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as [
    'createdAt' | 'fileName',
    'asc' | 'desc',
  ]

  const where = {
    status: 'READY' as const,
    ...(q
      ? {
          OR: [
            { fileName: { contains: q, mode: 'insensitive' as const } },
            { alt: { contains: q, mode: 'insensitive' as const } },
            { title: { contains: q, mode: 'insensitive' as const } },
            { caption: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [rows, total] = await Promise.all([
    prisma.media.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.media.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getMedia = (id: string) =>
  prisma.media.findUnique({ where: { id } })
