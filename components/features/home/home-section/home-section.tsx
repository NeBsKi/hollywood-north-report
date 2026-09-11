import type { HomePageLayoutKey } from '@/generated/prisma/client'
import type { HomePageSectionWithPosts } from '@/lib/homepage-sections/homepage-sections.types'

import {
  FeaturedWithRow,
  NumberedListWithCards,
  NumberedRow,
  SplitFeatureList,
  TripleColumnSpotlight,
} from './_components'
import type { HomeSectionLayoutProps } from './home-section.types'

const LAYOUT_RENDERERS: Record<
  HomePageLayoutKey,
  (props: HomeSectionLayoutProps) => React.ReactNode
> = {
  FEATURED_WITH_ROW: FeaturedWithRow,
  SPLIT_FEATURE_LIST: SplitFeatureList,
  NUMBERED_LIST_WITH_CARDS: NumberedListWithCards,
  TRIPLE_COLUMN_SPOTLIGHT: TripleColumnSpotlight,
  NUMBERED_ROW: NumberedRow,
}

export const HomeSection = ({ section }: { section: HomePageSectionWithPosts }) => {
  const Layout = LAYOUT_RENDERERS[section.layoutKey]

  return (
    <Layout
      title={section.title}
      posts={section.posts}
      viewMoreHref={section.viewMoreHref ?? undefined}
    />
  )
}
