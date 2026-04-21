import { z } from 'zod'

export const yearInput = z.object({
  value: z.coerce.number().int().min(1900, 'Year must be 1900 or later').max(3000),
})
export type YearInput = z.infer<typeof yearInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().optional(),
  sort: z
    .enum(['value:asc', 'value:desc', 'createdAt:asc', 'createdAt:desc'])
    .default('value:desc'),
})
export type ListParams = z.infer<typeof listParams>
