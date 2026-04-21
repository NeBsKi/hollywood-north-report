import 'server-only'
import prisma from '@/lib/prisma'
import type { ListParams } from './schemas'

export async function listUsers(params: ListParams) {
  const { page, pageSize, q, sort } = params
  const [field, dir] = sort.split(':') as ['email' | 'createdAt', 'asc' | 'desc']
  const where = q
    ? {
        OR: [
          { email: { contains: q, mode: 'insensitive' as const } },
          { name: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {}

  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { [field]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({ where }),
  ])
  return { rows, total, page, pageSize }
}

export const getUser = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  })
