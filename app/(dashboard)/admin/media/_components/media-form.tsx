'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateMediaAction, type MediaActionState } from '../_lib/actions'
import { DeleteMediaInlineButton } from './delete-media-button'

type MediaInitial = {
  id: string
  url: string
  thumbUrl: string | null
  cardUrl: string | null
  contentUrl: string | null
  fileName: string
  contentType: string
  size: number
  width: number | null
  height: number | null
  alt: string | null
  title: string | null
  caption: string | null
  createdAt: Date
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function MediaForm({ media }: { media: MediaInitial }) {
  const [state, formAction] = useActionState<MediaActionState, FormData>(
    updateMediaAction.bind(null, media.id),
    {},
  )

  const altText = media.alt ?? media.title ?? media.fileName
  const hasDims = !!(media.width && media.height)
  const previewUrl = media.cardUrl ?? media.contentUrl ?? media.url

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="space-y-3">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-md border">
          <Image
            src={previewUrl}
            alt={altText}
            fill
            sizes="280px"
            className="object-cover"
            unoptimized={!hasDims}
          />
        </div>
        <dl className="text-muted-foreground space-y-1 text-xs">
          <div className="flex justify-between gap-2">
            <dt>File</dt>
            <dd
              className="text-foreground max-w-[180px] truncate"
              title={media.fileName}
            >
              {media.fileName}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Type</dt>
            <dd className="text-foreground">{media.contentType}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Size</dt>
            <dd className="text-foreground">{formatSize(media.size)}</dd>
          </div>
          {hasDims && (
            <div className="flex justify-between gap-2">
              <dt>Dimensions</dt>
              <dd className="text-foreground">
                {media.width}×{media.height}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <dt>URL</dt>
            <dd>
              <a
                href={media.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-foreground underline-offset-2 hover:underline"
              >
                Open original
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <form action={formAction} className="max-w-xl space-y-6">
        <Field
          label="Alt text"
          name="alt"
          defaultValue={media.alt ?? ''}
          error={state.fieldErrors?.alt?.[0]}
          placeholder="Describe the image for screen readers"
        />
        <Field
          label="Title"
          name="title"
          defaultValue={media.title ?? ''}
          error={state.fieldErrors?.title?.[0]}
          placeholder="Optional title shown when used in posts"
        />
        <TextareaField
          label="Caption"
          name="caption"
          defaultValue={media.caption ?? ''}
          error={state.fieldErrors?.caption?.[0]}
          placeholder="Optional caption rendered under the image"
        />

        {state.formError && (
          <p className="text-destructive text-sm">{state.formError}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SubmitButton>Save changes</SubmitButton>
            <Button asChild variant="ghost">
              <Link href="/admin/media">Cancel</Link>
            </Button>
          </div>
          <DeleteMediaInlineButton id={media.id} fileName={media.fileName} />
        </div>
      </form>
    </div>
  )
}

type FieldProps = {
  label: string
  name: string
  defaultValue?: string
  error?: string
} & React.ComponentProps<typeof Input>

function Field({ label, name, defaultValue, error, ...rest }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

type TextareaProps = {
  label: string
  name: string
  defaultValue?: string
  error?: string
} & React.ComponentProps<typeof Textarea>

function TextareaField({
  label,
  name,
  defaultValue,
  error,
  ...rest
}: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>{pending ? 'Saving…' : children}</Button>
}
