import { z } from 'zod'

const emptyToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().email('Enter a valid email address'),
  subject: z.preprocess(emptyToUndefined, z.string().trim().max(160).optional()),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(4000),
  // Hidden field. Bots often fill everything; humans should never touch this.
  website: z.preprocess(emptyToUndefined, z.undefined()),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
