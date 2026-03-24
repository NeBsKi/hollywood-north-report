import { tv } from 'tailwind-variants'

export const searchInputVariants = tv({
  slots: {
    input:
      'bg-accent-500/60 w-full text-white-700 brandon-body-small xl:bg-white-500/10 xl:text-white-800 absolute top-0 left-0 h-full rounded-lg py-2 pr-3 pl-10 drop-shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)]',
    form: 'relative h-10 w-45',
    button: 'absolute top-[50%] left-3 z-10 -translate-y-1/2 cursor-pointer',
  },
  variants: {
    isMobile: {
      true: {
        form: 'w-full h-11',
        input: 'border border-[#F0EEEB] bg-[#FAF9F7] text-[#DFDFDF]',
      },
    },
  },
  defaultVariants: {
    isMobile: false,
  },
})
