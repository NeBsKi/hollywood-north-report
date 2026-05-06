'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { MultiSelectField } from '@/components/select-field/multi-select-field'
import { SingleSelectField } from '@/components/select-field/single-select-field'
import { PostContentEditor } from './post-content-editor'
import { PostCoverImageField } from './post-cover-image-field'
import { createPostAction, PostActionState, updatePostAction } from '../_lib/actions'
import { SubmitButton } from '@/components/submit-button'
import { PostFormProps } from '../_lib/types'
import Link from 'next/link'

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
] as const

const statusFieldOptions = statusOptions.map((option) => option)

export function PostForm({ post, filters }: PostFormProps) {
  console.log(post)
  const action = post ? updatePostAction.bind(null, post.id) : createPostAction

  const [state, formAction] = useActionState<PostActionState, FormData>(action, {})

  return (
    <form action={formAction}>
      <div className="mb-6 flex items-center justify-between rounded-lg border p-4">
        <h2 className="font-medium">Creating new Blog Post</h2>
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">Cancel</Link>
          <SubmitButton size="lg">Publish changes</SubmitButton>
        </div>
      </div>

      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6 rounded-lg border p-4 md:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="gap-1">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input id="title" name="title" placeholder="Post title" defaultValue={post?.title} />
            {state.fieldErrors?.title && (
              <p className="text-red-500">{state.fieldErrors.title.join(', ')}</p>
            )}
          </div>

          <PostContentEditor content={post?.content ?? ''} />

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

          <Separator className="my-8" />

          <div className="space-y-1.5">
            <Label htmlFor="metaTitle">Meta title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              placeholder="Leave empty to use post title"
              defaultValue={post?.metaTitle ?? ''}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="metaDescription">Meta description</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              className="min-h-28"
              placeholder="Short search snippet for this post"
              defaultValue={post?.metaDescription ?? ''}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1.5 rounded-lg border p-4">
            <Label htmlFor="slug" className="gap-1">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input id="slug" name="slug" placeholder="post-slug" defaultValue={post?.slug} />
            {state.fieldErrors?.slug && (
              <p className="text-red-500">{state.fieldErrors.slug.join(', ')}</p>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg border p-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              placeholder="Author name"
              defaultValue={post?.author ?? ''}
            />
          </div>

          <div className="space-y-1.5 rounded-lg border p-4">
            <Label htmlFor="publishDate" className="gap-1">
              Publish date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="publishDate"
              name="publishDate"
              type="date"
              defaultValue={
                post?.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : ''
              }
            />
            {state.fieldErrors?.publishDate && (
              <p className="text-red-500">{state.fieldErrors.publishDate.join(', ')}</p>
            )}
          </div>

          <SingleSelectField
            id="status"
            name="status"
            label="Status"
            options={statusFieldOptions}
            defaultValue={post?.status}
            wrapperClassName="space-y-1.5 rounded-lg border p-4"
          />

          <PostCoverImageField />
        </section>
      </div>
    </form>
  )
}
