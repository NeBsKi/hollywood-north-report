import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { listYears } from './_lib/queries'
import { listParams } from './_lib/schemas'

type SP = Promise<Record<string, string | undefined>>

export default async function YearsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const parsed = listParams.safeParse(sp)
  const params = parsed.success ? parsed.data : listParams.parse({})
  const { rows, total, page, pageSize } = await listYears(params)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Years</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild>
          <Link href="/admin/filters/years/new">New year</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={rows} total={total} page={page} pageSize={pageSize} />
    </div>
  )
}
