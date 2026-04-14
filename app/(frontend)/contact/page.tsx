import * as motion from 'motion/react-client'
import { ContactForm } from '@/components/features'
import { Section } from '@/components/shared/section'

export default function ContactPage() {
  return (
    <Section title="Contact" hasBackground={false}>
      <div className="border-accent-500/10 border-b-0 pb-0 xl:border-b xl:pb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-lora text-accent-500 text-center text-2xl/8"
        >
          Get in touch with us regarding questions, ideas, editorial matters, or press inquiries
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mt-16 flex flex-col justify-between gap-10 xl:flex-row xl:gap-0"
        >
          <div className="border-accent-500/10 w-full border-0 pr-0 xl:w-[40%] xl:border-r xl:pr-12">
            <div className="font-brandon text-accent-400 flex flex-col gap-6 text-base/6 lg:gap-8">
              <div>
                <p>Editorial Inquiries</p>
                <a
                  href="mailto:info@hollywoodnorthreport.com"
                  className="text-accent-500 mt-2 block text-xl/7 xl:text-2xl/8"
                >
                  contact@hollywoodnorthreport.com
                </a>
              </div>
              <div>
                <p>Festival & Press</p>
                <a
                  href="mailto:press@hollywoodnorthreport.com"
                  className="text-accent-500 mt-2 block text-xl/7 xl:text-2xl/8"
                >
                  press@hollywoodnorthreport.com
                </a>
              </div>
              <div>
                <p>Based in Vancouver, Canada</p>
              </div>
            </div>
          </div>
          <div className="w-full pl-0 xl:w-[60%] xl:pl-12">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
