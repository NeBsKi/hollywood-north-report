import Link from 'next/link'

import { FilmCard } from '@/components/ui/film-card'
import { Section } from '@/components/ui/section'
import { PaginationClient } from '@/components/ui/pagination'

export default function IndustriesAwardsPage() {
  return (
    <Section title="Industries & Awards">
      <Link href="/film/brooklyns-finest-three-clocks-no-clean-way-out">
        <FilmCard
          title="Paul Thomas Anderson Wins DGA Award for Theatrical Feature Film for ‘One Battle After Another’"
          author="Alison Foreman"
          category="Awards"
          description="Guillermo del Toro, Ryan Coogler, Josh Safdie, and Chloé Zhao were also nominated for the top prize."
          imageUrl="/images/image-6.png"
          hasBackground
        />
      </Link>
      <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:mt-20 sm:flex-row sm:gap-8 xl:gap-32">
        <div className="flex w-full flex-col gap-8 sm:w-2/3">
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="2026 Kodak Film Awards Honorees Include ‘Sinners,’ Kristen Stewart, and IMAX’s Chief Quality Guru"
              author="Sarah Shachat"
              category="Awards"
              contentClassName="py-4"
              imageUrl="/images/image-award-18.png"
              imageWrapperClassName="w-full sm:w-1/2 shrink-0"
              description="Joachim Trier and Fallout will also be honored by the global film manufacturer."
            />
          </Link>
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="Diane Warren on Trying to Make Her Most Personal Soundtrack Song Also Her Most Universal"
              author="Jim Hemphill"
              category="Awards"
              contentClassName="py-4"
              imageUrl="/images/image-award-19.png"
              imageWrapperClassName="w-full sm:w-1/2 shrink-0"
              description="The 17-time Oscar nominee tells Hollywood North Report about her latest song, Dear Me, and how she approached writing for a movie in which she was the subject."
            />
          </Link>
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="Oscar Contenders Guillermo del Toro, Jafar Panahi, Clint Bentley, and More Trade Screenwriting Secrets"
              author="Ryan Lattanzio"
              category="Awards"
              contentClassName="py-4"
              imageUrl="/images/image-award-20.png"
              description="The characters weve created wont submit to our preordained goals said Oscar-nominated Marty Supreme co-writer Ronald Bronstein while on the Santa Barbara Film Festival Writers Panel."
              imageWrapperClassName="w-full sm:w-1/2 shrink-0"
            />
          </Link>
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="The Independent Spirit Awards Winners Reflected a Scaled-Down Show"
              author="Marcus Jones"
              category="Awards"
              contentClassName="py-4"
              imageUrl="/images/image-award-21.png"
              description="The Film Independent Spirit Awards swapped a massive beach tent for a concert hall and its big winners were more indie darlings than Oscar frontrunners."
              imageWrapperClassName="w-full sm:w-1/2 shrink-0"
            />
          </Link>
          <Link href="/film/blow-out-when-obsession-noise-and-consequence-collide">
            <FilmCard
              title="Chloé Zhao Becomes Only Second Female Filmmaker Nominated Twice for Best Director"
              author="Kate Erbland"
              category="Awards"
              contentClassName="py-4"
              imageUrl="/images/image-award-22.png"
              description="The Hamnet filmmaker, who previously won for directing Nomadland, now joins a club that previously only included Jane Campion."
              imageWrapperClassName="w-full sm:w-1/2 shrink-0"
            />
          </Link>
        </div>
        <div className="flex w-full justify-end sm:w-1/3">
          <div className="border-accent-500/10 flex w-full flex-col justify-start gap-6 border-x px-6 xl:px-10">
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
      </div>
      <div className="mt-26 flex justify-center">
        <PaginationClient total={99} />
      </div>
    </Section>
  )
}
