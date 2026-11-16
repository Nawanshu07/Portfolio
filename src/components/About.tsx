import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#050505] text-zinc-200 border-b border-zinc-800">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Background"
          title="BCA student based in New Delhi."
        />

        <div className="grid gap-6 lg:grid-cols-2 items-start mt-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            <p>
              Undergraduate studying Computer Applications. Focus on C, C++, Python, algorithms, and web applications.
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm">
              Seeking 2026 software engineering internships.
            </p>

            <div className="pt-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-200 border border-zinc-700 bg-zinc-950 px-3.5 py-2 rounded-sm hover:border-zinc-400 hover:text-white transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-zinc-400" />
                <span>view resume.pdf</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="border border-zinc-800 rounded-sm bg-[#080808] p-4 sm:p-5 font-mono text-xs"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 text-zinc-500 text-[11px]">
              <span>// spec.json</span>
              <span>2026</span>
            </div>

            <dl className="mt-3 space-y-2.5">
              <div className="flex justify-between py-0.5 border-b border-zinc-900">
                <dt className="text-zinc-500">Degree</dt>
                <dd className="text-zinc-200">BCA (Undergrad)</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-zinc-900">
                <dt className="text-zinc-500">Languages</dt>
                <dd className="text-zinc-200">C, C++, Python, JS</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-zinc-900">
                <dt className="text-zinc-500">Focus</dt>
                <dd className="text-zinc-200">DSA &amp; Systems</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-zinc-900">
                <dt className="text-zinc-500">Web</dt>
                <dd className="text-zinc-200">React, TypeScript, CSS</dd>
              </div>
              <div className="flex justify-between py-0.5">
                <dt className="text-zinc-500">Role</dt>
                <dd className="text-zinc-50">SWE Intern</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
