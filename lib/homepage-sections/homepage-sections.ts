import 'server-only'

import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { getPosts } from '@/lib/posts/posts'

import {
  DEFAULT_POST_LIMIT_BY_LAYOUT,
  HOME_SECTIONS_CACHE_REVALIDATE_SECONDS,
  HOME_SECTIONS_CACHE_TAG,
} from './homepage-sections.constants'
import type { HomePageSectionConfig, HomePageSectionWithPosts } from './homepage-sections.types'

export async function getPublishedHomePageSections(): Promise<HomePageSectionConfig[]> {
  return unstable_cache(
    async () => {
      const sections = await prisma.homePageSection.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          layoutKey: true,
          title: true,
          postLimit: true,
          viewMoreHref: true,
          sortOrder: true,
          category: { select: { slug: true } },
        },
      })

      return sections.map(({ category, ...section }) => ({
        ...section,
        categorySlug: category?.slug ?? null,
      }))
    },
    [HOME_SECTIONS_CACHE_TAG],
    { tags: [HOME_SECTIONS_CACHE_TAG], revalidate: HOME_SECTIONS_CACHE_REVALIDATE_SECONDS },
  )()
}

/**
 * Published sections paired with their posts. Sections without a category (for example after the
 * category was deleted) and sections whose category has no published posts are dropped so the
 * homepage never renders an empty layout.
 */
export async function getHomePageSectionsWithPosts(): Promise<HomePageSectionWithPosts[]> {
  const sections = await getPublishedHomePageSections()

  const sourced = sections.filter(
    (section): section is HomePageSectionConfig & { categorySlug: string } =>
      section.categorySlug !== null,
  )

  const withPosts = await Promise.all(
    sourced.map(async (section) => {
      const limit =
        section.postLimit && section.postLimit > 0
          ? section.postLimit
          : DEFAULT_POST_LIMIT_BY_LAYOUT[section.layoutKey]

      const { rows } = await getPosts({ categorySlug: section.categorySlug, limit })

      return { ...section, posts: rows }
    }),
  )

  return withPosts.filter((section) => section.posts.length > 0)
}
