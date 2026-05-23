import type { Certification, School } from '../../models/portfolio'
import LogoImg from './LogoImg'
import Section from './Section'
import { fmtDate } from './utils'
import './EducationSection.css'

export default function EducationSection({ schools, certifications }: {
  schools: School[]
  certifications: Certification[]
}) {
  return (
    <Section id="education" eyebrow="Background" title="Education &amp; Certifications">
      <div className="edu-list">
        {schools.map((s) => (
          <div key={s.name} className="edu-card">
            <LogoImg path={s.logo} alt={s.name} size={48} />
            <div className="edu-info">
              <h3 className="edu-name">{s.name}</h3>
              <p className="edu-grade">{s.grade}</p>
            </div>
            <p className="edu-dates">{fmtDate(s.from)} — {fmtDate(s.to)}</p>
          </div>
        ))}
      </div>

      {certifications.length > 0 && (
        <div className="cert-list">
          <h3 className="cert-list-heading">Certifications</h3>
          {certifications.map((c) => (
            <div key={c.name} className="cert-row">
              <span className="cert-name">{c.name}</span>
              <span className="cert-date">{fmtDate(c.date)}</span>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
