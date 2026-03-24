import { Search } from '@/components/ui/icons'
import { searchInputVariants } from './SearchInput.styles'
import { SearchInputProps } from './SearchInput.types'

export const SearchInput = ({ isMobile = false }: SearchInputProps) => {
  const {
    input: inputClass,
    form: formClass,
    button: buttonClass,
  } = searchInputVariants({
    isMobile,
  })

  return (
    <form className={formClass()}>
      <button type="submit" className={buttonClass()}>
        <Search className="text-white-600 xl:text-white-700 h-5 w-5" />
      </button>
      <input type="text" placeholder="Search" className={inputClass()} />
    </form>
  )
}
