import { useMemo } from 'react'

const DOTS = '...'
const FIRST_PAGE_INDEX = 1

const getRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

interface usePaginationProps {
  total: number
  currentPage: number
  siblingCount: number
}

export const usePagination = ({ total, currentPage = 1, siblingCount = 1 }: usePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageNumber = siblingCount + 5

    if (totalPageNumber >= total) {
      return getRange(1, total)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, total)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < total - 2

    const lastPageIndex = total

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(currentPage - siblingCount, currentPage + siblingCount)
      return [FIRST_PAGE_INDEX, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    if (shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = getRange(1, leftItemCount)

      return [...leftRange, DOTS, total]
    }

    if (shouldShowLeftDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = getRange(total - rightItemCount + 1, total)
      return [FIRST_PAGE_INDEX, DOTS, ...rightRange]
    }
  }, [total, currentPage, siblingCount])

  return paginationRange || []
}
