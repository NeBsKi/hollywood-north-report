'use client'

import { useState } from 'react'

import { Pagination } from './pagination'
import type { PaginationProps } from './pagination.types'

type PaginationClientProps = Omit<PaginationProps, 'onChange' | 'currentPage'> & {
  initialPage?: number
}

export const PaginationClient = ({ initialPage = 1, ...rest }: PaginationClientProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  return <Pagination currentPage={currentPage} onChange={setCurrentPage} {...rest} />
}
