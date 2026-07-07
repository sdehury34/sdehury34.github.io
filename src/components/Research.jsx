import { Waves, Brain, Zap, CircuitBoard } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { research } from '../data.js'

const ICONS = { Waves, Brain, Zap, CircuitBoard }

export default function Research() {
  return (
    <section id="research" className="sec-teal">
      <div className="container">
        <SectionHead index="02" title="Research" />
        <Reveal>
          <p className="research-intro">{research.intro}</p>
        </Reveal>
        <div className="research-grid">
          {research.areas.map((area, i) => {
            const Icon = ICONS[area.icon] || Waves
            return (
              <Reveal key={area.title} delay={i * 0.08}>
                <div className="research-card" data-hover>
                  <div className="icon-badge">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
