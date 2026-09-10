import type { HomePageLayoutKey } from '@/generated/prisma/client'
import type { PostListItem } from '@/lib/posts/posts.types'

export type HomePageSectionConfig = {
  id: string
  layoutKey: HomePageLayoutKey
  title: string
  categorySlug: string | null
  postLimit: number | null
  viewMoreHref: string | null
  sortOrder: number
}

export type HomePageSectionWithPosts = Omit<HomePageSectionConfig, 'categorySlug'> & {
  categorySlug: string
  posts: PostListItem[]
}
