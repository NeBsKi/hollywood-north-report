import { MultiSelectField } from '@/components/select-field/multi-select-field'
import type { PostFormProps } from '../_lib/types'

export function PostFilters({ filters, post }: PostFormProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MultiSelectField
        id="categoryIds"
        name="categoryIds"
        label="Categories"
        options={filters.categories}
        defaultValues={post?.categoryIds}
      />
      <MultiSelectField
        id="genreIds"
        name="genreIds"
        label="Genres"
        options={filters.genres}
        defaultValues={post?.genreIds}
      />
      <MultiSelectField
        id="festivalIds"
        name="festivalIds"
        label="Festivals"
        options={filters.festivals}
        defaultValues={post?.festivalIds}
      />
      <MultiSelectField
        id="yearIds"
        name="yearIds"
        label="Years"
        options={filters.years}
        defaultValues={post?.yearIds}
      />
    </div>
  )
}
