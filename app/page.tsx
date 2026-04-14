import Link from 'next/link'
import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'

export default function Home() {
  return (
    <>
      <Section
        title="Latest Film Reviews"
        viewMoreButton={{ href: '/reviews' }}
        className="mb-12 md:mb-20 xl:mb-26"
      >
        <Link href="/film/brooklyns-finest-three-clocks-no-clean-way-out">
          <FilmCard
            title="Brooklyn’s Finest: Three Clocks, No Clean Way Out"
            author="Alison Foreman"
            category="Film Review"
            description="Brooklyn’s Finest worked for me largely because the cast never lets the movie down, even when the structure feels heavy."
            imageUrl="/images/image-23.png"
            hasBackground
          />
        </Link>
        <div className="mt-12 flex flex-col justify-between gap-8 sm:mt-20 sm:flex-row sm:gap-6">
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="Blow Out: When Obsession, Noise, and Consequence Collide"
              author="Ryan Lattanzio"
              category="Film Review"
              imageUrl="/images/image-46.png"
              contentAlignment="center"
              contentClassName="py-4"
              orientation="vertical"
            />
          </Link>
          <Link href="/film/out-of-time-denzel-washington-vs-the-clock-and-everyone-else">
            <FilmCard
              title="Out of Time: Denzel Washington vs. the Clock (and Everyone Else)"
              author="Alison Foreman"
              category="Film Review"
              imageUrl="/images/image-47.png"
              contentAlignment="center"
              contentClassName="py-4"
              orientation="vertical"
            />
          </Link>
          <Link href="/film/gang-related-when-sobriety-shows-up-and-the-story-gets-serious">
            <FilmCard
              title="Gang Related: When Sobriety Shows Up and the Story Gets Serious"
              author="Alison Foreman"
              category="Film Review"
              imageUrl="/images/image-48.png"
              contentAlignment="center"
              contentClassName="py-4"
              orientation="vertical"
            />
          </Link>
        </div>
      </Section>

      <Section
        title="Industries & Awards"
        viewMoreButton={{ href: '/industries-awards' }}
        className="mb-12 md:mb-20 xl:mb-26"
      >
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:gap-0">
          <div className="w-full pr-0 sm:w-1/2 sm:pr-8 lg:pr-26">
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                contentClassName="py-4"
                imageUrl="/images/image-6.png"
                description="Brooklyn’s Finest worked for me largely because the cast never lets the movie down, even when the structure feels heavy."
                orientation="vertical"
              />
            </Link>
          </div>
          <div className="border-accent-500/10 flex w-full flex-col justify-between gap-6 border-x px-8 sm:w-1/2 sm:px-10">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-6"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                orientation="vertical"
                contentAlignment="center"
              />
            </Link>
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-6"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                orientation="vertical"
                contentAlignment="center"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                orientation="vertical"
                contentAlignment="center"
              />
            </Link>
          </div>
        </div>
      </Section>

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
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
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

      <Section title="Editor's Selections" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
          <div className="flex w-full flex-col gap-4 sm:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
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
                contentSize="small"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
          </div>
          <div className="w-full px-0 sm:w-1/2 sm:px-10">
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                category="Film Review"
                imageUrl="/images/image-51.png"
                imageWrapperClassName="mx-0 xl:mx-16"
                contentAlignment="center"
                contentClassName="py-4"
                orientation="vertical"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-1/4">
            <Link
              href="/film/blow-out-when-obsession-noise-and-consequence-collide"
              className="border-accent-500/10 border-b pb-4"
            >
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
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
                contentSize="small"
              />
            </Link>
            <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
              <FilmCard
                title="Blow Out: When Obsession, Noise, and Consequence Collide"
                author="Ryan Lattanzio"
                orientation="vertical"
                contentSize="small"
              />
            </Link>
          </div>
        </div>
      </Section>

      <Section title="You May Also Like" className="mb-12 md:mb-20 xl:mb-26">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-6">
          <Link
            href="/film/blow-out-when-obsession-noise-and-consequence-collide"
            className="border-accent-500/10 border-b pb-4"
          >
            <FilmCard
              title="Blow Out: When Obsession, Noise, and Consequence Collide"
              author="Ryan Lattanzio"
              orientation="vertical"
              numericId={1}
              numericIdSize="large"
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
              numericIdSize="large"
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
              numericId={3}
              numericIdSize="large"
              contentSize="small"
            />
          </Link>
        </div>
      </Section>
    </>
  )
}
