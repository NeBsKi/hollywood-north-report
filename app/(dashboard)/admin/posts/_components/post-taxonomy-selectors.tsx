import 'server-only'

import prisma from '@/lib/prisma'
import { MultiSelectField } from '@/components/select-field/multi-select-field'

export async function PostTaxonomySelectors() {
  const [categories, genres, festivals, years] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.genre.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.festival.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.year.findMany({
      select: { id: true, value: true },
      orderBy: { value: 'desc' },
    }),
  ])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MultiSelectField
        id="categoryIds"
        name="categoryIds"
        label="Categories"
        options={categories.map((category) => ({ value: category.id, label: category.name }))}
      />
      <MultiSelectField
        id="genreIds"
        name="genreIds"
        label="Genres"
        options={genres.map((genre) => ({ value: genre.id, label: genre.name }))}
      />
      <MultiSelectField
        id="festivalIds"
        name="festivalIds"
        label="Festivals"
        options={festivals.map((festival) => ({ value: festival.id, label: festival.name }))}
      />
      <MultiSelectField
        id="yearIds"
        name="yearIds"
        label="Years"
        options={years.map((year) => ({ value: year.id, label: String(year.value) }))}
      />
    </div>
  )
}
