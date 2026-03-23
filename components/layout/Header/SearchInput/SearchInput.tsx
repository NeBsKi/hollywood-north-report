import { Search } from '@/components/ui/icons'

export const SearchInput = () => {
  return (
    <form className="relative h-10 w-45">
      <button
        type="submit"
        className="absolute top-[50%] left-3 z-10 -translate-y-1/2 cursor-pointer"
      >
        <Search className="text-white-600 xl:text-white-700 h-5 w-5" />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="bg-accent-500/60 text-white-700 brandon-body-small xl:bg-white-500/10 xl:text-white-800 absolute top-0 left-0 h-full w-full rounded-lg py-2 pr-3 pl-10"
      />
    </form>
  )
}
