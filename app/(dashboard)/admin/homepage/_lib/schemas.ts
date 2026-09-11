import { z } from 'zod'
import type { HomePageLayoutKey } from '@/generated/prisma/client'
import { HOME_LAYOUT_KEY_LIST, type HomePageLayoutKeyValue } from './types'

// Compile-time guard: fails to build if the local layout keys drift from the Prisma enum.
type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
export const LAYOUT_KEYS_IN_SYNC: Equal<HomePageLayoutKeyValue, HomePageLayoutKey> = true

const layoutKeys = HOME_LAYOUT_KEY_LIST as [string, ...string[]]

/** Empty string (from an unselected `<select>`/input) is treated as "no value". */
const emptyToUndefined = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v)

export const sectionInput = z.object({
  title: z.string().trim().min(1, 'Title is required').max(160),
  layoutKey: z.enum(layoutKeys, 'Choose a layout'),
  categoryId: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  postLimit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1, 'Must be at least 1').max(24).optional(),
  ),
  useCategoryViewMore: z.preprocess((v) => v === 'on' || v === 'true' || v === true, z.boolean()),
  sortOrder: z.preprocess(emptyToUndefined, z.coerce.number().int().min(0).default(0)),
  isPublished: z.preprocess((v) => v === 'on' || v === 'true' || v === true, z.boolean()),
})

export type SectionInput = z.infer<typeof sectionInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  q: z.string().trim().optional(),
  sort: z
    .enum(['sortOrder:asc', 'sortOrder:desc', 'createdAt:asc', 'createdAt:desc'])
    .default('sortOrder:asc'),
})
export type ListParams = z.infer<typeof listParams>

/** Normalizes validated input into Prisma write data (optional fields become null). */
export function toSectionData(input: SectionInput) {
  return {
    title: input.title,
    layoutKey: input.layoutKey as HomePageLayoutKey,
    categoryId: input.categoryId ?? null,
    postLimit: input.postLimit ?? null,
    sortOrder: input.sortOrder,
    isPublished: input.isPublished,
  }
}
