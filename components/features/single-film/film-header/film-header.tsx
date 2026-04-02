export const FilmHeader = () => {
  return (
    <div className="bg-background-light rounded-2xl px-4 py-4 drop-shadow-sm md:px-6">
      <div className="text-primary-700 font-brandon border-accent-500/10 border-b pb-2 text-xs/6 font-medium xl:text-base/6">
        Film Review
      </div>
      <h2 className="font-lora text-primary-900 mt-4 text-xl/7 font-medium sm:text-[28px]/[40px] md:mt-6 xl:mt-8">
        Brooklyn’s Finest: Three Clocks, No Clean Way Out
      </h2>
      <div className="text-accent-300 mt-4 flex flex-wrap items-center gap-2 text-xs/6 xl:text-base/6">
        <span>Author: Alison Foreman</span>
        <span className="bg-accent-500/70 inline-block h-0.5 w-0.5 rounded-full" />
        <span>Director: Antoine Fuqua</span>
        <span className="bg-accent-500/70 inline-block h-0.5 w-0.5 rounded-full" />
        <span>March 5, 2010</span>
      </div>
    </div>
  )
}
