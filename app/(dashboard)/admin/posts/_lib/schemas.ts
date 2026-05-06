import { z } from 'zod'

const SLUG_RE = /^[a-z0-9-]+$/

const optionalField = z.string().trim().optional().or(z.literal(''))
const optionalArrayField = z.array(z.string()).optional()

export const postFormInput = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(255, 'Slug must be less than 255 characters')
    .regex(SLUG_RE, 'Use lowercase letters, digits and dashes only'),
  publishDate: z.coerce.date({
    error: 'Publish date is required',
  }),

  content: optionalField,
  author: optionalField,
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
  coverImageId: optionalField,
  metaTitle: optionalField,
  metaDescription: optionalField,

  categoryIds: optionalArrayField,
  genreIds: optionalArrayField,
  festivalIds: optionalArrayField,
  yearIds: optionalArrayField,
})

export type PostFormInput = z.infer<typeof postFormInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().optional(),
  sort: z
    .enum(['title:asc', 'title:desc', 'createdAt:asc', 'createdAt:desc'])
    .default('createdAt:desc'),
})
export type ListParams = z.infer<typeof listParams>
