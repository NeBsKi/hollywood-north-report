import type { HomePageLayoutKey } from '@/generated/prisma/client'

export const HOME_SECTIONS_CACHE_TAG = 'home-sections'

export const HOME_SECTIONS_CACHE_REVALIDATE_SECONDS = 300

/** Post counts each layout was designed around, used when a section has no explicit limit. */
export const DEFAULT_POST_LIMIT_BY_LAYOUT: Record<HomePageLayoutKey, number> = {
  FEATURED_WITH_ROW: 4,
  SPLIT_FEATURE_LIST: 4,
  NUMBERED_LIST_WITH_CARDS: 5,
  TRIPLE_COLUMN_SPOTLIGHT: 7,
  NUMBERED_ROW: 3,
}
