import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'
import { isAdmin, Role } from '@/lib/roles'

export default async function AdminIndexPage() {
  const session = await getServerSession()
  if (!session) redirect('/signin')

  redirect(isAdmin(session.user.role as Role) ? '/admin/dashboard' : '/admin/posts')
}
