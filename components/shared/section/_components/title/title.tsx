import { cn } from '@/lib/utils'

export const Title = ({
  children,
  boxed = false,
}: {
  children: React.ReactNode
  boxed?: boolean
}) => {
  return (
    <div
      className={cn(
        'mb-10 flex items-center justify-between gap-6 sm:mb-16 xl:mb-20',
        boxed && 'container xl:mb-10',
      )}
    >
      {children}
    </div>
  )
}
