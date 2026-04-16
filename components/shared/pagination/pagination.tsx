'use client'

import { cn } from '@/lib/utils'

import { PaginationItem } from './_components'
import { usePagination } from './hooks/usePagination'
import type { PaginationProps } from './pagination.types'

export const Pagination = ({
  total = 99,
  currentPage = 1,
  onChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) => {
  const pages = usePagination({
    total,
    currentPage,
    siblingCount,
  })

  const paginationItemProps = {
    currentPage,
    onChange,
    total,
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination navigation"
      className={cn('flex items-center justify-between gap-2 sm:gap-6', className)}
      {...rest}
    >
      <PaginationItem type="prev" {...paginationItemProps} />
      <ul className="flex items-center gap-2">
        {pages.map((page, index) => {
          return typeof page !== 'number' ? (
            <li
              key={`dots-${index}`}
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center"
            >
              <span>...</span>
            </li>
          ) : (
            <PaginationItem type="page" page={page} key={page} {...paginationItemProps} />
          )
        })}
      </ul>
      <PaginationItem type="next" {...paginationItemProps} />
    </nav>
  )
}
