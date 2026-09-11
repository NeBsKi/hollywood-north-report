import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import { HomePageSectionForm } from '../_components/homepage-section-form'
import { listCategoryOptions } from '../_lib/queries'

export default async function NewHomePageSectionPage() {
  await requireAdmin()

  const categories = await listCategoryOptions()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/admin/homepage">Homepage</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <HomePageSectionForm categories={categories} />
    </div>
  )
}
