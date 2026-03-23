import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = ({ className, loading = 'lazy', priority = 'auto' }: LogoProps) => {
  return (
    <img
      alt="Hollywood North Report Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={cn('w-full', className)}
      src="/logo.svg"
    />
  )
}
