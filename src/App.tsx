import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import ExperienceTimeline from './components/ExperienceTimeline'
import FeaturedWork from './components/FeaturedWork'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Goals from './components/Goals'
import Skills from './components/Skills'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 1350)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      <motion.div
        className="fixed left-0 top-0 z-[70] h-px origin-left bg-white"
        style={{ scaleX: progressScale, width: '100%' }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />

            {/* Sticky Hero */}
            <div className="sticky top-0 h-screen will-change-transform">
              <Hero />
            </div>

            {/* Content Scrolls Over Hero */}
            <main className="relative z-20 bg-[#050505] rounded-t-[40px] will-change-transform">
              <FeaturedWork />
              <Skills />
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