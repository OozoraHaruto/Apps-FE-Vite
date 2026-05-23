import { useTitle } from '../../hooks/useTitle'
import type { PrivacyData } from '../../models/app'
import './PrivacyPage.css'

const DROPS = Array.from({ length: 24 }, (_, i) => ({
  left:     `${(i * 4.13 + 2) % 97}%`,
  delay:    `${((i * 0.41) % 2.2).toFixed(2)}s`,
  duration: `${(0.75 + (i * 0.11) % 0.65).toFixed(2)}s`,
}))

export default function PrivacyPage({ data }: { data: PrivacyData }) {
  useTitle(`Privacy Policy — ${data.appName}`, true)

  return (
    <div className="pp-root">
      <div className="pp-rain" aria-hidden="true">
        {DROPS.map((d, i) => (
          <span
            key={i}
            className="pp-raindrop"
            style={{
              '--left':     d.left,
              '--delay':    d.delay,
              '--duration': d.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="pp-container">
        <div className="pp-badge-row">
          <div className="pp-badge">
            <img src={data.icon} alt="" className="pp-badge-icon-img" />
          </div>
          <div className="pp-badge-meta">
            <span className="pp-badge-eyebrow">App Privacy</span>
            <p className="pp-badge-name">{data.appName}</p>
          </div>
        </div>

        <p className="pp-intro">{data.intro}</p>

        {data.sections.map(({ color, title, facts }) => (
          <section key={title} className="pp-section">
            <div className="pp-section-header">
              <span
                className="pp-section-pip"
                style={{
                  background:  color,
                  boxShadow: `0 0 8px ${color}8c`,
                }}
              />
              <h2 className="pp-section-title">{title}</h2>
            </div>
            <div className="pp-facts">
              {facts.map((text, i) => (
                <div key={i} className="pp-fact">
                  <span className="pp-fact-marker">{String(i + 1).padStart(2, '0')}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <footer className="pp-footer">
          <span className="pp-footer-dot" />
          <span className="pp-footer-text">{data.footerText}</span>
          <span className="pp-footer-dot" />
        </footer>
      </div>
    </div>
  )
}
