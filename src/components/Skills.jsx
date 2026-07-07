import Reveal, { SectionHead } from './Reveal.jsx'
import { skills } from '../data.js'

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionHead index="04" title="Skills" />
        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.08}>
              <div className="skill-card" data-hover>
                <div className="group">{group.group}</div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
