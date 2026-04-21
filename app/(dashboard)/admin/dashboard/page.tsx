import { SectionCards } from '@/components/section-cards'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-role'

export default async function DashboardPage() {
  await requireAdmin({ fallback: '/admin/posts' })

  const [users, posts, categories, genres, festivals, years] = await prisma.$transaction([
    prisma.user.count(),
    prisma.post.count(),
    prisma.category.count(),
    prisma.genre.count(),
    prisma.festival.count(),
    prisma.year.count(),
  ])

  return (
    <div>
      <SectionCards
        stats={{
          users,
          posts,
          categories,
          genres,
          festivals,
          years,
        }}
      />
    </div>
  )
}
