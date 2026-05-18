import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { ImageNode } from './nodes/ImageNode'

export const richTextTheme: NonNullable<InitialConfigType['theme']> = {
  paragraph: 'mb-2',
  text: {
    bold: 'font-semibold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },
  list: {
    ul: 'list-disc pl-5 my-2',
    ol: 'list-decimal pl-5 my-2',
    listitem: 'mb-1',
    nested: {
      listitem: 'list-none',
    },
  },
  heading: {
    h1: 'text-2xl my-3',
    h2: 'text-xl my-3',
  },
  quote: 'border-l-2 border-muted-foreground pl-3 italic my-2',
  link: 'text-primary underline underline-offset-2',
}

export const richTextNodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  AutoLinkNode,
  ImageNode,
]

export const EXTERNAL_VALUE_TAG = 'external-value'
