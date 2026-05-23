import type { Language } from '../../models/portfolio'
import Section from './Section'
import './LanguagesSection.css'

import '@web.awesome.me/webawesome-pro/dist/components/progress-bar/progress-bar.js'

function LangBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="lang-bar-row">
      <span className="lang-bar-label">{label}</span>
      <wa-progress-bar
        value={Math.round((value / 9) * 100)}
        label={`${label}: ${value}/9`}
        style={{ '--track-height': '5px', '--indicator-color': 'var(--wa-color-text-link, #60a5fa)' } as React.CSSProperties}
      />
      <span className="skill-level">{value}/9</span>
    </div>
  )
}

export default function LanguagesSection({ languages }: { languages: Language[] }) {
  return (
    <Section id="languages" eyebrow="Communication" title="Languages">
      <div className="lang-list">
        {languages.map((lang) => (
          <wa-card key={lang.name} className="lang-card">
            <h3 className="lang-name">{lang.name}</h3>
            <div className="lang-bars">
              <LangBar label="Listening" value={lang.listen} />
              <LangBar label="Speaking"  value={lang.speak} />
              <LangBar label="Writing"   value={lang.write} />
            </div>
          </wa-card>
        ))}
      </div>
    </Section>
  )
}
