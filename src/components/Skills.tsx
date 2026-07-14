import SectionHeading from './SectionHeading'
import InteractiveRoadmap from './InteractiveRoadmap'

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-transparent border-b border-hairline">
      <div className="container-shell">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Skills"
            title="Core skills across programming, concepts, and web tools."
            description="My current skill set is grounded in programming fundamentals, algorithm design, responsive UI, and developer workflows."
            compact
          />
        </div>

        <InteractiveRoadmap />
      </div>
    </section>
  )
}
