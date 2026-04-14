import { ChevronRight } from '@/components/icons'
import type { PaginationItemProps } from '../pagination.types'
import { Button } from './button'

export const PaginationItem = ({
  type = 'page',
  page = 1,
  currentPage = 1,
  onChange,
  total,
}: PaginationItemProps) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === total
  const isPrevButton = type === 'prev'
  const disabled = isPrevButton ? isFirstPage : isLastPage
  const navLabel = isPrevButton ? 'go to previous page' : 'go to next page'

  if (type === 'page') {
    const selected = page === currentPage
    return (
      <li key={page}>
        <Button
          selected={selected}
          onClick={() => onChange?.(page)}
          type="button"
          aria-label={`go to page ${page}`}
          aria-current="page"
          tabIndex={0}
        >
          {page}
        </Button>
      </li>
    )
  }

  return (
    <Button
      onClick={() => onChange?.(isPrevButton ? currentPage - 1 : currentPage + 1)}
      disabled={disabled}
      variant="icon"
      type="button"
      aria-label={navLabel}
      tabIndex={disabled ? -1 : 0}
    >
      {isPrevButton ? (
        <ChevronRight className="size-4 rotate-180" />
      ) : (
        <ChevronRight className="size-4" />
      )}
    </Button>
  )
}
