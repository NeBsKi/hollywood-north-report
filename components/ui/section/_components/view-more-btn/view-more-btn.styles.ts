export const viewMoreBtnVariants = {
  slots: {
    container: {
      base: 'group bg-primary-600 relative mt-10 sm:mt-16 lg:mt-20 xl:mt-26 h-[4.375rem] md:h-[8.375rem] w-full overflow-hidden transition-[clip-path] duration-500 [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)] md:[clip-path:polygon(0_80%,100%_0,100%_100%,0_100%)]',
    },
    link: {
      base: 'font-lora text-white-500 group-hover:text-primary-900 absolute bottom-2 md:bottom-6 left-1/2 z-2 flex -translate-x-1/2 items-center gap-1 text-sm/6 md:text-base/6 font-medium transition-colors duration-500',
    },
    circle: {
      base: 'hidden md:block bg-secondary-400 absolute top-13.75 left-0 z-1 h-186.5 w-186.5 -translate-x-1/2 rounded-full opacity-0 transition-all duration-500 group-focus-within:left-1/2 group-focus-within:-translate-y-[60%] group-focus-within:opacity-100 group-hover:left-1/2 group-hover:translate-y-0 group-hover:opacity-100',
    },
  },
}
