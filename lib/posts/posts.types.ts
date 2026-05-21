export type PostListFilterValue = string | string[] | undefined

export type PostListParams = {
  page?: number | string
  pageSize?: number | string
  q?: string
  categories?: PostListFilterValue
  genres?: PostListFilterValue
  festivals?: PostListFilterValue
  years?: PostListFilterValue
}

export type GetPostsArgs = {
  categorySlug?: string
  params?: PostListParams
  limit?: number
}

export type PostListItem = {
  id: string
  title: string
  slug: string
  author?: string
  metaDescription?: string
  publishDate: Date
  coverImageUrl?: string
  primaryCategory?: string
  primaryCategorySlug?: string
}

export type GetPostsResult = {
  rows: PostListItem[]
  total?: number
  page?: number
  pageSize?: number
}

export type PostRow = {
  id: string
  title: string
  slug: string
  author: string | null
  publishDate: Date
  metaDescription: string | null
  coverMedia: { cardUrl: string | null; url: string } | null
  categories: Array<{ category: { id: string; name: string; slug: string } }>
}

export type PostsFiltersOption = { value: string; label: string }

export type PostsFilters = {
  categories: PostsFiltersOption[]
  genres: PostsFiltersOption[]
  festivals: PostsFiltersOption[]
  years: PostsFiltersOption[]
}
