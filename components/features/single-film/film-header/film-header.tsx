import { FilmHeaderProps } from './film-header.types'

export const FilmHeader = ({ title, author, date, categories }: FilmHeaderProps) => {
  const categoryNames = categories?.map((category) => category.name).join(', ')

  return (
    <div className="bg-background-light rounded-2xl px-4 py-4 drop-shadow-sm md:px-6">
      <div className="text-primary-700 font-brandon border-accent-500/10 border-b pb-2 text-xs/6 font-medium xl:text-base/6">
        {categoryNames}
      </div>
      <h2 className="font-lora text-primary-900 mt-4 text-xl/7 font-medium sm:text-[28px]/[40px] md:mt-6 xl:mt-8">
        {title}
      </h2>
      <div className="text-accent-300 mt-4 flex flex-wrap items-center gap-2 text-xs/6 xl:text-base/6">
        {author && <span>Author: {author}</span>}
        <span className="bg-accent-500/70 inline-block h-0.5 w-0.5 rounded-full" />
        <span>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}
