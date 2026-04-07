'use client'

import { contactFormVariants } from './contact-form.styles'

export const ContactForm = () => {
  const { input, textarea, button, inputsWrapper, form } = contactFormVariants()

  return (
    <form className={form()}>
      <div className={inputsWrapper()}>
        <div>
          <input type="text" name="name" placeholder="Name" className={input()} />
        </div>
        <div>
          <input type="text" name="email" placeholder="Email" className={input()} />
        </div>
        <div>
          <textarea name="message" placeholder="Message" className={textarea()} />
        </div>
      </div>
      <div>
        <button type="submit" className={button()}>
          Send Message
        </button>
      </div>
    </form>
  )
}
