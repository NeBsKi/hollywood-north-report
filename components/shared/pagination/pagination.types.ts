export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  total: number
  pageSize: number
  currentPage?: number
  onChange?: (page: number) => void
  siblingCount?: number
}

export interface PaginationItemProps extends Pick<PaginationProps, 'currentPage' | 'onChange'> {
  pageCount: number
  type?: 'prev' | 'page' | 'next'
  page?: number
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  variant?: 'page' | 'icon'
  children?: React.ReactNode
}
