'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { MoreHorizontal, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteMediaMenuItem } from './delete-media-button'

export type MediaRow = {
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
  createdAt: Date
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function MediaGrid({
  rows,
  total,
  page,
  pageSize,
}: {
  rows: MediaRow[]
  total: number
  page: number
  pageSize: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const pushParams = (next: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '') sp.delete(k)
      else sp.set(k, v)
    }
    startTransition(() => router.push(`${pathname}?${sp.toString()}`))
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page * pageSize < total

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <Input
          placeholder="Search media…"
          defaultValue={params.get('q') ?? ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              pushParams({
                q: (e.target as HTMLInputElement).value,
                page: '1',
              })
            }
          }}
          className="max-w-sm"
        />
      </div>

      {rows.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-md border text-sm">
          <p className="text-muted-foreground">No media yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {rows.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between py-4">
        <p className="text-muted-foreground text-sm">
          Page {page} of {pageCount} · {total} total
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!canPrev || isPending}
            onClick={() => pushParams({ page: String(page - 1) })}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!canNext || isPending}
            onClick={() => pushParams({ page: String(page + 1) })}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}

function MediaCard({ item }: { item: MediaRow }) {
  const altText = item.alt ?? item.title ?? item.fileName
  const hasDims = !!(item.width && item.height)
  const previewUrl = item.thumbUrl ?? item.cardUrl ?? item.url

  return (
    <div className="group bg-card overflow-hidden rounded-md border">
      <div className="bg-muted relative aspect-video">
        {hasDims ? (
          <Image
            src={previewUrl}
            alt={altText}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            className="object-cover"
            unoptimized={false}
          />
        ) : (
          <Image
            src={previewUrl}
            alt={altText}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            className="object-cover"
            unoptimized
          />
        )}
        <div className="absolute top-1 right-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 opacity-0 shadow group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Open menu"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/admin/media/${item.id}/edit`}>
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteMediaMenuItem id={item.id} fileName={item.fileName} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-2 text-xs">
        <p className="truncate font-medium" title={item.fileName}>
          {item.title || item.fileName}
        </p>
        <p className="text-muted-foreground">
          {hasDims ? `${item.width}×${item.height} · ` : ''}
          {formatSize(item.size)}
        </p>
      </div>
    </div>
  )
}
