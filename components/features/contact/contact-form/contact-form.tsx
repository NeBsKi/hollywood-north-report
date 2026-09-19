'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import {
  submitContactMessageAction,
  type ContactFormActionState,
} from '@/app/(frontend)/contact/_lib/actions'
import { contactFormVariants } from './contact-form.styles'

function ContactSubmitButton({ className }: { className: string }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  )
}

export const ContactForm = () => {
  const { input, textarea, button, inputsWrapper, form } = contactFormVariants()
  const [state, formAction] = useActionState<ContactFormActionState, FormData>(
    submitContactMessageAction,
    {},
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.formError) toast.error(state.formError)
    if (state.successMessage) {
      toast.success(state.successMessage)
      formRef.current?.reset()
    }
  }, [state.formError, state.successMessage])

  const fieldError = (name: string) => state.fieldErrors?.[name]?.[0]

  return (
    <form ref={formRef} action={formAction} className={form()}>
      <div className={inputsWrapper()}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={input()}
            aria-invalid={!!fieldError('name')}
          />
          {fieldError('name') && (
            <p className="text-destructive mt-1 text-sm">{fieldError('name')}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={input()}
            aria-invalid={!!fieldError('email')}
          />
          {fieldError('email') && (
            <p className="text-destructive mt-1 text-sm">{fieldError('email')}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject (optional)"
            className={input()}
            aria-invalid={!!fieldError('subject')}
          />
          {fieldError('subject') && (
            <p className="text-destructive mt-1 text-sm">{fieldError('subject')}</p>
          )}
        </div>
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message"
            className={textarea()}
            aria-invalid={!!fieldError('message')}
          />
          {fieldError('message') && (
            <p className="text-destructive mt-1 text-sm">{fieldError('message')}</p>
          )}
        </div>
      </div>
      <div>
        <ContactSubmitButton className={button()} />
      </div>
    </form>
  )
}
