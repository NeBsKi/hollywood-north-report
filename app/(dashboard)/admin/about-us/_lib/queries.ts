import 'server-only'

import { unstable_noStore as noStore } from 'next/cache'
import prisma from '@/lib/prisma'

export async function listAboutPageBlocks() {
  noStore()
  return prisma.aboutPageBlock.findMany({
    orderBy: { sortOrder: 'asc' },
  })
}
