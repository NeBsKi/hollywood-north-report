import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { PostForm } from '../../_components/post-form'
import { getPost, getPostFilters } from '../../_lib/queries'
import { notFound } from 'next/navigation'

export default async function PostsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const filters = await getPostFilters()
  const post = await getPost(id)
  console.log(post)

  if (!post) notFound()

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <Link href="/admin/posts">List of posts</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit post</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Post ID: {id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PostForm filters={filters} post={post} />
    </div>
  )
}
