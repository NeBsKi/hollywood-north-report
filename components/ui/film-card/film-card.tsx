import Image from 'next/image'
import { cn } from '@/lib/utils'

import { FilmCardProps } from './film-card.types'
import { filmCardVariants } from './film-card.styles'

export const FilmCard = ({
  title,
  author,
  category,
  description,
  imageUrl,
  imageWrapperClassName,
  contentAlignment = 'left',
  contentSize = 'large',
  contentClassName,
  hasBackground = false,
  orientation = 'horizontal',
  numericId,
  numericIdSize,
}: FilmCardProps) => {
  const {
    container: containerClass,
    imageWrapper: imageWrapperClass,
    content: contentClass,
    category: categoryClass,
    title: titleClass,
    description: descriptionClass,
    author: authorClass,
    numericId: numericIdClass,
  } = filmCardVariants({
    contentAlignment,
    hasBackground,
    orientation,
    numericIdSize,
    contentSize,
  })

  return (
    <div className={containerClass()}>
      {imageUrl && (
        <div className={cn(imageWrapperClass(), imageWrapperClassName)}>
          <Image alt={title} src={imageUrl} fill className="object-cover" />
        </div>
      )}
      <div className={cn(contentClass(), contentClassName)}>
        {numericId && <span className={numericIdClass()}>{numericId}.</span>}
        {category && <p className={categoryClass()}>{category}</p>}
        <p className={titleClass()}>{title}</p>
        {description && <p className={descriptionClass()}>{description}</p>}
        <p className={authorClass()}>By {author}</p>
      </div>
    </div>
  )
}
