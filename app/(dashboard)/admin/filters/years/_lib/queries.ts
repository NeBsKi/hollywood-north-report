import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listYears(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as ['value' | 'createdAt', 'asc' | 'desc']
  const parsedQ = q && /^\d+$/.test(q) ? Number(q) : null
  const where = q ? (parsedQ === null ? { value: -1 } : { value: parsedQ }) : {}

  const [rows, total] = await Promise.all([
    prisma.year.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.year.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getYear = (id: string) =>
  prisma.year.findUnique({ where: { id } })
