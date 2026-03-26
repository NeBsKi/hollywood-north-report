import { FilmCard } from '@/components/ui/FilmCard'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <Link href="/">
          <FilmCard
            title="Brooklyn’s Finest: Three Clocks, No Clean Way Out"
            author="Alison Foreman"
            category="Film Review"
            description="Brooklyn’s Finest worked for me largely because the cast never lets the movie down, even when the structure feels heavy."
            imageUrl="/film-poster.jpg"
            hasBackground
          />
        </Link>
      </div>
      <div className="mt-20 flex justify-between gap-6">
        <FilmCard
          title="Blow Out: When Obsession, Noise, and Consequence Collide"
          author="Ryan Lattanzio"
          category="Film Review"
          imageUrl="/film-poster.jpg"
          contentAlignment="center"
          contentClassName="py-4"
          orientation="vertical"
        />
        <FilmCard
          title="Out of Time: Denzel Washington vs. the Clock (and Everyone Else)"
          author="Alison Foreman"
          category="Film Review"
          imageUrl="/film-poster.jpg"
          contentAlignment="center"
          contentClassName="py-4"
          orientation="vertical"
        />
        <FilmCard
          title="Gang Related: When Sobriety Shows Up and the Story Gets Serious"
          author="Alison Foreman"
          category="Film Review"
          imageUrl="/film-poster.jpg"
          contentAlignment="center"
          contentClassName="py-4"
          orientation="vertical"
        />
      </div>
      <div className="mt-20">
        <div className="max-w-xl">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            category="Film Review"
            contentClassName="py-4"
            imageUrl="/film-poster.jpg"
            description="Brooklyn’s Finest worked for me largely because the cast never lets the movie down, even when the structure feels heavy."
            orientation="vertical"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            category="Film Review"
            orientation="vertical"
            contentAlignment="center"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            contentSize="small"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="mb-6 max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={1}
            numericIdSize="small"
            contentSize="small"
          />
        </div>
        <div className="mb-6 max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={2}
            numericIdSize="small"
            contentSize="small"
          />
        </div>
        <div className="max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={3}
            numericIdSize="small"
            contentSize="small"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="mb-6 max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={1}
            numericIdSize="large"
            contentSize="small"
          />
        </div>
        <div className="mb-6 max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={2}
            numericIdSize="large"
            contentSize="small"
          />
        </div>
        <div className="max-w-md">
          <FilmCard
            title="Blow Out: When Obsession, Noise, and Consequence Collide"
            author="Ryan Lattanzio"
            orientation="vertical"
            numericId={3}
            numericIdSize="large"
            contentSize="small"
          />
        </div>
      </div>
    </>
  )
}
