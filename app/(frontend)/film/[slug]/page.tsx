import Link from 'next/link'
import Image from 'next/image'

import { FilmCard } from '@/components/shared/film-card'
import { Section } from '@/components/shared/section'
import { FilmHeader, FilmBody } from '@/components/features'

export default async function FilmPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="container pt-12 pb-20 md:pt-16">
        <FilmHeader />
        <FilmBody>
          <div className="relative h-58 w-full overflow-hidden rounded-lg sm:h-100">
            <Image
              alt="Brooklyn's Finest"
              src="/images/image-single-23.png"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-accent-500 font-brandon my-8 text-xl/7 italic md:my-12 md:text-2xl xl:my-16 xl:text-3xl/10">
            ‘Brooklyn’s Finest worked for me largely because the cast never lets the movie down,
            even when the structure feels heavy.’
          </div>
          <div className="text-accent-500 flex flex-col gap-6 text-lg/7 italic">
            <p>
              The story that pulled me in most was Sal Procida (Ethan Hawke — Training Day, Before
              the Devil Knows You’re Dead). From the opening moments, his desperation feels lived-in
              rather than manufactured, and once that pressure starts building, it never really lets
              up. Hawke plays him as a man already negotiating with himself, which makes every
              decision feel both inevitable and uncomfortable.
            </p>
            <p>
              Tango (Don Cheadle — Traffic, Hotel Rwanda) and Eddie Dugan (Richard Gere — American
              Gigolo, Pretty Woman) are just as effective, though they take longer to settle. Gere’s
              storyline especially started off feeling the dullest to me, almost like a holding
              pattern, but by the end it becomes the connective tissue that brings all three arcs
              together. Watching it unfold slowly actually pays off, turning his character into the
              emotional hinge of the film rather than an after thought.
            </p>
            <p>
              Seeing Tango share the screen with Caz (Wesley Snipes — New Jack City, Blade) was a
              highlight. The film sells their bond through implication rather than exposition, which
              mostly works, but I did find myself wanting more. The “incident” that supposedly saved
              Tango’s life is referenced but never shown, and it feels like it must have been
              significant for him to risk his entire career to avenge someone he’s supposed to be
              bringing down — “friend” used loosely here, since he’s still a cop. That missing
              context stood out.
            </p>
          </div>
          <div className="my-8 md:my-16">
            <div className="relative h-58 w-full overflow-hidden rounded-lg sm:h-100">
              <Image
                alt="Brooklyn's Finest"
                src="/images/image-single-45.png"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-accent-500 mt-2 text-lg italic">
              Richard Gere “Brooklyn’s Finest ” (2010)
            </p>
          </div>
          <div className="text-accent-500 flex flex-col gap-6 text-lg/7 italic">
            <p>
              Will Patton (No Way Out, Armageddon), as always, fits seamlessly into his role. He has
              that rare ability to feel exactly right in these worlds without drawing attention to
              himself, reinforcing the film’s grounded tone.
            </p>
            <p>
              What ultimately ties these three storylines together isn’t corruption or heroism —
              it’s time. Each man is racing a different clock, but the pressure feels identical.
              Eddie is counting down to retirement, convinced he just has to keep his head down a
              little longer. Tango is chasing promotion, willing to bend himself into whatever shape
              the system rewards. Sal isn’t even pretending the job means anything anymore — being a
              cop is simply the fastest way to get what he needs by any means available. Different
              motivations, same compression. As each clock moves closer to zero, the easier it
              becomes to justify crossing lines that once felt unthinkable.
            </p>
            <p>
              That idea reframed the title for me. Brooklyn’s “finest” isn’t about virtue or
              performance — it’s about survival inside a system that measures output, not intent. No
              matter who you are or how hard you work, you never really know what clock someone else
              is trying to beat. The badge looks the same, but the stakes are completely different.
            </p>
            <p>
              Gere’s Eddie getting entangled with a sex worker also carries an unintended bit of
              irony. Another Richard Gere character pulled into that situation — but this time,
              Pretty Woman rules don’t apply, and the consequences are far less forgiving.
            </p>
          </div>
          <div className="my-8 md:my-16">
            <div className="relative h-58 w-full overflow-hidden rounded-lg sm:h-100">
              <Image
                alt="Brooklyn's Finest"
                src="/images/image-single-27.png"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-accent-500 mt-2 text-lg italic">Brooklyn’s Finest ” (2010)</p>
          </div>
          <div className="text-accent-500 flex flex-col gap-6 text-lg/7 italic">
            <p>
              By the time all three storylines converge, the movie justifies its runtime. The final
              act gives weight to everything that came before it, and the moral choices land harder
              because you’ve lived with each character long enough to understand what they’re giving
              up. Eddie, in particular, ended up being the one I related to most. The “just a few
              more days and I’m out of here” mindset is familiar, and the film earns the moment
              where he finally chooses what’s right over what’s easy.
            </p>
            <p>
              I also couldn’t help but notice how much Sal resembles Alonzo Harris (Denzel
              Washington — Training Day) when riding shotgun during training. Whether intentional or
              not, it felt like a quiet visual echo.
            </p>
            <p>
              Brooklyn’s Finest argues that morality doesn’t collapse all at once — it erodes
              quietly, one deadline at a time, until the line between the “finest” and everyone else
              disappears entirely.
            </p>
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
