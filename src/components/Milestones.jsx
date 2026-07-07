import Reveal, { SectionHead } from './Reveal.jsx'
import { milestones } from '../data.js'

export default function Milestones() {
  return (
    <section id="journey">
      <div className="container">
        <SectionHead index="06" title="Journey" />
        <div className="timeline">
          {milestones.map((m, i) => (
            <Reveal
              key={`${m.year}-${m.title}`}
              delay={i * 0.08}
              className={`entry type-${m.type || 'research'}`}
            >
              <div className="entry-meta">
                <span className="year">{m.year}</span>
                <span className="type-chip">{m.label}</span>
              </div>
              <h3>{m.title}</h3>
              <p className="detail">{m.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
