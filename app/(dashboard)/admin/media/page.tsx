import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import { listMedia } from './_lib/queries'
import { listParams } from './_lib/schemas'
import { MediaGrid } from './_components/media-grid'

type SP = Promise<Record<string, string | undefined>>

export default async function MediaPage({
  searchParams,
}: {
  searchParams: SP
}) {
  await requireAdmin()
  const sp = await searchParams
  const parsed = listParams.safeParse(sp)
  const params = parsed.success ? parsed.data : listParams.parse({})
  const { rows, total, page, pageSize } = await listMedia(params)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Media</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild>
          <Link href="/admin/media/new">Upload media</Link>
        </Button>
      </div>
      <MediaGrid
        rows={rows}
        total={total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  )
}
