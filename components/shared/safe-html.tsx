import DOMPurify from 'isomorphic-dompurify'
import type { JSX } from 'react'

type SafeHtmlProps = {
  html: string
  as?: keyof JSX.IntrinsicElements
  className?: string
}

const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'span',
  'a',
  'ul',
  'ol',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'code',
  'pre',
]

const ALLOWED_ATTR = ['href', 'target', 'rel', 'class', 'title']

export function SafeHtml({ html, as: Tag = 'div', className }: SafeHtmlProps) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
