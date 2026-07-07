import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDownRight, Mail } from 'lucide-react'
import { profile } from '../data.js'
import { EASE } from './Reveal.jsx'
import UltrasoundField from './UltrasoundField.jsx'

const HeartModel = lazy(() => import('./HeartModel.jsx'))

function RoleCycler() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="role-word" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.em
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {profile.roles[i]}
        </motion.em>
      </AnimatePresence>
    </span>
  )
}

export default function Hero({ started }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [first, last] = profile.name.split(' ')
  const lineAnim = (delay) => ({
    initial: { y: '110%' },
    animate: started ? { y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  })
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      {/* ambient light blobs */}
      {!reduceMotion && (
        <>
          <motion.div
            className="orb"
            style={{
              width: 520,
              height: 520,
              top: '-10%',
              right: '-8%',
              background: 'rgba(56, 189, 248, 0.12)',
            }}
            animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="orb"
            style={{
              width: 420,
              height: 420,
              bottom: '-12%',
              left: '-6%',
              background: 'rgba(45, 212, 191, 0.09)',
            }}
            animate={{ x: [0, 70, 0], y: [0, -40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* interactive acoustic wavefield */}
      <UltrasoundField />

      {/* 3D point-cloud heart, beating in sync with the wavefield */}
      <Suspense fallback={null}>
        <HeartModel />
      </Suspense>

      <div className="container">
        <motion.div className="eyebrow" {...fadeUp(0.1)}>
          <span className="dot" />
          <span className="mono-label">{profile.status}</span>
        </motion.div>

        <motion.h1 style={{ y: yContent, opacity }}>
          <span className="line">
            <motion.span {...lineAnim(0.2)}>{first}</motion.span>
          </span>
          <span className="line">
            <motion.span className="grad-text" {...lineAnim(0.32)}>
              {last}
            </motion.span>
          </span>
        </motion.h1>

        <motion.div className="role-row" {...fadeUp(0.55)}>
          <span className="mono-label">I am a</span>
          <RoleCycler />
        </motion.div>

        <motion.p className="tagline" {...fadeUp(0.65)}>
          {profile.tagline}
        </motion.p>

        <motion.div className="cta-row" {...fadeUp(0.75)}>
          <a href="#projects" className="btn-primary">
            View My Work <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            <Mail size={16} aria-hidden="true" /> Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
        aria-hidden="true"
      >
        <div className="wheel" />
        <span className="mono-label">Scroll</span>
      </motion.div>
    </section>
  )
}
