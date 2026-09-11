import 'server-only'

import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'

const CATEGORY_CACHE_REVALIDATE_SECONDS = 300

export async function getCategoryById(categoryId: string) {
  return unstable_cache(
    () =>
      prisma.category.findUnique({
        where: { id: categoryId },
        select: { id: true, name: true, slug: true },
      }),
    ['category', categoryId],
    { tags: ['categories'], revalidate: CATEGORY_CACHE_REVALIDATE_SECONDS },
  )()
}

export async function getCategoryBySlug(categorySlug: string) {
  return unstable_cache(
    () =>
      prisma.category.findUnique({
        where: { slug: categorySlug },
        select: { id: true, name: true, slug: true },
      }),
    ['category:slug', categorySlug],
    { tags: ['categories'], revalidate: CATEGORY_CACHE_REVALIDATE_SECONDS },
  )()
}
