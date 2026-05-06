import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getYear } from '../../_lib/queries'
import { YearForm } from '../../_components/year-form'

export default async function EditYearPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const year = await getYear(id)
  if (!year) notFound()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/admin/filters/years">Years</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <YearForm
        initial={{
          id: year.id,
          value: year.value,
        }}
      />
    </div>
  )
}
