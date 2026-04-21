import 'dotenv/config'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

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

async function main() {
  await ensureAdmin()
  await seedTaxonomies()
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
