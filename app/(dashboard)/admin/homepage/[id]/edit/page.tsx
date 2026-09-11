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
import { HomePageSectionForm } from '../../_components/homepage-section-form'
import { getHomePageSection, listCategoryOptions } from '../../_lib/queries'

export default async function EditHomePageSectionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const { id } = await params
  const [section, categories] = await Promise.all([
    getHomePageSection(id),
    listCategoryOptions(),
  ])

  if (!section) notFound()

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
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <HomePageSectionForm
        section={{
          id: section.id,
          title: section.title,
          layoutKey: section.layoutKey,
          categoryId: section.categoryId,
          postLimit: section.postLimit,
          viewMoreHref: section.viewMoreHref,
          sortOrder: section.sortOrder,
          isPublished: section.isPublished,
        }}
        categories={categories}
      />
    </div>
  )
}
