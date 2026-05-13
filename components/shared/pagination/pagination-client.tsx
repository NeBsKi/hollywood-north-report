'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { Pagination } from './pagination'
import type { PaginationProps } from './pagination.types'

type PaginationClientProps = Omit<PaginationProps, 'onChange' | 'currentPage'> & {
  pageParam?: string
}

export const PaginationClient = ({
  total,
  pageSize,
  pageParam = 'page',
  ...rest
}: PaginationClientProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const parsedPage = Number(searchParams.get(pageParam) ?? '1')
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

  const handleChange = (page: number) => {
    const sp = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      sp.delete(pageParam)
    } else {
      sp.set(pageParam, String(page))
    }
    const query = sp.toString()
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname)
    })
  }

  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      currentPage={currentPage}
      onChange={handleChange}
      {...rest}
    />
  )
}
