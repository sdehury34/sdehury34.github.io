import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Scroll-triggered reveal: fades + rises once when the element enters view.
export default function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

export function SectionHead({ index, title }) {
  return (
    <Reveal className="section-head">
      <span className="index">/{index}</span>
      <h2>{title}</h2>
    </Reveal>
  )
}

export { EASE }
