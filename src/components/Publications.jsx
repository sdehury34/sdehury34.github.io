import { ArrowUpRight, FileText } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { publications, profile } from '../data.js'

// Bolds the site owner's name inside the author list.
function Authors({ list }) {
  const parts = list.split(profile.name)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <strong>{profile.name}</strong>}
          {part}
        </span>
      ))}
    </>
  )
}

export default function Publications() {
  return (
    <section id="publications" className="sec-violet">
      <div className="container">
        <SectionHead index="03" title="Publications" />
        <div className="pub-list">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 0.08}>
              <a
                className="pub-card"
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                data-hover
              >
                <div className="pub-icon">
                  <FileText size={20} aria-hidden="true" />
                </div>
                <div className="pub-body">
                  <div className="pub-meta">
                    <span className="pub-venue">{pub.venue}</span>
                    <span className="pub-year">{pub.year}</span>
                    {pub.tag && <span className="pub-tag">{pub.tag}</span>}
                  </div>
                  <h3>{pub.title}</h3>
                  <p className="pub-authors">
                    <Authors list={pub.authors} />
                  </p>
                </div>
                <span className="pub-open" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
