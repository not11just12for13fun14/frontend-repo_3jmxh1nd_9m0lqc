import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// A scroll-driven sticky scene that transitions from day to night
export default function SolarScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.5 })

  // Sky color from bright day to deep night
  const skyFrom = useTransform(smooth, [0, 1], ['#7dd3fc', '#0b1220'])
  const skyTo = useTransform(smooth, [0, 1], ['#60a5fa', '#020617'])

  // Overall darkness overlay
  const darkness = useTransform(smooth, [0, 1], [0, 0.65])

  // Sun arc across the sky
  const sunY = useTransform(smooth, [0, 0.5, 1], ['10%', '60%', '120%'])
  const sunX = useTransform(smooth, [0, 1], ['15%', '85%'])
  const sunScale = useTransform(smooth, [0, 1], [1, 0.8])
  const sunOpacity = useTransform(smooth, [0, 0.7, 0.8, 1], [1, 1, 0.3, 0])

  // Moon rises as sun sets
  const moonY = useTransform(smooth, [0, 0.5, 1], ['-40%', '20%', '50%'])
  const moonX = useTransform(smooth, [0, 1], ['85%', '15%'])
  const moonOpacity = useTransform(smooth, [0, 0.6, 0.8, 1], [0, 0, 0.8, 1])

  // Stars fade in at night
  const starsOpacity = useTransform(smooth, [0.55, 0.75, 1], [0, 0.6, 1])

  // Panel charge fill from 0 to 100% during day
  const charge = useTransform(smooth, [0, 0.6], [0, 100])

  // Night flow intensity to house/car/battery
  const flowOpacity = useTransform(smooth, [0.6, 0.8, 1], [0, 0.6, 1])

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Sky gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ background: skyFrom.to((from) => `linear-gradient(to bottom, ${from}, ${skyTo.get()})`) }}
        />

        {/* Darkness overlay */}
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: darkness }} />

        {/* Sun */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-yellow-300 shadow-[0_0_80px_20px_rgba(250,204,21,0.35)]"
          style={{ top: sunY, left: sunX, scale: sunScale, opacity: sunOpacity }}
        />

        {/* Moon */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            top: moonY,
            left: moonX,
            opacity: moonOpacity,
            background:
              'radial-gradient(circle at 30% 30%, #f8fafc 0%, #e2e8f0 40%, #94a3b8 70%, #64748b 100%)',
            boxShadow: '0 0 60px 10px rgba(226,232,240,0.12)'
          }}
        >
          {/* simple craters */}
          <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-white/20" />
          <div className="absolute right-6 bottom-6 w-6 h-6 rounded-full bg-white/10" />
          <div className="absolute right-10 top-10 w-3 h-3 rounded-full bg-white/20" />
        </motion.div>

        {/* Stars */}
        <motion.svg className="absolute inset-0 w-full h-full" style={{ opacity: starsOpacity }}>
          {[...Array(120)].map((_, i) => {
            const x = Math.random() * 100
            const y = Math.random() * 100
            const r = Math.random() * 1.2 + 0.2
            const o = Math.random() * 0.6 + 0.4
            return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={`rgba(255,255,255,${o})`} />
          })}
        </motion.svg>

        {/* Ground / Horizon */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-slate-900 to-transparent" />

        {/* Solar panel scene */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[900px] max-w-[92vw]">
          <div className="relative w-full h-[260px]">
            {/* Panel base */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-14 w-[520px] h-[140px] [transform:skewX(-10deg)] rounded-md border-2 border-sky-300/40 bg-sky-900/40 backdrop-blur-sm shadow-lg overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-60">
                {[...Array(6)].map((_, r) => (
                  <div key={r} className="absolute left-0 right-0 border-t border-sky-300/20" style={{ top: `${(r + 1) * (100 / 7)}%` }} />
                ))}
                {[...Array(9)].map((_, c) => (
                  <div key={c} className="absolute top-0 bottom-0 border-l border-sky-300/20" style={{ left: `${(c + 1) * (100 / 10)}%` }} />
                ))}
              </div>

              {/* Charge fill */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-cyan-400/40"
                style={{ height: charge.to((v) => `${v}%`) }}
              />

              {/* Sun rays highlight */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent"
                style={{ opacity: sunOpacity }}
              />
            </div>

            {/* Stand */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-14 w-[18px] h-20 bg-slate-700 rounded-t-sm" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-64 h-6 bg-slate-800 rounded" />

            {/* Cable to battery */}
            <svg className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] max-w-[92vw] h-[220px] overflow-visible">
              {/* cable path */}
              <path id="cable" d="M 260 120 C 340 120 360 200 430 200 S 600 160 650 170" stroke="#94a3b8" strokeWidth="6" fill="none" strokeLinecap="round" />

              {/* flowing electricity */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="4"
                  fill="#22d3ee"
                  style={{ opacity: flowOpacity }}
                  initial={{ pathLength: 0 }}
                >
                  <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" rotate="auto">
                    <mpath href="#cable" />
                  </animateMotion>
                </motion.circle>
              ))}
            </svg>

            {/* Battery */}
            <div className="absolute right-0 bottom-4 w-36 h-20 bg-slate-800/80 border border-slate-600 rounded-md">
              <div className="absolute -right-3 top-6 w-2 h-8 bg-slate-600 rounded" />
              <div className="p-2 h-full flex items-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <motion.div key={i} className="flex-1 h-12 rounded-sm bg-emerald-400" style={{ opacity: flowOpacity }} />
                ))}
              </div>
            </div>

            {/* House and EV */}
            <div className="absolute left-2 bottom-2 flex items-end gap-6">
              {/* House */}
              <div className="relative w-28 h-24">
                <div className="absolute bottom-0 w-full h-16 bg-slate-800 border border-slate-600 rounded" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-slate-700 rotate-45" />
                <motion.div className="absolute left-3 bottom-5 w-8 h-8 rounded bg-yellow-300" style={{ opacity: flowOpacity }} />
              </div>

              {/* EV */}
              <div className="relative w-36 h-18">
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-700 rounded-2xl" />
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-slate-600 rounded-full" />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-slate-600 rounded-full" />
                <motion.div className="absolute left-1/2 -translate-x-1/2 -top-2 w-10 h-2 rounded bg-emerald-400" style={{ opacity: flowOpacity }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">Scroll</div>
      </div>
    </section>
  )
}
