import 'server-only'
import prisma from '@/lib/prisma'

export async function listAboutSections() {
  return prisma.aboutPageSection.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      title: true,
      sectionKey: true,
      body: true,
    },
  })
}
