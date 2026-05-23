import { useParams, Navigate, useLocation } from 'react-router'
import { useEffect } from 'react'
import { APPS, PRIVACY_DATA } from '../data/appsData'
import { useTitle } from '../hooks/useTitle'
import type { Platform } from '../models/app'
import './AppDetail.css'

import '@web.awesome.me/webawesome-pro/dist/components/tag/tag.js'
import '@web.awesome.me/webawesome-pro/dist/components/badge/badge.js'
import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'

const PLATFORM_META: Record<Platform, { label: string; color: string }> = {
  iOS:       { label: 'iPhone',       color: '#0A84FF' },
  iPadOS:    { label: 'iPad',         color: '#5E5CE6' },
  macOS:     { label: 'Mac',          color: '#30D158' },
  watchOS:   { label: 'Apple Watch',  color: '#FF9F0A' },
  visionOS:  { label: 'Apple Vision', color: '#BF5AF2' },
  Android:   { label: 'Android',      color: '#3DDC84' },
  Web:       { label: 'Web',          color: '#0A84FF' },
}

export function privacySectionId(title: string) {
  return `privacy-${title.toLowerCase().replace(/\s+/g, '-')}`
}

export default function AppDetail() {
  const { appId } = useParams<{ appId: string }>()
  const location = useLocation()

  const app = APPS.find((a) => a.id === appId)
  const privacy = appId ? PRIVACY_DATA[appId] : undefined

  useTitle(app ? app.name : 'App', true)

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [location.hash])

  if (!app) return <Navigate to="/" replace />

  return (
    <div className="app-detail">
      <section id="overview" className="app-detail-overview">
        <div className="app-detail-header">
          <div className="app-detail-icon" aria-hidden="true">
            {app.icon.startsWith('http') ? (
              <img src={app.icon} alt="" className="app-detail-icon-img" />
            ) : (
              app.icon
            )}
          </div>
          <div className="app-detail-meta">
            <div className="app-detail-title-row">
              <div>
                <p className="app-detail-subtitle">{app.subtitle}</p>
              </div>
              <wa-badge variant="success" appearance="outlined" pill>{app.price}</wa-badge>
            </div>
            <div className="platform-chips" role="list" aria-label="Supported platforms">
              {app.platforms.map((p) => (
                <wa-tag
                  key={p}
                  role="listitem"
                  pill
                  className="platform-tag"
                  style={{ '--chip-color': PLATFORM_META[p].color } as React.CSSProperties}
                >
                  {PLATFORM_META[p].label}
                </wa-tag>
              ))}
            </div>
            {app.storeUrl && (
              <wa-button
                href={app.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                appearance="outlined"
                pill
              >
                Download on App Store
                <wa-icon slot="end" name="arrow-up-right-from-square" />
              </wa-button>
            )}
          </div>
        </div>
        <p className="app-detail-desc">{app.description}</p>
      </section>

      {privacy && (
        <section id="privacy" className="app-detail-privacy-card">
          <h2 className="app-detail-section-heading">Privacy Policy</h2>
          <p className="app-detail-privacy-intro">{privacy.intro}</p>

          {privacy.sections.map(({ color, title, facts }) => (
            <section
              key={title}
              id={privacySectionId(title)}
              className="app-detail-privacy-section"
            >
              <div className="app-detail-privacy-section-header">
                <span
                  className="pp-section-pip"
                  style={{ background: color, boxShadow: `0 0 8px ${color}8c` }}
                />
                <h3 className="pp-section-title">{title}</h3>
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
            <span className="pp-footer-text">{privacy.footerText}</span>
            <span className="pp-footer-dot" />
          </footer>
        </section>
      )}
    </div>
  )
}
