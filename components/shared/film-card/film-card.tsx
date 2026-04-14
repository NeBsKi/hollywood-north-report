import Image from 'next/image'
import * as motion from 'motion/react-client'
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
    <motion.div
      className={containerClass()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {imageUrl && (
        <motion.div
          className={cn(imageWrapperClass(), imageWrapperClassName)}
          initial={{ filter: 'blur(10px)' }}
          whileInView={{ filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image alt={title} src={imageUrl} fill className="object-cover" />
        </motion.div>
      )}
      <div className={cn(contentClass(), contentClassName)}>
        {numericId && <span className={numericIdClass()}>{numericId}.</span>}
        {category && <p className={categoryClass()}>{category}</p>}
        <p className={titleClass()}>{title}</p>
        {description && <p className={descriptionClass()}>{description}</p>}
        <p className={authorClass()}>By {author}</p>
      </div>
    </motion.div>
  )
}
