import { PostListItem } from '@/lib/posts/posts.types'

export interface PostPaginatorProps {
  total: number
  pageSize: number
  page: number
  rows: PostListItem[]
}
