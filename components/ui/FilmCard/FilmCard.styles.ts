import { tv } from 'tailwind-variants'

export const filmCardVariants = tv({
  slots: {
    container: 'flex gap-10 w-full',
    imageWrapper: 'relative h-58 w-full rounded-md overflow-hidden',
    content: 'font-brandon relative',
    category: 'text-base/6 text-primary-700 font-medium mb-2',
    title: 'font-lora text-xl/7 mb-2 text-accent-500',
    description: 'text-base/6 text-accent-300',
    author: 'text-base/6 text-accent-500 uppercase mt-4',
    numericId: 'absolute left-0 top-0 font-lora',
  },
  variants: {
    contentAlignment: {
      left: {
        content: 'text-left',
      },
      center: {
        content: 'text-center',
      },
    },
    hasBackground: {
      true: {
        container: '',
      },
    },
    orientation: {
      horizontal: 'flex-col md:flex-row',
      vertical: {
        container: 'flex-col gap-0',
        imageWrapper: 'w-full',
        content: 'w-full p-0',
      },
    },
    numericIdSize: {
      small: {},
      large: {},
    },
    contentSize: {
      small: {},
      large: {},
    },
  },
  compoundVariants: [
    {
      hasBackground: true,
      orientation: 'horizontal',
      class: {
        container:
          'px-4 py-6 md:p-10 bg-background-light items-center rounded-2xl drop-shadow-[0px_18px_40px_0px_rgba(0,0,0,0.02)]',
        imageWrapper: 'w-full md:w-1/2',
      },
    },
    {
      orientation: 'vertical',
      numericIdSize: 'small',
      class: {
        content: 'pl-5',
        numericId: 'text-base/6 text-accent-500',
      },
    },
    {
      orientation: 'vertical',
      numericIdSize: 'large',
      class: {
        content: 'pl-10',
        numericId: 'text-4xl/10 text-primary-700',
      },
    },
    {
      orientation: 'vertical',
      contentSize: 'small',
      class: {
        title: 'text-base/6',
        author: 'text-sm/6 mt-2',
      },
    },
  ],
  defaultVariants: {
    contentAlignment: 'left',
    hasBackground: false,
    orientation: 'horizontal',
    numericIdSize: undefined,
    contentSize: 'large',
  },
})
