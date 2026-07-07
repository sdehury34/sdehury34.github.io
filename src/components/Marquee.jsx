import { motion, useReducedMotion } from 'framer-motion'
import { marquee } from '../data.js'

// Infinite horizontal ticker of domain keywords.
export default function Marquee() {
  const reduceMotion = useReducedMotion()
  const words = marquee

  const track = (
    <div className="track">
      {words.map((w, i) => (
        <span className="item" key={i}>
          {w}
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        style={{ display: 'inline-flex' }}
        animate={reduceMotion ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {track}
        {track}
      </motion.div>
    </div>
  )
}
