import 'server-only'

import type { ContactFormInput } from './schemas'

const RESEND_API_BASE = 'https://api.resend.com'
const BRAND_NAME = 'Hollywood North Report'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const formatSubject = (payload: ContactFormInput) => {
  const subject = payload.subject?.trim()
  if (subject) return `[Contact] ${subject}`
  return `[Contact] New message from ${payload.name.trim()}`
}

const withSenderName = (from: string) => {
  // Preserve explicitly formatted values like "Team <contact@example.com>".
  if (from.includes('<') && from.includes('>')) return from
  return `${BRAND_NAME} <${from}>`
}

export async function sendContactEmail(payload: ContactFormInput) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    throw new Error('RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL must be set.')
  }

  const subject = formatSubject(payload)
  const message = payload.message.trim()
  const name = payload.name.trim()
  const email = payload.email.trim()
  const submittedAt = new Date().toISOString()
  const readableDate = new Date(submittedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const text = [
    `${BRAND_NAME} contact form`,
    '',
    `From: ${name} <${email}>`,
    `Submitted: ${readableDate}`,
    `Subject: ${payload.subject?.trim() || '(No subject provided)'}`,
    '',
    'Message:',
    message,
    '',
    'Reply directly to this email to respond to the sender.',
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827; max-width: 640px; margin: 0 auto;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">New contact form message</h2>
      <p style="margin: 0 0 20px; color: #4b5563;">
        A new message was submitted on the ${escapeHtml(BRAND_NAME)} website.
      </p>

      <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 120px;">From</td>
          <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Submitted</td>
          <td style="padding: 8px 0;">${escapeHtml(readableDate)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Subject</td>
          <td style="padding: 8px 0;">${escapeHtml(payload.subject?.trim() || '(No subject provided)')}</td>
        </tr>
      </table>

      <div style="border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; padding: 16px;">
        <p style="margin: 0 0 8px; font-weight: 600;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>

      <p style="margin: 20px 0 0; color: #6b7280; font-size: 13px;">
        Tip: hit reply to answer ${escapeHtml(name)} directly.
      </p>
    </div>
  `

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: withSenderName(from),
      to: [to],
      subject,
      text,
      html,
      reply_to: [email],
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const responseBody = await response.text().catch(() => '')
    throw new Error(`Resend request failed (${response.status}): ${responseBody}`)
  }
}
