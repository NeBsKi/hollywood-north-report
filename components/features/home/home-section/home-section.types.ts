import type { PostListItem } from '@/lib/posts/posts.types'

export interface HomeSectionLayoutProps {
  title: string
  posts: PostListItem[]
  viewMoreHref?: string
}
