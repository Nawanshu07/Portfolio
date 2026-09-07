import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Terminal, Cpu, ShieldCheck, Sparkles } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 3D Parallax Tilt state driven by mouse coordinates
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-14, 14]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Interactive typing lines inside the Session box
  const [sessionIndex, setSessionIndex] = useState(0)
  const sessionLogs = [
    { cmd: '$ boot --profile nawanshu', result: 'kernel v6.1 loaded · 64-bit' },
    { cmd: '$ sys.inspect --stack', result: 'C, C++, Python, DSA, Web runtime: OK' },
    { cmd: '$ target.eval()', result: 'Ready for software engineering roles' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionIndex((prev) => (prev + 1) % sessionLogs.length)
    }, 3600)
    return () => clearInterval(interval)
  }, [sessionLogs.length])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero Introduction"
      className="relative isolate overflow-hidden bg-[#0b0d0f] text-bone min-h-[95svh] flex items-center border-b border-hairline pt-24 pb-16 lg:pt-28 lg:pb-20"
    >
      {/* 
        Atmospheric Ember & Lavender Backlight Glow
        Positioned like Sunny Patel's signature radial glow
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-y-1/2 translate-x-1/4 rounded-full bg-ember/15 blur-[140px] opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 -z-10 h-[38rem] w-[38rem] -translate-y-1/2 -translate-x-1/4 rounded-full bg-gradient-lavender/10 blur-[130px] opacity-60"
      />

      {/* Subtle fine dot texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-25 select-none [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_40%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(237, 232, 220, 0.22) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="container-shell w-full grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ================= LEFT COLUMN ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          {/* Status Badge with Glowing Ember Pulse */}
          <div className="flex items-center gap-3 font-mono text-xs text-muted select-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            <span>Open to software roles &amp; internships</span>
          </div>

          {/* High-Impact Headline (Sunny Patel styling with ember accent) */}
          <h1 className="mt-6 text-balance font-display text-[2.9rem] sm:text-[3.9rem] lg:text-[4.6rem] font-semibold leading-[0.96] tracking-[-0.035em] text-bone">
            I engineer software from low-level systems to the{' '}
            <span className="text-ember">interface.</span>
          </h1>

          {/* Editorial Paragraph with Italic Ember Highlights */}
          <p className="mt-6 max-w-lg text-[1.02rem] sm:text-[1.08rem] leading-relaxed text-bone-dim">
            I build software <em className="font-medium not-italic text-ember">that runs fast and feels clear</em>, and I understand it <em className="font-medium not-italic text-ember">from the fundamentals up</em> — through C, C++, Python, Data Structures, and modern web architecture. Give me an engineering challenge that has to hold, and I&#39;ll <em className="font-medium not-italic text-ember">solve it end to end</em>.
          </p>

          {/* CTA Buttons Row (Sunny Patel styling) */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            {/* Primary Action */}
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm font-medium text-bone transition-all duration-300 hover:border-ember hover:bg-ember/20 shadow-[0_0_20px_rgba(217,102,61,0.15)]"
            >
              <span>See the work</span>
              <ArrowRight className="h-4 w-4 text-ember transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Direct Connect */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-card/60 px-4 py-3 font-mono text-sm text-muted transition-colors hover:border-hairline-strong hover:text-bone backdrop-blur-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="grid h-10 w-10 place-items-center rounded-md border border-hairline bg-surface-card/40 text-muted hover:text-bone hover:border-ember/40 transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="grid h-10 w-10 place-items-center rounded-md border border-hairline bg-surface-card/40 text-muted hover:text-bone hover:border-ember/40 transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Interactive Live Terminal Session Box (Sunny Patel Signature Widget) */}
          <div className="mt-10 w-full max-w-md">
            <div className="w-full rounded-lg border border-hairline-strong bg-surface-card/85 p-4 font-mono text-[0.74rem] leading-relaxed shadow-xl backdrop-blur-md">
              {/* Window Dots Header */}
              <div className="mb-3 flex items-center justify-between border-b border-hairline pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ember/80" />
                </div>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted font-mono">
                  SESSION · DEV_ENV
                </span>
              </div>

              {/* Dynamic Terminal Output Stream */}
              <div className="space-y-1.5 text-muted">
                <div className="text-bone flex items-center gap-2">
                  <span className="text-ember font-bold">›</span>
                  <span className="font-semibold">{sessionLogs[sessionIndex].cmd}</span>
                  <span className="inline-block h-3 w-1.5 animate-pulse bg-ember align-middle" />
                </div>
                <div className="text-[0.72rem] text-muted flex items-center gap-1.5 pl-3">
                  <span className="h-1 w-1 rounded-full bg-ember/60" />
                  <span>{sessionLogs[sessionIndex].result}</span>
                </div>
                <div className="text-[0.68rem] text-muted/70 pl-3 pt-1 border-t border-hairline/60 flex items-center justify-between">
                  <span>bca.student // active</span>
                  <span className="text-ember">status: ready</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN (3D Interactive Developer Console) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          className="relative hidden lg:flex flex-col items-center justify-center will-change-transform select-none"
        >
          {/* Main 3D Hardware Chassis */}
          <div className="relative w-full max-w-lg rounded-2xl border border-hairline-strong bg-[#121418]/90 p-6 shadow-2xl backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(217,102,61,0.12)]">
            {/* Top Hardware Panel */}
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded bg-ember/15 text-ember">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-semibold text-bone">
                    SYSTEMS_STAGE // ARCH
                  </h3>
                  <p className="text-[10px] font-mono text-muted">
                    X86_64 · 4.2 GHz · CLANG/GCC
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>

            {/* CRT Screen Frame */}
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-[#08090b] p-5 shadow-inner">
              {/* Scanline CRT Line Overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '100% 3px',
                }}
              />

              {/* Code Snippet Block */}
              <div className="font-mono text-xs leading-relaxed space-y-1">
                <div className="text-muted text-[11px] mb-2 flex items-center justify-between">
                  <span>// NawanshuSharma.cpp</span>
                  <span className="text-ember">v2.6</span>
                </div>

                <p className="text-ember">
                  <span className="text-muted">#include</span> &lt;iostream&gt;
                </p>
                <p className="text-ember">
                  <span className="text-muted">#include</span> &lt;vector&gt;
                </p>

                <p className="text-bone mt-3">
                  <span className="text-blue-400">class</span>{' '}
                  <span className="text-amber-300">SoftwareCraftsman</span> &#123;
                </p>
                <p className="text-bone pl-4">
                  <span className="text-blue-400">string</span> developer ={' '}
                  <span className="text-emerald-300">&quot;Nawanshu&quot;</span>;
                </p>
                <p className="text-bone pl-4">
                  <span className="text-blue-400">vector</span>&lt;<span className="text-blue-400">string</span>&gt; stack = &#123;
                </p>
                <p className="text-emerald-300 pl-8">
                  &quot;C++&quot;, &quot;Python&quot;, &quot;DSA&quot;, &quot;Full-Stack&quot;
                </p>
                <p className="text-bone pl-4">&#125;;</p>

                <p className="text-bone pl-4 mt-2">
                  <span className="text-purple-400">public:</span>
                </p>
                <p className="text-bone pl-8">
                  <span className="text-blue-400">void</span>{' '}
                  <span className="text-amber-300">buildReliableSoftware</span>() &#123;
                </p>
                <p className="text-muted-soft pl-12">
                  // Own every layer from silicon to screen
                </p>
                <p className="text-ember pl-12 font-medium">
                  ship_with_rigorous_craft();
                </p>
                <p className="text-bone pl-8">&#125;</p>
                <p className="text-bone">&#125;;</p>
              </div>

              {/* Live Status Telemetry Bar */}
              <div className="mt-5 pt-3 border-t border-hairline/80 flex items-center justify-between text-[10px] font-mono text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Memory Safety Checked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-ember" />
                  <span>Zero Leaks</span>
                </div>
              </div>
            </div>

            {/* Bottom Hardware Knobs & Equalizer Meters */}
            <div className="mt-4 pt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[45, 80, 60, 95, 70, 40].map((val, idx) => (
                    <span
                      key={idx}
                      style={{ height: `${val * 0.2}px` }}
                      className="w-1 rounded-full bg-ember/70 animate-pulse"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-muted">REALTIME BUS</span>
              </div>

              <div className="text-[10px] font-mono text-muted flex items-center gap-2">
                <Terminal className="h-3 w-3 text-ember" />
                <span>INTERACTIVE_PARALLAX_3D</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
