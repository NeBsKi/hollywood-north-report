'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/lib/posts/posts.constants'
import { PaginationClient } from '../pagination'
import { PostPaginatorProps } from './post-paginator.types'
import { useRouter } from 'next/navigation'

export function PostPaginator({ total, pageSize, page, rows }: PostPaginatorProps) {
  const router = useRouter()

  return (
    <div className="mt-26 flex w-full items-center justify-center sm:justify-between">
      <div className="hidden sm:block">
        <p className="text-white-900 font-brandon text-sm/6">
          Showing {page}-{rows.length} from {total}
        </p>
      </div>
      <PaginationClient total={total} pageSize={pageSize} />
      <div className="hidden items-center justify-end gap-2 sm:flex">
        <Select
          defaultValue={pageSize.toString() || DEFAULT_PAGE_SIZE.toString()}
          onValueChange={(value) => {
            router.push(`?page=1&pageSize=${value}`, { scroll: false })
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-white-900 font-brandon text-sm/6">Items per page</span>
      </div>
    </div>
  )
}
