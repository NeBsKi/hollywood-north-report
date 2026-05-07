'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { SingleSelectField } from '@/components/select-field/single-select-field'
import { SubmitButton } from '@/components/submit-button'

import { PostContentEditor } from './post-content-editor'
import { PostCoverImageField } from './post-cover-image-field'
import { createPostAction, PostActionState, updatePostAction } from '../_lib/actions'
import { PostFormProps } from '../_lib/types'
import { PostFilters } from './post-filters'

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
] as const

const statusFieldOptions = statusOptions.map((option) => option)

export function PostForm({ post, filters }: PostFormProps) {
  const action = post ? updatePostAction.bind(null, post.id) : createPostAction

  const [state, formAction] = useActionState<PostActionState, FormData>(action, {})

  return (
    <form action={formAction}>
      <div className="mb-6 flex items-center justify-between rounded-lg border p-4">
        {post ? (
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500">
              Status: <span className="text-black-900 font-medium">{post.status}</span>
            </div>
            <div className="text-xs text-gray-500">
              Created:{' '}
              <span className="text-black-900 font-medium">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Updated:{' '}
              <span className="text-black-900 font-medium">
                {new Date(post.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <h2 className="font-medium">Creating new post</h2>
        )}
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">Cancel</Link>
          <SubmitButton size="lg">Save post</SubmitButton>
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

          <PostFilters filters={filters} post={post} />

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

          <PostCoverImageField defaultValue={post?.coverMedia ?? null} />
        </section>
      </div>
    </form>
  )
}
