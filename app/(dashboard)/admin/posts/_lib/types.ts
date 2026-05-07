import type { SelectorOption } from '@/components/select-field/select-field-types'
import type { Media, Post } from '@/generated/prisma/client'

export type PostFilters = {
  categories: SelectorOption[]
  genres: SelectorOption[]
  festivals: SelectorOption[]
  years: SelectorOption[]
}

export type PostCoverMedia = Pick<Media, 'id' | 'url' | 'thumbUrl' | 'fileName'>

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
    | 'coverImageId'
    | 'metaTitle'
    | 'metaDescription'
    | 'createdAt'
    | 'updatedAt'
  > & {
    categoryIds?: string[]
    genreIds?: string[]
    festivalIds?: string[]
    yearIds?: string[]
    coverMedia?: PostCoverMedia | null
  }
}
