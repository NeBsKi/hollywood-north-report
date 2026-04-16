export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  total: number
  currentPage?: number
  onChange?: (page: number) => void
  siblingCount?: number
}

export interface PaginationItemProps extends Pick<
  PaginationProps,
  'currentPage' | 'onChange' | 'total'
> {
  type?: 'prev' | 'page' | 'next'
  page?: number
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  variant?: 'page' | 'icon'
  children?: React.ReactNode
}
