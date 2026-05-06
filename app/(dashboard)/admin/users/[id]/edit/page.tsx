import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import type { Role } from '@/lib/roles'
import { getUser } from '../../_lib/queries'
import { UserForm } from '../../_components/user-form'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const user = await getUser(id)
  if (!user) notFound()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/admin/users">Users</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UserForm
        initial={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as Role,
        }}
      />
    </div>
  )
}
