import * as motion from 'motion/react-client'
import { notFound } from 'next/navigation'
import { Section } from '@/components/shared/section'
import { listAboutPageBlocks } from '@/app/(dashboard)/admin/about-us/_lib/queries'
import { ABOUT_BLOCK_TYPE } from '@/app/(dashboard)/admin/about-us/_lib/types'
import { cardsFromDb } from '@/app/(dashboard)/admin/about-us/_lib/schemas'

const CONTENT_CLASS = [
  '[&_h1]:my-4 [&_h1]:text-[2.5rem] [&_h1]:leading-tight [&_h1]:font-fell [&_h1]:uppercase',
  '[&_h2]:my-3 [&_h2]:text-[2rem] [&_h2]:leading-tight [&_h2]:font-fell [&_h2]:uppercase',
  '[&_h3]:my-3 [&_h3]:text-[1.75rem] [&_h3]:leading-snug [&_h3]:font-fell [&_h3]:uppercase',
  '[&_h4]:my-2 [&_h4]:text-[1.5rem] [&_h4]:leading-snug [&_h4]:font-fell [&_h4]:uppercase',
  '[&_h5]:my-2 [&_h5]:text-[1.25rem] [&_h5]:leading-normal [&_h5]:font-fell [&_h5]:uppercase',
  '[&_h6]:my-2 [&_h6]:text-[1.125rem] [&_h6]:leading-normal [&_h6]:font-fell [&_h6]:uppercase',
  '[&_p]:my-8',
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:my-4 [&_ul>li>p]:my-0',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol>li]:my-4 [&_ol>li>p]:my-0',
  '[&_strong]:font-medium [&_b]:font-medium',
].join(' ')

export default async function AboutUsPage() {
  const blocks = await listAboutPageBlocks()

  if (!blocks.length) notFound()

  const content = blocks.map((block, index) => {
    const isBoxed = index !== 0

    if (block.type === ABOUT_BLOCK_TYPE.CONTENT) {
      return (
        <Section
          key={block.id}
          title={block.title}
          className="mb-12 md:mb-20 xl:mb-26"
          boxed={isBoxed}
          viewMoreButton={block.title === 'What We Publish' ? { href: '/reviews' } : undefined}
        >
          {block.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`text-accent-500 font-brandon text-base/6 ${CONTENT_CLASS}`}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          )}
        </Section>
      )
    }
    if (block.type === ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE) {
      return (
        <Section
          key={block.id}
          title={block.title}
          className="mb-12 md:mb-20 xl:mb-26"
          boxed={isBoxed}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col-reverse justify-between md:flex-row"
          >
            {block.content && (
              <div
                className={`text-accent-500 font-brandon w-full pr-12 text-base/6 md:w-1/2 ${CONTENT_CLASS}`}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )}
            <div className="font-brandon text-primary-700 border-accent-500/10 flex w-full items-center justify-start border-l px-6 pl-2 text-left text-lg/7 font-medium italic md:w-1/2 md:justify-center md:px-6 md:text-center md:text-2xl/8">
              {block.quote && <p>{block.quote}</p>}
            </div>
          </motion.div>
        </Section>
      )
    }
    if (block.type === ABOUT_BLOCK_TYPE.NESTED_CARDS) {
      const cards = cardsFromDb(block.cards)
      return (
        <Section
          key={block.id}
          title={block.title}
          className="mb-12 md:mb-20 xl:mb-26"
          boxed={isBoxed}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {cards.map((card: { title: string; content: string }) => (
              <div className="border-secondary-200 text-accent-400 bg-secondary-50 rounded-lg border p-6 px-6 py-10 text-center text-base/6">
                <p className="text-accent-500 font-medium">{card.title}</p>
                <p className="mt-4">{card.content}</p>
              </div>
            ))}
          </motion.div>
        </Section>
      )
    }
    return null
  })

  return <>{content}</>
}
