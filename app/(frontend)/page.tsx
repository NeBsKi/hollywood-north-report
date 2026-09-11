import { HomeFallback, HomeSection } from '@/components/features/home'
import { getHomePageSectionsWithPosts } from '@/lib/homepage-sections/homepage-sections'
import type { HomePageSectionWithPosts } from '@/lib/homepage-sections/homepage-sections.types'

export const revalidate = 120

export default async function Home() {
  let sections: HomePageSectionWithPosts[] = []

  try {
    sections = await getHomePageSectionsWithPosts()
  } catch (error) {
    console.error('Failed to load homepage sections, rendering fallback homepage.', error)
  }

  if (sections.length === 0) return <HomeFallback />

  return (
    <>
      {sections.map((section) => (
        <HomeSection key={section.id} section={section} />
      ))}
    </>
  )
}
