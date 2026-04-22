import { z } from 'zod'
import { AboutSectionKey, type Prisma } from '@/generated/prisma/client'

const requiredText = z.string().trim().min(1, 'This field is required')

const publishItemSchema = z.object({
  title: requiredText,
  description: requiredText,
})

const perspectiveCardSchema = z.object({
  title: requiredText,
  content: requiredText,
})

export const aboutPageInput = z.object({
  aboutTitle: requiredText,
  aboutContent: requiredText,
  aboutTags: z.string().trim().default(''),
  missionTitle: requiredText,
  missionContent: requiredText,
  missionQuote: requiredText,
  publishTitle: requiredText,
  publishIntro: requiredText,
  publishOutro: requiredText,
  publishCtaHref: z.string().trim().min(1, 'CTA link is required').startsWith('/'),
  publishItem1Title: requiredText,
  publishItem1Description: requiredText,
  publishItem2Title: requiredText,
  publishItem2Description: requiredText,
  publishItem3Title: requiredText,
  publishItem3Description: requiredText,
  publishItem4Title: requiredText,
  publishItem4Description: requiredText,
  perspectiveTitle: requiredText,
  perspectiveCard1Title: requiredText,
  perspectiveCard1Content: requiredText,
  perspectiveCard2Title: requiredText,
  perspectiveCard2Content: requiredText,
  perspectiveCard3Title: requiredText,
  perspectiveCard3Content: requiredText,
  editorialBackgroundTitle: requiredText,
  editorialBackgroundContent: requiredText,
})

export type AboutPageInput = z.infer<typeof aboutPageInput>

type AboutSectionRecord = {
  sectionKey: AboutSectionKey
  title: string
  body: Prisma.JsonValue
}

export type AboutPageFormValues = AboutPageInput

type AboutUsBody = { content: string; tags?: string[] }
type MissionBody = { content: string; quote: string }
type WhatWePublishBody = {
  intro: string[]
  items: Array<{ title: string; description: string }>
  outro: string
  ctaHref: string
}
type PerspectiveBody = { cards: Array<{ title: string; content: string }> }
type EditorialBackgroundBody = { content: string }

const DEFAULT_VALUES: AboutPageFormValues = {
  aboutTitle: 'About Us',
  aboutContent: '',
  aboutTags: '',
  missionTitle: 'Mission',
  missionContent: '',
  missionQuote: '',
  publishTitle: 'What We Publish',
  publishIntro: '',
  publishOutro: '',
  publishCtaHref: '/what-we-publish',
  publishItem1Title: '',
  publishItem1Description: '',
  publishItem2Title: '',
  publishItem2Description: '',
  publishItem3Title: '',
  publishItem3Description: '',
  publishItem4Title: '',
  publishItem4Description: '',
  perspectiveTitle: 'Perspective',
  perspectiveCard1Title: '',
  perspectiveCard1Content: '',
  perspectiveCard2Title: '',
  perspectiveCard2Content: '',
  perspectiveCard3Title: '',
  perspectiveCard3Content: '',
  editorialBackgroundTitle: 'Editorial Background',
  editorialBackgroundContent: '',
}

const getSection = (sections: AboutSectionRecord[] | null, key: AboutSectionKey) =>
  sections?.find((section) => section.sectionKey === key)

const parseParagraphs = (value: string) =>
  value
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean)

const joinParagraphs = (value: string[] | undefined) => value?.join('\n\n') ?? ''

const parseTags = (value: string) =>
  value
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean)

const joinTags = (value: string[] | undefined) => value?.join('\n') ?? ''

export function toAboutPageFormValues(sections: AboutSectionRecord[] | null): AboutPageFormValues {
  if (!sections?.length) return DEFAULT_VALUES

  const aboutBody = (getSection(sections, AboutSectionKey.ABOUT_US)?.body ?? {}) as AboutUsBody
  const missionBody = (getSection(sections, AboutSectionKey.MISSION)?.body ?? {}) as MissionBody
  const publishBody = (getSection(sections, AboutSectionKey.WHAT_WE_PUBLISH)?.body ??
    {}) as WhatWePublishBody
  const perspectiveBody = (getSection(sections, AboutSectionKey.PERSPECTIVE)?.body ??
    {}) as PerspectiveBody
  const editorialBody = (getSection(sections, AboutSectionKey.EDITORIAL_BACKGROUND)?.body ??
    {}) as EditorialBackgroundBody

  const publishItems = publishBody.items ?? []
  const perspectiveCards = perspectiveBody.cards ?? []

  return {
    aboutTitle: getSection(sections, AboutSectionKey.ABOUT_US)?.title ?? DEFAULT_VALUES.aboutTitle,
    aboutContent: aboutBody.content ?? '',
    aboutTags: joinTags(aboutBody.tags),
    missionTitle:
      getSection(sections, AboutSectionKey.MISSION)?.title ?? DEFAULT_VALUES.missionTitle,
    missionContent: missionBody.content ?? '',
    missionQuote: missionBody.quote ?? '',
    publishTitle:
      getSection(sections, AboutSectionKey.WHAT_WE_PUBLISH)?.title ?? DEFAULT_VALUES.publishTitle,
    publishIntro: joinParagraphs(publishBody.intro),
    publishOutro: publishBody.outro ?? '',
    publishCtaHref: publishBody.ctaHref ?? DEFAULT_VALUES.publishCtaHref,
    publishItem1Title: publishItems[0]?.title ?? '',
    publishItem1Description: publishItems[0]?.description ?? '',
    publishItem2Title: publishItems[1]?.title ?? '',
    publishItem2Description: publishItems[1]?.description ?? '',
    publishItem3Title: publishItems[2]?.title ?? '',
    publishItem3Description: publishItems[2]?.description ?? '',
    publishItem4Title: publishItems[3]?.title ?? '',
    publishItem4Description: publishItems[3]?.description ?? '',
    perspectiveTitle:
      getSection(sections, AboutSectionKey.PERSPECTIVE)?.title ?? DEFAULT_VALUES.perspectiveTitle,
    perspectiveCard1Title: perspectiveCards[0]?.title ?? '',
    perspectiveCard1Content: perspectiveCards[0]?.content ?? '',
    perspectiveCard2Title: perspectiveCards[1]?.title ?? '',
    perspectiveCard2Content: perspectiveCards[1]?.content ?? '',
    perspectiveCard3Title: perspectiveCards[2]?.title ?? '',
    perspectiveCard3Content: perspectiveCards[2]?.content ?? '',
    editorialBackgroundTitle:
      getSection(sections, AboutSectionKey.EDITORIAL_BACKGROUND)?.title ??
      DEFAULT_VALUES.editorialBackgroundTitle,
    editorialBackgroundContent: editorialBody.content ?? '',
  }
}

export function buildAboutPageSections(input: AboutPageInput) {
  const publishItems = [
    {
      title: input.publishItem1Title,
      description: input.publishItem1Description,
    },
    {
      title: input.publishItem2Title,
      description: input.publishItem2Description,
    },
    {
      title: input.publishItem3Title,
      description: input.publishItem3Description,
    },
    {
      title: input.publishItem4Title,
      description: input.publishItem4Description,
    },
  ].map((item) => publishItemSchema.parse(item))

  const perspectiveCards = [
    {
      title: input.perspectiveCard1Title,
      content: input.perspectiveCard1Content,
    },
    {
      title: input.perspectiveCard2Title,
      content: input.perspectiveCard2Content,
    },
    {
      title: input.perspectiveCard3Title,
      content: input.perspectiveCard3Content,
    },
  ].map((card) => perspectiveCardSchema.parse(card))

  return [
    {
      sectionKey: AboutSectionKey.ABOUT_US,
      title: input.aboutTitle,
      sortOrder: 1,
      body: {
        content: input.aboutContent,
        tags: parseTags(input.aboutTags),
      } satisfies Prisma.InputJsonValue,
    },
    {
      sectionKey: AboutSectionKey.MISSION,
      title: input.missionTitle,
      sortOrder: 2,
      body: {
        content: input.missionContent,
        quote: input.missionQuote,
      } satisfies Prisma.InputJsonValue,
    },
    {
      sectionKey: AboutSectionKey.WHAT_WE_PUBLISH,
      title: input.publishTitle,
      sortOrder: 3,
      body: {
        intro: parseParagraphs(input.publishIntro),
        items: publishItems,
        outro: input.publishOutro,
        ctaHref: input.publishCtaHref,
      } satisfies Prisma.InputJsonValue,
    },
    {
      sectionKey: AboutSectionKey.PERSPECTIVE,
      title: input.perspectiveTitle,
      sortOrder: 4,
      body: {
        cards: perspectiveCards,
      } satisfies Prisma.InputJsonValue,
    },
    {
      sectionKey: AboutSectionKey.EDITORIAL_BACKGROUND,
      title: input.editorialBackgroundTitle,
      sortOrder: 5,
      body: {
        content: input.editorialBackgroundContent,
      } satisfies Prisma.InputJsonValue,
    },
  ]
}
