import * as motion from 'motion/react-client'
import { Section } from '@/components/shared/section'

export default function AboutUsPage() {
  return (
    <>
      <Section title="About Us" className="mb-12 md:mb-20 xl:mb-26">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-accent-500 [&>p]:font-brandon [&>p]:my-6 [&>p]:text-base/6"
        >
          <h3 className="font-fell mb-8 text-2xl/8 md:text-3xl/10">Hollywood North Report</h3>
          <p>
            Hollywood North Report is an independent film journal focused on long‑form criticism, in
            perspective, and the cultural context surrounding cinema.
          </p>
          <p>
            Based in Vancouver — a city widely known as "Hollywood North" — the publication looks at
            inside and outside the industry. Vancouver sits at a unique intersection of global
            filmmaking: a hub for Hollywood studios, a host city for major festivals, and a gateway
            to international cinema.
          </p>
          <p>
            Hollywood North Report uses that vantage point to write about films as complete works
            performance, direction, historical moment, and the evolving careers of the people who
            make them.
          </p>
          <p>
            Rather than chasing release‑week reactions or algorithm‑driven rankings, the publication
            focuses on more deliberate criticism. Films are examined with distance, context, and
            curiosity — often performances and projects years after their release to understand how
            they actually hold up.
          </p>
          <p>
            In short, Hollywood North Report treats cinema as a cultural record rather than
            disposable content.
          </p>
          <div className="text-primary-700 mt-4 flex items-center gap-2 text-base/6">
            <span>Independent</span>
            <span className="bg-primary-700 inline-block h-0.5 w-0.5 rounded-full" />
            <span>Editorial</span>
            <span className="bg-primary-700 inline-block h-0.5 w-0.5 rounded-full" />
            <span>Festival-focused</span>
          </div>
        </motion.div>
      </Section>

      <Section title="Mission" className="mb-12 md:mb-20 xl:mb-26" boxed>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col-reverse justify-between md:flex-row"
        >
          <div className="text-accent-500 [&>p]:font-brandon w-full pr-12 md:w-1/2 [&>p]:my-6 [&>p]:text-base/6">
            <p>
              Hollywood North Report exists to document cinema with patience and context rather than
              speed.
            </p>
            <p>
              The publication approaches film as a cultural artefact — something shaped by its era,
              the ca people involved, and the broader movements within the industry.
            </p>
            <p>
              The goal is not to chase headlines or quick reactions. Instead, the focus is on
              thoughtful long that looks at how films age, how performances evolve over time, and
              how certain movies meaning years after their release.
            </p>
            <p>
              Reviews are written independently, without studio sponsorship or paid promotion.
              Perspective and take priority over algorithms and trending topics.
            </p>
          </div>
          <div className="font-brandon text-primary-700 border-accent-500/10 flex w-full items-center justify-start border-l px-6 pl-2 text-left text-lg/7 font-medium italic md:w-1/2 md:justify-center md:px-6 md:text-center md:text-2xl/8">
            ‘This is not a ratings farm. It is a film journal.’
          </div>
        </motion.div>
      </Section>

      <Section
        title="What We Publish"
        className="mb-12 md:mb-20 xl:mb-26"
        boxed
        viewMoreButton={{ href: '/what-we-publish' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-accent-500 [&>p]:font-brandon [&>p]:my-6 [&>p]:text-base/6"
        >
          <p>
            Hollywood North Report publishes long‑form writing about film, performance, and the
            industry surrounds them.
          </p>
          <p className="text-accent-500 font-medium">Most articles fall into four categories:</p>
          <ul className="[&>li]:before:bg-primary-700 flex flex-col gap-4 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-2 [&>li]:before:left-0 [&>li]:before:size-1 [&>li]:before:rounded-full [&>li]:before:content-['']">
            <li className="flex flex-col gap-2">
              <p className="text-primary-700 font-medium">Long-form film criticism and analysis</p>
              <p className="text-accent-400">
                Detailed reviews examining performances, direction, themes, and cultural context
                rather than sim assigning scores.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <p className="text-primary-700 font-medium">Critical essays</p>
              <p className="text-accent-400">
                Pieces exploring how films reflect their time, how certain actors defined particular
                eras, and h evolve across decades.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <p className="text-primary-700 font-medium">Festival and industry coverage</p>
              <p className="text-accent-400">
                Observations from major film festivals and developments affecting the international
                film industry.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <p className="text-primary-700 font-medium">Retrospective analysis</p>
              <p className="text-accent-400">
                Looking back at influential films, movements, and overlooked performances with the
                benefit of distance.
              </p>
            </li>
          </ul>
          <p>
            The goal is to treat cinema as a living cultural record rather than disposable weekly
            content.
          </p>
        </motion.div>
      </Section>

      <Section title="Perspective" className="mb-12 md:mb-20 xl:mb-26" boxed>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="border-secondary-200 text-accent-400 bg-secondary-50 rounded-lg border p-6 px-6 py-10 text-center text-base/6">
            <p className="text-accent-500 font-medium">Editorial independence</p>
            <p className="mt-4">
              Hollywood North Report operates without studio sponsorships or paid placements. All
              writing reflect author’s independent perspective.
            </p>
          </div>
          <div className="border-secondary-200 text-accent-400 bg-secondary-50 rounded-lg border p-6 px-6 py-10 text-center text-base/6">
            <p className="text-accent-500 font-medium">Long-form criticism</p>
            <p className="mt-4">
              Articles emphasise depth and context over quick takes. Many reviews examine a film
              within the of an actor’s career or the tradition of the genre it belongs to.
            </p>
          </div>
          <div className="border-secondary-200 text-accent-400 bg-secondary-50 rounded-lg border p-6 px-6 py-10 text-center text-base/6">
            <p className="text-accent-500 font-medium">International cinema focus</p>
            <p className="mt-4">
              While based in Vancouver, the publication highlights films and performances from
              across the industry, with attention to festival cinema and character‑driven
              storytelling.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section title="Editorial Background" className="mb-12 md:mb-20 xl:mb-26" boxed>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-accent-500 [&>p]:font-brandon [&>p]:my-6 [&>p]:text-base/6"
        >
          <p>
            Hollywood North Report began as a personal archive of film writing — a way to document
            fi as entertainment, but as reflections of their moment, their creators, and the
            audiences who ex them.
          </p>
          <p>
            Over time it developed into a broader editorial platform focused on thoughtful film
            analysis an commentary.
          </p>
          <p>
            The publication now covers both contemporary releases and older films whose themes,
            performance historical context deserve deeper examination.
          </p>
          <p>
            Operating independently allows Hollywood North Report to remain slow, deliberate, and
            perspective‑dr — prioritising clarity, context, and genuine enthusiasm for cinema rather
            than the speed of the cycle.
          </p>
          <p>
            The result is a publication that treats film not as disposable media, but as part of a
            much culture, performance, and storytelling.
          </p>
        </motion.div>
      </Section>
    </>
  )
}
