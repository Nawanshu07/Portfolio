import SectionHeading from './SectionHeading'
import InteractiveRoadmap from './InteractiveRoadmap'

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-canvas border-b border-hairline">
      <div className="container-shell">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Curriculum & Roadmap"
            title="Core skills across systems, data structures, and the web."
            description="My technical foundation is built upon programming discipline, algorithmic problem solving, responsive user interfaces, and structured developer workflows."
            compact
          />
        </div>

        <InteractiveRoadmap />
      </div>
    </section>
  )
}
