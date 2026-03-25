export interface FilmCardProps {
  title: string
  author: string
  category?: string
  description?: string
  imageUrl?: string
  contentAlignment?: 'left' | 'center'
  contentSize?: 'small' | 'large'
  contentClassName?: string
  hasBackground?: boolean
  orientation?: 'horizontal' | 'vertical'
  numericId?: number
  numericIdSize?: 'small' | 'large'
}
