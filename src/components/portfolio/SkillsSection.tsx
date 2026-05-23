import type { Skill } from '../../models/portfolio'
import Section from './Section'
import { getCodeLogo } from './utils'
import './SkillsSection.css'

import '@web.awesome.me/webawesome-pro/dist/components/progress-bar/progress-bar.js'

function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  const pct = Math.round((proficiency / 9) * 100)
  const icon = getCodeLogo(name)

  return (
    <div className="skill-row">
      <span className="skill-name">
        <wa-icon auto-width family="brands" name={icon ?? undefined} label={name} />
        {name}
      </span>
      <wa-progress-bar
        value={pct}
        label={`${name}: ${proficiency}/9`}
        style={{ '--track-height': '5px', '--indicator-color': '#f0c14a' } as React.CSSProperties}
      />
      <span className="skill-level">{proficiency}/9</span>
    </div>
  )
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const sorted = [...skills].sort((a, b) => b.proficiency - a.proficiency)
  return (
    <Section id="skills" eyebrow="Proficiency" title="Skills">
      <div className="skill-list">
        {sorted.map((s) => (
          <SkillBar key={s.name} name={s.name} proficiency={s.proficiency} />
        ))}
      </div>
    </Section>
  )
}
