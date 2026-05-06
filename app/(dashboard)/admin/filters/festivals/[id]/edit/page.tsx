import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getFestival } from '../../_lib/queries'
import { FestivalForm } from '../../_components/festival-form'

export default async function EditFestivalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const festival = await getFestival(id)
  if (!festival) notFound()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/admin/filters/festivals">Festivals</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <FestivalForm
        initial={{
          id: festival.id,
          name: festival.name,
          slug: festival.slug,
        }}
      />
    </div>
  )
}
