import type { PostListFilterValue, PostListItem, PostRow } from './posts.types'

export const normalizeIds = (value: PostListFilterValue): string[] => {
  if (!value) return []
  const raw = Array.isArray(value) ? value : value.split(',')
  return raw.map((item) => item.trim()).filter((item) => item.length > 0)
}

export const coerceInt = (
  value: number | string | undefined,
  fallback: number,
  { min = 1 }: { min?: number } = {},
): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.max(min, Math.floor(value)) : fallback
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return Math.max(min, Math.floor(parsed))
  }
  return fallback
}

export const toListItem =
  (categoryId?: string) =>
  (post: PostRow): PostListItem => {
    const primary = categoryId
      ? (post.categories.find((entry) => entry.category.id !== categoryId)?.category ??
        post.categories[0]?.category)
      : post.categories[0]?.category

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      author: post.author ?? undefined,
      metaDescription: post.metaDescription ?? undefined,
      publishDate: post.publishDate,
      coverImageUrl: post.coverMedia?.cardUrl ?? post.coverMedia?.url ?? undefined,
      primaryCategory: primary?.name ?? undefined,
      primaryCategorySlug: primary?.slug ?? undefined,
    }
  }
