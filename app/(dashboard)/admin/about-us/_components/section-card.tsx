import { ChevronRightIcon } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function SectionCard({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string
  description: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        'bg-card text-card-foreground ring-foreground/10 flex flex-col gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1',
        '[&[open]_summary_svg]:rotate-90 [&[open]_summary_svg]:transition-transform [&[open]_summary_svg]:duration-200',
      )}
    >
      <summary
        className={cn('block cursor-pointer list-none px-4 [&::-webkit-details-marker]:hidden')}
      >
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <ChevronRightIcon
            aria-hidden
            className="text-muted-foreground mt-1 shrink-0 transition-transform duration-200"
          />
        </div>
      </summary>
      <div className="border-foreground/10 space-y-4 border-t px-4 pt-4">{children}</div>
    </details>
  )
}
