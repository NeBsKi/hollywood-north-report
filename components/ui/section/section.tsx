import { cn } from '@/lib/utils'
import type { SectionProps } from './section.types'
import { ViewMoreBtn } from './_components/view-more-btn'

export const Section = ({ title, children, className, viewMoreButton }: SectionProps) => {
  return (
    <section
      className={cn('bg-background-dark py-12 md:py-20', className, {
        'pb-0 md:pb-0': viewMoreButton,
      })}
    >
      {title && (
        <h2 className="font-lora text-accent-500 mb-10 flex w-full items-center justify-between gap-4 text-xl/7 font-medium sm:mb-16 md:text-[28px]/[40px] xl:mb-20">
          <div className="bg-accent-500/10 h-0.5 w-full" />
          <span className="shrink-0">{title}</span>
          <div className="bg-accent-500/10 h-0.5 w-full" />
        </h2>
      )}
      <div className="container">{children}</div>
      {viewMoreButton && <ViewMoreBtn />}
    </section>
  )
}
