import type { Language } from '../../models/portfolio'
import Section from './Section'
import './LanguagesSection.css'

function LangBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="lang-bar-row">
      <span className="lang-bar-label">{label}</span>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill skill-bar-fill--lang"
          style={{ '--bar-w': `${Math.round((value / 9) * 100)}%` } as React.CSSProperties}
        />
      </div>
      <span className="skill-level">{value}/9</span>
    </div>
  )
}

export default function LanguagesSection({ languages }: { languages: Language[] }) {
  return (
    <Section id="languages" eyebrow="Communication" title="Languages">
      <div className="lang-list">
        {languages.map((lang) => (
          <div key={lang.name} className="lang-card">
            <h3 className="lang-name">{lang.name}</h3>
            <div className="lang-bars">
              <LangBar label="Listening" value={lang.listen} />
              <LangBar label="Speaking"  value={lang.speak} />
              <LangBar label="Writing"   value={lang.write} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
