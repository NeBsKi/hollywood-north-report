import { Section } from '@/components/shared/section'
import { Skeleton } from '@/components/ui/skeleton'

export default function IndustriesAwardsLoading() {
  return (
    <Section title="Film Reviews">
      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
        <div className="hidden sm:block" />
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="bg-accent-500/5 h-10 w-32" />
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 lg:gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Skeleton className="bg-accent-500/5 aspect-4/3 w-full" />
            <Skeleton className="bg-accent-500/5 h-4 w-24" />
            <Skeleton className="bg-accent-500/5 h-6 w-full" />
            <Skeleton className="bg-accent-500/5 h-4 w-32" />
          </div>
        ))}
      </div>
    </Section>
  )
}
