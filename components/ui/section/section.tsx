import { cn } from '@/lib/utils'
import type { SectionProps } from './section.types'
import { ViewMoreBtn, Title } from './_components'

export const Section = ({
  title,
  children,
  className,
  viewMoreButton,
  boxed = false,
  hasBackground = true,
}: SectionProps) => {
  return (
    <section
      className={cn('bg-transparent py-12 md:py-20', className, {
        'pb-0 md:pb-0': viewMoreButton,
        'md:py-14': boxed,
        'bg-background-dark': hasBackground,
      })}
    >
      {title && (
        <Title boxed={boxed}>
          {!boxed && <div className="bg-accent-500/10 h-px w-full" />}
          <h2 className="font-lora text-accent-500 shrink-0 text-xl/7 font-medium md:text-[28px]/[40px]">
            {title}
          </h2>
          <div className="bg-accent-500/10 h-px w-full" />
        </Title>
      )}
      <div className="container">{children}</div>
      {viewMoreButton && (
        <div
          className={cn('mt-10 md:mt-16 lg:mt-20 xl:mt-26', {
            'xl:mt-8': boxed,
          })}
        >
          <ViewMoreBtn />
        </div>
      )}
    </section>
  )
}
