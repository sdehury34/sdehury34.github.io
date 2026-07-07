import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { EASE } from './Reveal.jsx'

export default function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100)
    return () => clearTimeout(t)
  }, [onDone])

  const letters = profile.firstName.split('')

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE } }}
      aria-hidden="true"
    >
      <div className="name">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.045 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <div className="bar">
        <motion.div
          className="bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
}
