import type { WorkExperience } from '../../models/portfolio'
import LogoImg from './LogoImg'
import Section from './Section'
import { fmtDate, getCodeLogo } from './utils'
import '@web.awesome.me/webawesome-pro/dist/components/details/details.js'
import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/tag/tag.js'
import './WorkSection.css'

export default function WorkSection({ work }: { work: WorkExperience[] }) {
  return (
    <Section id="work" eyebrow="Experience" title="Work History">
      <div className="work-list">
        {work.map((w) => (
          <wa-card key={`${w.company}-${w.from}`} className="work-card" style={{ '--spacing': '0' } as React.CSSProperties}>
            <div className="work-card-header">
              <LogoImg path={w.logo} alt={w.company} size={52} />
              <div className="work-card-title-group">
                <h3 className="work-company">{w.company}</h3>
                <p className="work-title">{w.title}</p>
              </div>
              <p className="work-dates">{fmtDate(w.from)} — {fmtDate(w.to)}</p>
            </div>
            <div className="work-card-body">
              <p className="work-summary">{w.summary}</p>
              {w.programming.length > 0 && (
                <div className="tech-chips">
                  {w.programming.map((t) => {
                    const icon = getCodeLogo(t)
                    return (
                      <wa-tag key={t} className="tech-chip">
                        {icon && <wa-icon auto-width family="brands" name={icon} />}
                        {t}
                      </wa-tag>
                    )
                  })}
                </div>
              )}
              {Object.keys(w.details).length > 0 && (
                <wa-details summary="Key projects & contributions" className="work-details">
                  <div className="work-details-body">
                    {Object.entries(w.details).map(([project, bullets]) => (
                      <div key={project} className="work-detail-group">
                        <h4 className="work-detail-heading">{project}</h4>
                        {bullets.length > 0 && (
                          <ul className="work-detail-bullets">
                            {bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </wa-details>
              )}
            </div>
          </wa-card>
        ))}
      </div>
    </Section>
  )
}
