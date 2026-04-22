import 'dotenv/config'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { AboutSectionKey, type Prisma } from '@/generated/prisma/client'

const categories = [
  'Awards',
  'Industry',
  'Analysis',
  'Festival',
  'Coverage',
  'Actor',
  'Career',
  'Retrospectives',
  'Director',
  'Studio',
]

const genres = [
  'Action',
  'Adventure',
  'Crime',
  'Drama',
  'Thriller',
  'Mystery',
  'Fantasy',
  'Science',
  'Paid advertising',
]

const years = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]

const festivals = [
  'Cannes',
  'Toronto',
  'International Film Festival (TIFF)',
  'Venice Berlin (Berlin-ale)',
  'Sundance',
  'Telluride',
  'New York',
  'Festival Locarno Tribes',
]

const aboutPageSections: Array<{
  sectionKey: AboutSectionKey
  title: string
  sortOrder: number
  body: Prisma.InputJsonValue
}> = [
  {
    sectionKey: AboutSectionKey.ABOUT_US,
    title: 'About Us',
    sortOrder: 1,
    body: {
      content: `<p>Hollywood North Report is an independent film journal focused on long-form criticism, perspective, and the cultural context surrounding cinema.</p>
<p>Based in Vancouver, a city widely known as "Hollywood North," the publication looks at cinema both inside and outside the industry. Vancouver sits at a unique intersection of global filmmaking: a hub for Hollywood studios, a host city for major festivals, and a gateway to international cinema.</p>
<p>Hollywood North Report uses that vantage point to write about films as complete works shaped by performance, direction, historical moment, and the evolving careers of the people who make them.</p>
<p>Rather than chasing release-week reactions or algorithm-driven rankings, the publication focuses on more deliberate criticism. Films are examined with distance, context, and curiosity, often years after their release, to understand how they actually hold up.</p>
<p>In short, Hollywood North Report treats cinema as a cultural record rather than disposable content.</p>`,
      tags: ['Independent', 'Editorial', 'Festival-focused'],
    },
  },
  {
    sectionKey: AboutSectionKey.MISSION,
    title: 'Mission',
    sortOrder: 2,
    body: {
      content: `<p>Hollywood North Report exists to document cinema with patience and context rather than speed.</p>
<p>The publication approaches film as a cultural artifact shaped by its era, the people involved, and the broader movements within the industry.</p>
<p>The goal is not to chase headlines or quick reactions. Instead, the focus is on thoughtful long-form criticism that looks at how films age, how performances evolve over time, and how certain movies gain new meaning years after their release.</p>
<p>Reviews are written independently, without studio sponsorship or paid promotion. Perspective and editorial judgment take priority over algorithms and trending topics.</p>`,
      quote: 'This is not a ratings farm. It is a film journal.',
    },
  },
  {
    sectionKey: AboutSectionKey.WHAT_WE_PUBLISH,
    title: 'What We Publish',
    sortOrder: 3,
    body: {
      intro: [
        'Hollywood North Report publishes long-form writing about film, performance, and the industry surrounding them.',
        'Most articles fall into four categories:',
      ],
      items: [
        {
          title: 'Long-form film criticism and analysis',
          description:
            'Detailed reviews examining performances, direction, themes, and cultural context rather than simply assigning scores.',
        },
        {
          title: 'Critical essays',
          description:
            'Pieces exploring how films reflect their time, how certain actors defined particular eras, and how styles evolve across decades.',
        },
        {
          title: 'Festival and industry coverage',
          description:
            'Observations from major film festivals and developments affecting the international film industry.',
        },
        {
          title: 'Retrospective analysis',
          description:
            'Looking back at influential films, movements, and overlooked performances with the benefit of distance.',
        },
      ],
      outro:
        'The goal is to treat cinema as a living cultural record rather than disposable weekly content.',
      ctaHref: '/what-we-publish',
    },
  },
  {
    sectionKey: AboutSectionKey.PERSPECTIVE,
    title: 'Perspective',
    sortOrder: 4,
    body: {
      cards: [
        {
          title: 'Editorial independence',
          content:
            "Hollywood North Report operates without studio sponsorships or paid placements. All writing reflects the author's independent perspective.",
        },
        {
          title: 'Long-form criticism',
          content:
            "Articles emphasize depth and context over quick takes. Many reviews examine a film within the arc of an actor's career or the tradition of the genre it belongs to.",
        },
        {
          title: 'International cinema focus',
          content:
            'While based in Vancouver, the publication highlights films and performances from across the industry, with attention to festival cinema and character-driven storytelling.',
        },
      ],
    },
  },
  {
    sectionKey: AboutSectionKey.EDITORIAL_BACKGROUND,
    title: 'Editorial Background',
    sortOrder: 5,
    body: {
      content: `<p>Hollywood North Report began as a personal archive of film writing, a way to document films not just as entertainment, but as reflections of their moment, their creators, and the audiences who experience them.</p>
<p>Over time it developed into a broader editorial platform focused on thoughtful film analysis and commentary.</p>
<p>The publication now covers both contemporary releases and older films whose themes, performances, and historical context deserve deeper examination.</p>
<p>Operating independently allows Hollywood North Report to remain slow, deliberate, and perspective-driven, prioritizing clarity, context, and genuine enthusiasm for cinema rather than the speed of the news cycle.</p>
<p>The result is a publication that treats film not as disposable media, but as part of a much larger conversation about culture, performance, and storytelling.</p>`,
    },
  },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME ?? 'Admin'

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the first admin.')
  }

  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'ADMIN' },
      })
      console.log(`Promoted existing user ${email} to ADMIN.`)
    } else {
      console.log(`User ${email} is already ADMIN. Nothing to do.`)
    }
    return
  }

  await auth.api.signUpEmail({
    body: { email, password, name },
    headers: new Headers(),
  })

  await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  })

  console.log(`Created admin user ${email}.`)
}

async function seedTaxonomies() {
  await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { name, slug: slugify(name) },
      }),
    ),
  )

  await Promise.all(
    genres.map((name) =>
      prisma.genre.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { name, slug: slugify(name) },
      }),
    ),
  )

  await Promise.all(
    festivals.map((name) =>
      prisma.festival.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { name, slug: slugify(name) },
      }),
    ),
  )

  await Promise.all(
    years.map((value) =>
      prisma.year.upsert({
        where: { value },
        update: {},
        create: { value },
      }),
    ),
  )

  console.log(
    `Seeded ${categories.length} categories, ${genres.length} genres, ${festivals.length} festivals, and ${years.length} years.`,
  )
}

async function seedAboutPage() {
  await Promise.all(
    aboutPageSections.map(({ sectionKey, title, sortOrder, body }) =>
      prisma.aboutPageSection.upsert({
        where: { sectionKey },
        update: {
          title,
          body,
          sortOrder,
          isPublished: true,
        },
        create: {
          sectionKey,
          title,
          body,
          sortOrder,
          isPublished: true,
        },
      }),
    ),
  )

  console.log(`Seeded About Us sections (${aboutPageSections.length} rows).`)
}

async function main() {
  await ensureAdmin()
  await seedTaxonomies()
  await seedAboutPage()
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
