import { cn } from '@/lib/utils'
import { SearchInput } from '../SearchInput'
import { SearchInputMobileProps } from './SearchInputMobile.types'

export const SearchInputMobile = ({ isOpen }: SearchInputMobileProps) => {
  return (
    <div
      className={cn(
        'bg-background-dark absolute top-full left-0 w-full origin-top px-4 py-2 transition-all duration-300 ease-out',
        isOpen
          ? 'pointer-events-auto visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-25 opacity-0',
      )}
      aria-hidden={!isOpen}
    >
      <SearchInput isMobile />
    </div>
  )
}
