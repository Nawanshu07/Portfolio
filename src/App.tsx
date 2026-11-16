import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import ExperienceTimeline from './components/ExperienceTimeline'
import FeaturedWork from './components/FeaturedWork'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Goals from './components/Goals'
import SkillOrbit from './components/SkillOrbit'
import LogoCarousel from './components/LogoCarousel'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 250)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      {/* Top Page Scroll Progress Indicator — Direct compositor transform */}
      <motion.div
        className="fixed left-0 top-0 z-[100] h-px origin-left bg-zinc-400 will-change-transform"
        style={{ scaleX: scrollYProgress, width: '100%' }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-h-screen bg-[#050505] text-zinc-200"
          >
            <CustomCursor />
            <Navbar />

            <main id="main-content" className="relative z-10 flex-1 w-full bg-[#050505]">
              <Hero />
              <LogoCarousel />
              <FeaturedWork />
              <SkillOrbit />
              <About />
              <Goals />
              <ExperienceTimeline />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
