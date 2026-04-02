import Link from 'next/link'

import { FilmCard } from '@/components/ui/film-card/film-card'
import { Section } from '@/components/ui/section'

export default function ReviewsPage() {
  return (
    <Section title="Film Reviews">
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
      <div className="gird-cols-1 mt-12 grid gap-5 sm:mt-20 sm:grid-cols-3 lg:gap-6">
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
        <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            category="Film Review"
            imageUrl="/images/image-47.png"
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
            imageUrl="/images/image-48.png"
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
            imageUrl="/images/image-49.png"
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
            imageUrl="/images/image-46.png"
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
            imageUrl="/images/image-51.png"
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
            imageUrl="/images/image-23.png"
            contentAlignment="center"
            contentClassName="py-4"
            orientation="vertical"
          />
        </Link>
      </div>
    </Section>
  )
}
