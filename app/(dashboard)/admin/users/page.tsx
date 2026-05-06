import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import { UsersTable } from './_components/users-table'
import { listUsers } from './_lib/queries'
import { listParams } from './_lib/schemas'

type SP = Promise<Record<string, string | undefined>>

export default async function UsersPage({ searchParams }: { searchParams: SP }) {
  const session = await requireAdmin()
  const sp = await searchParams
  const parsed = listParams.safeParse(sp)
  const params = parsed.success ? parsed.data : listParams.parse({})
  const { rows, total, page, pageSize } = await listUsers(params)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Users</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild>
          <Link href="/admin/users/new">New user</Link>
        </Button>
      </div>
      <UsersTable
        currentUserId={session.user.id}
        rows={rows}
        total={total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  )
}
