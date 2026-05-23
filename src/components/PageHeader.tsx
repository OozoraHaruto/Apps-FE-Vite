import './PageHeader.css'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  color?: string
  large?: boolean
  slot?: string
}

export default function PageHeader({ eyebrow, title, subtitle, color, large, slot }: Props) {
  return (
    <div
      slot={slot}
      className={`page-main-header${large ? ' page-main-header--large' : ''}`}
      style={color ? ({ '--eyebrow-color': color } as React.CSSProperties) : undefined}
    >
      {eyebrow && <p className="page-main-eyebrow">{eyebrow}</p>}
      <h1 className="page-main-title">{title}</h1>
      {subtitle && <p className="page-main-subtitle">{subtitle}</p>}
    </div>
  )
}
