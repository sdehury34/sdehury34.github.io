import Reveal from './Reveal.jsx'
import { profile, socials } from '../data.js'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <span className="mono-label">Got an idea? Let&apos;s build it together</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="big-cta">
            <a href={`mailto:${profile.email}`}>Say Hello</a>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sub">
            I&apos;m always open to research collaborations, med-tech projects,
            and interesting ideas across deep learning, simulation, and
            embedded systems. Drop me a line at{' '}
            <a href={`mailto:${profile.email}`} style={{ color: 'var(--text)' }}>
              {profile.email}
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="socials-row">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
