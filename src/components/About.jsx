import Reveal, { SectionHead } from './Reveal.jsx'
import Highlight from './Highlight.jsx'
import { profile, education, honors } from '../data.js'

export default function About() {
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <section id="about">
      <div className="container">
        <SectionHead index="01" title="About Me" />
        <div className="about-grid">
          <Reveal delay={0.1}>
            <div className="portrait">
              {profile.photo ? (
                <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
              ) : (
                <div className="monogram grad-text">{initials}</div>
              )}
              <div className="frame-glow" />
            </div>
          </Reveal>
          <div className="about-copy">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1} as="p">
                <Highlight text={p} />
              </Reveal>
            ))}
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={0.35 + i * 0.08}>
                <div className="edu-card">
                  {i === 0 && <span className="mono-label">Education</span>}
                  <div className="edu-row">
                    <div className="edu-text">
                      <span className="school">{edu.school}</span>
                      <span className="degree">
                        {edu.degree} · {edu.years}
                      </span>
                    </div>
                    {edu.logo && (
                      <span
                        className={`org-logo${edu.logo.tall ? ' tall' : ''}`}
                        title={edu.logo.alt}
                      >
                        <img src={edu.logo.src} alt={edu.logo.alt} loading="lazy" />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
            {honors.map((h, i) => (
              <Reveal key={h.title} delay={0.51 + i * 0.08}>
                <div className="edu-card">
                  {i === 0 && <span className="mono-label">Scholarships</span>}
                  <div className="edu-row">
                    <div className="edu-text">
                      <span className="school">{h.title}</span>
                      <span className="degree">
                        {h.org} · {h.years}
                      </span>
                    </div>
                    {h.logo && (
                      <span
                        className={`org-logo${h.logo.tall ? ' tall' : ''}`}
                        title={h.logo.alt}
                      >
                        <img src={h.logo.src} alt={h.logo.alt} loading="lazy" />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
