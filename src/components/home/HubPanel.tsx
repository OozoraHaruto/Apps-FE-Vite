import { Link } from 'react-router'
import { useIsDark } from '../../hooks/useIsDark'
import './HubPanel.css'

interface Props {
  to: string
  numeral: string
  eyebrow: string
  heading: string
  body: string
  cta: string
  accent: string
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function mixWith(hex: string, weight: number, tr: number, tg: number, tb: number): string {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * weight + tr * (1 - weight))
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * weight + tg * (1 - weight))
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * weight + tb * (1 - weight))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default function HubPanel({ to, numeral, eyebrow, heading, body, cta, accent }: Props) {
  const dark = useIsDark()
  const bg = dark
    ? mixWith(accent, 0.12, 0, 0, 0)
    : mixWith(accent, 0.10, 255, 255, 255)

  const textColor = dark ? accent : mixWith(accent, 0.45, 0, 0, 0)
  const ctaText = dark ? bg : textColor

  return (
    <Link
      to={to}
      className="hub-panel"
      style={{
        '--hub-bg': bg,
        '--hub-text': textColor,
        '--hub-accent': accent,
        '--hub-dot': hexToRgba(accent, 0.1),
        '--hub-overlay': hexToRgba(bg, 0.82),
        '--hub-cta-text': ctaText,
        '--hub-numeral-opacity': dark ? '0.09' : '0.20',
        '--hub-numeral-hover-opacity': dark ? '0.16' : '0.30',
      } as React.CSSProperties}
    >
      <span className="hub-numeral" aria-hidden="true">{numeral}</span>
      <div className="hub-content">
        <p className="hub-eyebrow">{eyebrow}</p>
        <h2 className="hub-heading">{heading}</h2>
        <p className="hub-body">{body}</p>
        <span className="hub-cta">
          {cta}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
