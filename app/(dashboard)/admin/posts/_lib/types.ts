import type { SelectorOption } from '@/components/select-field/select-field-types'
import type { Post } from '@/generated/prisma/client'

export type PostFilters = {
  categories: SelectorOption[]
  genres: SelectorOption[]
  festivals: SelectorOption[]
  years: SelectorOption[]
}

export interface PostFormProps {
  filters: PostFilters
  post?: Pick<
    Post,
    | 'id'
    | 'title'
    | 'slug'
    | 'content'
    | 'author'
    | 'status'
    | 'publishDate'
    | 'metaTitle'
    | 'metaDescription'
  > & {
    categoryIds?: string[]
    genreIds?: string[]
    festivalIds?: string[]
    yearIds?: string[]
  }
}
