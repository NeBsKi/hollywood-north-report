import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'
import { FilmHeader, FilmBody } from '@/components/features'
import { getPostBySlug } from '@/lib/posts/posts'

const FILM_CONTENT_CLASS = [
  '[&_h1]:my-4 [&_h1]:text-[2.5rem] [&_h1]:leading-tight',
  '[&_h2]:my-3 [&_h2]:text-[2rem] [&_h2]:leading-tight',
  '[&_h3]:my-3 [&_h3]:text-[1.75rem] [&_h3]:leading-snug',
  '[&_h4]:my-2 [&_h4]:text-[1.5rem] [&_h4]:leading-snug',
  '[&_h5]:my-2 [&_h5]:text-[1.25rem] [&_h5]:leading-normal',
  '[&_h6]:my-2 [&_h6]:text-[1.125rem] [&_h6]:leading-normal',
  '[&_p]:my-8',
  '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5',
  '[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-3 [&_blockquote]:italic',
  '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2',
  '[&_img]:my-8 [&_img]:rounded-lg [&_img]:shadow-sm',
  '[&_iframe]:my-3 [&_iframe]:rounded-lg [&_iframe]:shadow-sm',
  '[&_video]:my-3 [&_video]:rounded-lg [&_video]:shadow-sm',
].join(' ')

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: post?.title ?? 'Film Title',
    description: post?.metaDescription ?? 'Film Description',
  }
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div>
      <div className="container pt-12 pb-20 md:pt-16">
        <FilmHeader
          title={post.title}
          author={post.author ?? undefined}
          date={post.publishDate.toISOString()}
          categories={post.categories.map(({ category }) => ({
            id: category.id,
            name: category.name,
          }))}
        />
        <FilmBody>
          <div className="relative h-58 w-full overflow-hidden rounded-lg sm:h-100">
            {post.coverMedia?.url ? (
              <Image alt={post.title} src={post.coverMedia.url} fill className="object-cover" />
            ) : (
              <div className="bg-accent-500/10 h-full w-full" />
            )}
          </div>
          <div
            className={`font-brandon text-accent-500 mt-8 text-lg/7 italic ${FILM_CONTENT_CLASS}`}
          >
            {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
          </div>
        </FilmBody>
      </div>
      <Section title="Selected Essays" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-8 lg:gap-14">
          <div className="flex w-full flex-col gap-4 sm:w-1/3 lg:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={1}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={2}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                numericId={3}
                numericIdSize="small"
                contentSize="small"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col justify-between gap-8 px-0 sm:w-2/3 sm:flex-row sm:gap-6 md:w-3/4 md:px-8">
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-49.png"
                imageWrapperClassName="mx-0 xl:mx-8"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-50.png"
                imageWrapperClassName="mx-0 xl:mx-8"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
