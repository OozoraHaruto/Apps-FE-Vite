import type { Skill } from '../../models/portfolio'
import Section from './Section'
import { getCodeLogo } from './utils'
import './SkillsSection.css'

function SkillBar({ name, proficiency, index }: { name: string; proficiency: number; index: number }) {
  const pct = `${Math.round((proficiency / 9) * 100)}%`
  const icon = getCodeLogo(name)

  return (
    <div className="skill-row">
      <span className="skill-name">
        <wa-icon auto-width family="brands" name={icon ?? undefined} label={name}></wa-icon>
        {name}
      </span>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ '--bar-w': pct, animationDelay: `${index * 40}ms` } as React.CSSProperties}
        />
      </div>
      <span className="skill-level">{proficiency}/9</span>
    </div>
  )
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const sorted = [...skills].sort((a, b) => b.proficiency - a.proficiency)
  return (
    <Section id="skills" eyebrow="Proficiency" title="Skills">
      <div className="skill-list">
        {sorted.map((s, i) => (
          <SkillBar key={s.name} name={s.name} proficiency={s.proficiency} index={i} />
        ))}
      </div>
    </Section>
  )
}
