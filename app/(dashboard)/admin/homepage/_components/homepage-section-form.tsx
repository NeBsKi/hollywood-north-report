'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SubmitButton } from '@/components/submit-button'
import {
  createHomePageSectionAction,
  updateHomePageSectionAction,
  type SectionActionState,
} from '../_lib/actions'
import {
  HOME_LAYOUT_KEY_LIST,
  LAYOUT_HINTS,
  LAYOUT_LABELS,
  type HomePageLayoutKeyValue,
} from '../_lib/types'

const selectClassName =
  'border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm'

export type SectionFormValues = {
  id: string
  title: string
  layoutKey: HomePageLayoutKeyValue
  categoryId: string | null
  postLimit: number | null
  viewMoreHref: string | null
  sortOrder: number
  isPublished: boolean
}

type CategoryOption = { id: string; name: string; slug: string }

interface HomePageSectionFormProps {
  section?: SectionFormValues
  categories: CategoryOption[]
}

export function HomePageSectionForm({ section, categories }: HomePageSectionFormProps) {
  const action = section
    ? updateHomePageSectionAction.bind(null, section.id)
    : createHomePageSectionAction

  const [state, formAction] = useActionState<SectionActionState, FormData>(action, {})
  const fieldError = (name: string) => state.fieldErrors?.[name]?.[0]

  const [layoutKey, setLayoutKey] = useState<HomePageLayoutKeyValue>(
    section?.layoutKey ?? HOME_LAYOUT_KEY_LIST[0]!,
  )
  const [categoryId, setCategoryId] = useState<string>(section?.categoryId ?? '')
  const selectedCategory = categories.find((category) => category.id === categoryId)
  const selectedCategoryHref = selectedCategory ? `/category/${selectedCategory.slug}` : null
  const [useCategoryViewMore, setUseCategoryViewMore] = useState<boolean>(
    Boolean(section?.viewMoreHref && selectedCategoryHref === section.viewMoreHref),
  )

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <Field
        label="Title"
        name="title"
        defaultValue={section?.title}
        error={fieldError('title')}
        autoFocus
      />

      <div className="space-y-1.5">
        <Label htmlFor="layoutKey">Layout</Label>
        <select
          id="layoutKey"
          name="layoutKey"
          className={selectClassName}
          value={layoutKey}
          onChange={(e) => setLayoutKey(e.target.value as HomePageLayoutKeyValue)}
        >
          {HOME_LAYOUT_KEY_LIST.map((key) => (
            <option key={key} value={key}>
              {LAYOUT_LABELS[key]}
            </option>
          ))}
        </select>
        <p className="text-muted-foreground text-sm">{LAYOUT_HINTS[layoutKey]}</p>
        {fieldError('layoutKey') && (
          <p className="text-destructive text-sm">{fieldError('layoutKey')}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          className={selectClassName}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">— None —</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {categoryId === '' && (
          <p className="text-sm text-amber-600 dark:text-amber-500">
            Without a category this section is skipped on the homepage.
          </p>
        )}
        {fieldError('categoryId') && (
          <p className="text-destructive text-sm">{fieldError('categoryId')}</p>
        )}
      </div>

      <Field
        label="Post limit (optional)"
        name="postLimit"
        type="number"
        min={1}
        max={24}
        defaultValue={section?.postLimit ?? undefined}
        error={fieldError('postLimit')}
        placeholder="Leave empty to use the layout default"
      />

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Checkbox
            id="useCategoryViewMore"
            name="useCategoryViewMore"
            checked={useCategoryViewMore}
            onCheckedChange={(checked) => setUseCategoryViewMore(checked === true)}
          />
          <Label htmlFor="useCategoryViewMore">Enable View more button</Label>
        </div>
        {useCategoryViewMore && selectedCategoryHref && (
          <p className="text-muted-foreground text-sm">Target URL: {selectedCategoryHref}</p>
        )}
        {useCategoryViewMore && !selectedCategoryHref && (
          <p className="text-sm text-amber-600 dark:text-amber-500">
            Select a category to generate the View more URL.
          </p>
        )}
        {fieldError('useCategoryViewMore') && (
          <p className="text-destructive text-sm">{fieldError('useCategoryViewMore')}</p>
        )}
      </div>

      <Field
        label="Sort order"
        name="sortOrder"
        type="number"
        min={0}
        defaultValue={section?.sortOrder ?? 0}
        error={fieldError('sortOrder')}
      />

      <div className="flex items-center gap-2">
        <Checkbox
          id="isPublished"
          name="isPublished"
          defaultChecked={section?.isPublished ?? true}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}

      <div className="flex items-center gap-2">
        <SubmitButton>{section ? 'Save changes' : 'Create section'}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href="/admin/homepage">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

type FieldProps = {
  label: string
  name: string
  error?: string
} & React.ComponentProps<typeof Input>

function Field({ label, name, error, ...rest }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} aria-invalid={!!error || undefined} {...rest} />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
