import { tv } from 'tailwind-variants'

export const contactFormVariants = tv({
  slots: {
    input: [
      'border-accent-50 border w-full bg-white-500 rounded-sm h-12 px-4',
      'text-accent-100 placeholder:text-accent-100 font-brandon text-base/6',
    ],
    textarea: [
      'border-accent-50 border w-full bg-white-500 rounded-sm h-27 p-4',
      'text-accent-100 resize-none placeholder:text-accent-100 font-brandon text-base/6',
    ],
    button: [
      'w-full bg-primary-500 text-white-500 rounded-lg h-12 px-4 font-brandon text-base/6 ',
      'hover:bg-primary-400 transition-colors cursor-pointer border border-primary-400',
    ],
    form: 'flex flex-col gap-4',
    inputsWrapper: 'flex flex-col gap-2',
  },
})
