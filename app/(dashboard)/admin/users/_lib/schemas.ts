import { z } from 'zod'
import { ROLES } from '@/lib/roles'

export const createUserInput = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(ROLES).default('USER'),
})
export type CreateUserInput = z.infer<typeof createUserInput>

export const updateUserInput = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  role: z.enum(ROLES),
})
export type UpdateUserInput = z.infer<typeof updateUserInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().optional(),
  sort: z
    .enum(['email:asc', 'email:desc', 'createdAt:asc', 'createdAt:desc'])
    .default('createdAt:desc'),
})
export type ListParams = z.infer<typeof listParams>
