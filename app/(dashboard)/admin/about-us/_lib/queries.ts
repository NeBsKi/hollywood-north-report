import 'server-only'

import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'

const ABOUT_CACHE_REVALIDATE_SECONDS = 300

export async function listAboutPageBlocks() {
  return unstable_cache(
    () =>
      prisma.aboutPageBlock.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
    ['about'],
    { tags: ['about'], revalidate: ABOUT_CACHE_REVALIDATE_SECONDS },
  )()
}
