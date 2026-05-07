'use client'

import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import { searchMediaAction } from '../_lib/actions'
import type { MediaSelection } from '../_lib/types'

const PAGE_SIZE = 12

type Row = MediaSelection & {
  cardUrl: string | null
  width: number | null
  height: number | null
  alt: string | null
  title: string | null
}

export type MediaPickerDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (media: MediaSelection) => void
  title?: string
  description?: string
  emptyMessage?: string
}

export function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
  title = 'Choose image',
  description = 'Pick an image from the media library.',
  emptyMessage = 'No images yet — upload one from the media library.',
}: MediaPickerDialogProps) {
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!open) return
    startTransition(async () => {
      const result = await searchMediaAction({
        page,
        pageSize: PAGE_SIZE,
        sort: 'createdAt:desc',
      })
      setRows(result.rows as Row[])
      setTotal(result.total)
      setHasLoaded(true)
    })
  }, [open, page])

  useEffect(() => {
    if (!open) {
      setPage(1)
      setHasLoaded(false)
    }
  }, [open])

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const canPrev = page > 1
  const canNext = page * PAGE_SIZE < total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="min-h-72">
          {!hasLoaded && isPending ? (
            <div className="flex h-72 items-center justify-center">
              <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : total === 0 ? (
            <div className="flex h-72 items-center justify-center rounded-md border text-sm">
              <p className="text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            <div
              className={cn(
                'grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-3 md:grid-cols-4',
                isPending && 'opacity-60',
              )}
            >
              {rows.map((row) => (
                <PickerCard
                  key={row.id}
                  item={row}
                  onSelect={() => {
                    onSelect({
                      id: row.id,
                      url: row.url,
                      thumbUrl: row.thumbUrl,
                      fileName: row.fileName,
                    })
                    onOpenChange(false)
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {total > 0 ? `Page ${page} of ${pageCount} · ${total} total` : ''}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canPrev || isPending}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canNext || isPending}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PickerCard({ item, onSelect }: { item: Row; onSelect: () => void }) {
  const altText = item.alt ?? item.title ?? item.fileName
  const previewUrl = item.thumbUrl ?? item.cardUrl ?? item.url
  const hasDims = !!(item.width && item.height)

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group bg-card focus-visible:ring-ring overflow-hidden rounded-md border text-left transition hover:shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="bg-muted relative aspect-video">
        <Image
          src={previewUrl}
          alt={altText}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition group-hover:scale-[1.02]"
          unoptimized={!hasDims}
        />
      </div>
      <div className="p-2 text-xs">
        <p className="truncate font-medium" title={item.fileName}>
          {item.title || item.fileName}
        </p>
      </div>
    </button>
  )
}
