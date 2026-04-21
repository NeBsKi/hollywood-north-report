import { SectionCards } from '@/components/section-cards'
import { requireAdmin } from '@/lib/roles'

export default async function DashboardPage() {
  await requireAdmin({ fallback: '/admin/posts' })

  return (
    <div>
      <SectionCards />
    </div>
  )
}
