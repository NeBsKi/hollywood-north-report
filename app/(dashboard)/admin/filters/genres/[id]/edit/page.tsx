import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getGenre } from '../../_lib/queries'
import { GenreForm } from '../../_components/genre-form'

export default async function EditGenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const genre = await getGenre(id)
  if (!genre) notFound()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/admin/filters/genres">Genres</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <GenreForm
        initial={{
          id: genre.id,
          name: genre.name,
          slug: genre.slug,
        }}
      />
    </div>
  )
}
