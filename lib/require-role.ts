import 'server-only'
import { redirect } from 'next/navigation'
import { getServerSession } from './get-session'
import type { Role } from './roles'

export async function requireRole(
  allowed: Role[],
  { fallback = '/admin/posts' }: { fallback?: string } = {},
) {
  const session = await getServerSession()
  if (!session) redirect('/signin')
  if (!allowed.includes(session.user.role as Role)) redirect(fallback)
  return session
}

export const requireAdmin = (opts?: { fallback?: string }) =>
  requireRole(['ADMIN'], opts)
