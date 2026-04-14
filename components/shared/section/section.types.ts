type ViewMoreButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export interface SectionProps {
  title?: string
  children: React.ReactNode
  className?: string
  viewMoreButton?: ViewMoreButtonProps
  boxed?: boolean
  hasBackground?: boolean
}
