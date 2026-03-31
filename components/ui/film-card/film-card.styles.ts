import { tv } from 'tailwind-variants'

export const filmCardVariants = tv({
  slots: {
    container: 'flex gap-10 w-full',
    imageWrapper: 'relative h-58 rounded-md overflow-hidden',
    content: 'font-brandon relative',
    category: 'text-sm/6 lg:text-base/6 text-primary-700 mb-2 font-medium',
    title:
      'font-lora text-base/6 lg:text-xl/7 mb-2 font-medium text-accent-500 hover:text-primary-700 transition-colors',
    description: 'text-base/6 text-accent-300',
    author: 'text-sm/6 lg:text-base/6 text-accent-500 font-medium uppercase mt-4',
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
        imageWrapper: '',
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
          'flex-col sm:flex-row px-4 py-6 md:p-10 bg-background-light items-center rounded-2xl drop-shadow-[0px_2px_6px_0px_rgba(0,0,0,0.03)]',
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
        numericId: 'text-4xl/10 text-primary-700 font-medium',
      },
    },
    {
      orientation: 'vertical',
      contentSize: 'small',
      class: {
        title: 'text-base/6 lg:text-base/6',
        author: 'text-sm/6 lg:text-sm/6 mt-2',
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
