import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, PlayCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import MagneticButton from './MagneticButton'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92svh] flex-col items-center justify-center bg-canvas-soft px-6 py-20 overflow-hidden border-b border-hairline"
    >
      {/* Background Image */}
      <img
        src="/hero-bg-opt.jpg"
        alt="Abstract Background"
        className="absolute inset-0 h-full w-full object-cover opacity-25 select-none pointer-events-none mix-blend-luminosity"
        decoding="async"
        fetchPriority="high"
      />

      {/* 
        Premium Atmospheric Mesh Gradient Backdrop
        Overlapping radial gradients that form the signature cyan-blue-magenta-amber canvas.
      */}
      <div className="absolute inset-x-0 -top-40 -z-10 h-[800px] w-full select-none pointer-events-none opacity-60" aria-hidden="true">
        <div className="absolute inset-0 bg-canvas-soft/40 backdrop-blur-[1px]" />
        <div 
          className="absolute inset-0 blur-[120px] filter"
          style={{
            backgroundImage: `
              radial-gradient(circle at 35% 20%, #50e3c2 0%, transparent 40%),
              radial-gradient(circle at 65% 25%, #0070f3 0%, transparent 45%),
              radial-gradient(circle at 50% 15%, #ff0080 0%, transparent 35%),
              radial-gradient(circle at 20% 45%, #7928ca 0%, transparent 35%),
              radial-gradient(circle at 80% 45%, #f9cb28 0%, transparent 30%)
            `,
          }}
        />
        {/* Faint subtle grid pattern overlaying the gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-4xl text-center"
      >
        <motion.p 
          variants={itemVariants}
          className="text-caption-mono tracking-widest text-body uppercase font-mono mb-6"
        >
          // Nawanshu
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-display-xl sm:text-6xl md:text-7xl lg:text-[84px] lg:leading-[88px] font-semibold text-ink tracking-tight text-pretty select-none"
        >
          I build software
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-link via-violet to-highlight-pink">
            that feels clear.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-2xl text-body-lg text-body text-pretty leading-relaxed"
        >
          Practical projects, strong fundamentals, and clean interfaces
          shaped through C, C++, Python, DSA, and modern web development.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work" variant="primary">
            <PlayCircle className="h-4 w-4" />
            <span>View Projects</span>
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <ArrowRight className="h-4 w-4" />
            <span>Connect</span>
          </MagneticButton>
          <MagneticButton href="https://github.com/nawanshu07" target="_blank" rel="noopener noreferrer" variant="ghost">
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/nawanshu-sharma-104619351?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" variant="ghost">
            <LinkedinIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </MagneticButton>
        </motion.div>

        {/* 
          Stunning interactive Vercel-style Code Editor Mockup
          Split layout: left file sidebar explorer, right code compiler and execution results.
        */}
        <motion.div
          variants={itemVariants}
          className="mt-16 w-full max-w-4xl overflow-hidden rounded-md border border-hairline bg-canvas shadow-level4 flex flex-col md:flex-row select-none"
        >
          {/* Left Sidebar - File Explorer */}
          <div className="w-full md:w-[220px] bg-canvas-soft border-b md:border-b-0 md:border-r border-hairline flex flex-col text-left">
            <div className="flex h-11 items-center justify-between border-b border-hairline bg-canvas-soft-2/50 px-4">
              <span className="text-caption-mono text-mute font-mono text-[10px] uppercase tracking-wider font-semibold">
                workspace
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-error/40" />
                <div className="h-2 w-2 rounded-full bg-warning/40" />
                <div className="h-2 w-2 rounded-full bg-success/40" />
              </div>
            </div>
            <div className="p-3 flex flex-col gap-1 text-caption-mono font-mono text-[11px] text-body">
              <div className="text-mute font-semibold flex items-center gap-1.5 px-2 py-1 select-none">
                📁 portfolio/
              </div>
              <div className="text-link bg-canvas-soft-2 border border-hairline/50 rounded-sm flex items-center gap-1.5 px-4 py-1 font-semibold select-none">
                📄 main.c
              </div>
              <div className="flex items-center gap-1.5 px-4 py-1 hover:text-ink hover:bg-canvas-soft-2 rounded-sm transition duration-150 cursor-pointer select-none">
                📄 expense.py
              </div>
              <div className="flex items-center gap-1.5 px-4 py-1 hover:text-ink hover:bg-canvas-soft-2 rounded-sm transition duration-150 cursor-pointer select-none">
                📄 library.cpp
              </div>
              <div className="flex items-center gap-1.5 px-4 py-1 hover:text-ink hover:bg-canvas-soft-2 rounded-sm transition duration-150 cursor-pointer select-none">
                📄 index.html
              </div>
            </div>
          </div>

          {/* Right Area - Code Viewer & Execution Terminal */}
          <div className="flex-1 flex flex-col text-left">
            {/* Editor Tabs */}
            <div className="flex h-11 items-center border-b border-hairline bg-canvas-soft-2 px-4 justify-between">
              <div className="flex items-center gap-1">
                <span className="text-caption-mono text-ink font-mono text-[11px] font-semibold border-b-2 border-link h-11 flex items-center px-1">
                  main.c
                </span>
                <span className="text-caption-mono text-mute font-mono text-[11px] h-11 flex items-center px-3 hover:text-ink cursor-pointer">
                  expense.py
                </span>
              </div>
              <span className="text-caption-mono text-mute font-mono text-[10px]">
                UTF-8 • C (GCC)
              </span>
            </div>

            {/* Code Body */}
            <div className="p-6 font-mono text-code text-[#a9b2c3] overflow-x-auto leading-relaxed border-b border-hairline bg-canvas select-text">
              <pre className="text-xs sm:text-xs">
                <code>
                  <span className="text-[#e06c75]">#include</span> <span className="text-[#98c379]">&lt;stdio.h&gt;</span>{'\n'}
                  <span className="text-[#e06c75]">#include</span> <span className="text-[#98c379]">&lt;string.h&gt;</span>{'\n'}
                  {'\n'}
                  <span className="text-[#c678dd]">typedef struct</span> {'{'} {'\n'}
                  {'  '}<span className="text-[#e5c07b]">int</span> id;{'\n'}
                  {'  '}<span className="text-[#e5c07b]">char</span> name[<span className="text-[#d19a66]">50</span>];{'\n'}
                  {'  '}<span className="text-[#e5c07b]">float</span> gpa;{'\n'}
                  {'}'} <span className="text-[#e5c07b]">Student</span>;{'\n'}
                  {'\n'}
                  <span className="text-[#c678dd]">int</span> <span className="text-[#61afef]">main</span>() {'{'} {'\n'}
                  {'  '}<span className="text-[#e5c07b]">Student</span> dev = {'{'} <span className="text-[#d19a66]">1</span>, <span className="text-[#98c379]">"Nawanshu"</span>, <span className="text-[#d19a66]">4.0</span> {'}'};{'\n'}
                  {'  '}<span className="text-[#61afef]">printf</span>(<span className="text-[#98c379]">"➜ Active Developer: %s\\n"</span>, dev.name);{'\n'}
                  {'  '}<span className="text-[#61afef]">printf</span>(<span className="text-[#98c379]">"➜ Status: Ready for collaboration\\n"</span>);{'\n'}
                  {'  '}<span className="text-[#c678dd]">return</span> <span className="text-[#d19a66]">0</span>;{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            {/* Output Mock Terminal */}
            <div className="p-4 bg-canvas-soft-2 font-mono text-[11px] text-mute flex flex-col gap-1 border-t border-hairline/20 select-text">
              <div className="flex items-center gap-1.5 text-body">
                <span className="text-link font-bold select-none">➜</span>
                <span className="text-ink font-semibold select-none">portfolio/</span>
                <span>gcc main.c -o system && ./system</span>
              </div>
              <div className="text-[#98c379] font-medium pl-4">
                ➜ Active Developer: Nawanshu
              </div>
              <div className="text-[#61afef] font-medium pl-4">
                ➜ Status: Ready for collaboration
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <p className="text-caption-mono text-mute tracking-widest uppercase font-mono text-[10px]">
          Scroll Down
        </p>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-mute"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
