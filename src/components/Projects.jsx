import { ArrowUpRight, Github } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { projects } from '../data.js'

// each project row gets its own accent color, cycling through the set
const ACCENTS = ['#38bdf8', '#2dd4bf', '#a78bfa', '#fbbf24', '#fb7185']

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionHead index="05" title="Selected Work" />
        <div>
          {projects.map((p, i) => {
            const accent = ACCENTS[i % ACCENTS.length]
            return (
              <Reveal key={p.title} delay={i * 0.06} y={50}>
                <article
                  className="project-row"
                  data-hover
                  style={{ '--row-accent': accent }}
                >
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p className="desc">{p.description}</p>
                    <div className="tech">
                      {p.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="links">
                    {p.repo && (
                      <a
                        className="icon-link"
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} source code on GitHub`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {p.link && (
                      <a
                        className="icon-link"
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} live site`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {!p.repo && !p.link && <span className="mono-label">{p.year}</span>}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
