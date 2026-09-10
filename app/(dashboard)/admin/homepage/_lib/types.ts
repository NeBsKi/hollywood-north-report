// Kept free of any `@/generated/prisma` value import: this module is pulled into client
// components (columns, form), and importing the Prisma client runtime there breaks the browser
// bundle. `schemas.ts` asserts these values stay in sync with the Prisma enum at compile time.
export const HOME_PAGE_LAYOUT_KEY = {
  FEATURED_WITH_ROW: 'FEATURED_WITH_ROW',
  SPLIT_FEATURE_LIST: 'SPLIT_FEATURE_LIST',
  NUMBERED_LIST_WITH_CARDS: 'NUMBERED_LIST_WITH_CARDS',
  TRIPLE_COLUMN_SPOTLIGHT: 'TRIPLE_COLUMN_SPOTLIGHT',
  NUMBERED_ROW: 'NUMBERED_ROW',
} as const

export type HomePageLayoutKeyValue =
  (typeof HOME_PAGE_LAYOUT_KEY)[keyof typeof HOME_PAGE_LAYOUT_KEY]

export const HOME_LAYOUT_KEY_LIST: HomePageLayoutKeyValue[] = [
  HOME_PAGE_LAYOUT_KEY.FEATURED_WITH_ROW,
  HOME_PAGE_LAYOUT_KEY.SPLIT_FEATURE_LIST,
  HOME_PAGE_LAYOUT_KEY.NUMBERED_LIST_WITH_CARDS,
  HOME_PAGE_LAYOUT_KEY.TRIPLE_COLUMN_SPOTLIGHT,
  HOME_PAGE_LAYOUT_KEY.NUMBERED_ROW,
]

export const LAYOUT_LABELS: Record<HomePageLayoutKeyValue, string> = {
  FEATURED_WITH_ROW: 'Featured with row',
  SPLIT_FEATURE_LIST: 'Split feature + list',
  NUMBERED_LIST_WITH_CARDS: 'Numbered list with cards',
  TRIPLE_COLUMN_SPOTLIGHT: 'Triple column spotlight',
  NUMBERED_ROW: 'Numbered row',
}

/** Short reminder of how many posts each layout is designed to show. */
export const LAYOUT_HINTS: Record<HomePageLayoutKeyValue, string> = {
  FEATURED_WITH_ROW: 'One featured card plus a row (designed for 4 posts).',
  SPLIT_FEATURE_LIST: 'One feature beside a list (designed for 4 posts).',
  NUMBERED_LIST_WITH_CARDS: 'Numbered column beside cards (designed for 5 posts).',
  TRIPLE_COLUMN_SPOTLIGHT: 'Center spotlight between two columns (designed for 7 posts).',
  NUMBERED_ROW: 'A numbered row (designed for 3 posts).',
}
