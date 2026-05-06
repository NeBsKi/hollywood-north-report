import { columns } from './columns'
import { DataTable } from './data-table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { listPosts } from './_lib/queries'
import { listParams } from './_lib/schemas'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const parsed = listParams.safeParse(sp)
  const params = parsed.success ? parsed.data : listParams.parse({})
  const { rows, total, page, pageSize } = await listPosts(params)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>List of posts</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild>
          <Link href="/admin/posts/new">New post</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={rows} total={total} page={page} pageSize={pageSize} />
    </div>
  )
}
