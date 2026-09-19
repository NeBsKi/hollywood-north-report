'use server'

import { z } from 'zod'

import { sendContactEmail } from './email'
import { contactFormSchema } from './schemas'

export type ContactFormActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
  successMessage?: string
}

const parseContactFormData = (formData: FormData) =>
  contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    website: formData.get('website'),
  })

export async function submitContactMessageAction(
  _prevState: ContactFormActionState,
  formData: FormData,
): Promise<ContactFormActionState> {
  const parsed = parseContactFormData(formData)

  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      formError: 'Please fix the highlighted fields and try again.',
    }
  }

  try {
    await sendContactEmail(parsed.data)
  } catch (error) {
    console.error('Failed to send contact message via Resend:', error)
    return {
      formError: 'Sorry, we could not send your message right now. Please try again in a moment.',
    }
  }

  return {
    successMessage: 'Message sent successfully. We will get back to you soon.',
  }
}
