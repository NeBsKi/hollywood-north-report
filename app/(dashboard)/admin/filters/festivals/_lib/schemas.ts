import { z } from 'zod'

export const SLUG_RE = /^[a-z0-9-]+$/

export const festivalInput = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(120)
    .regex(SLUG_RE, 'Use lowercase letters, digits and dashes only'),
})
export type FestivalInput = z.infer<typeof festivalInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().optional(),
  sort: z
    .enum(['name:asc', 'name:desc', 'createdAt:asc', 'createdAt:desc'])
    .default('createdAt:desc'),
})
export type ListParams = z.infer<typeof listParams>
