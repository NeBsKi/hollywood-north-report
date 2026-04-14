import Link from 'next/link'
import { ArrowRight } from '@/components/icons'
import { viewMoreBtnVariants } from './view-more-btn.styles'

export const ViewMoreBtn = () => {
  const { container, link, circle } = viewMoreBtnVariants.slots

  return (
    <div className={container.base}>
      <Link href="/" className={link.base}>
        <span>View More</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
      <div className={circle.base} />
    </div>
  )
}
