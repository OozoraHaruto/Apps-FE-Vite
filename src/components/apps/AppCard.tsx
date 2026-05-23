import { Link } from 'react-router'
import type { AppListing, Platform } from '../../models/app'
import './AppCard.css'

const PLATFORM_META: Record<Platform, { label: string; color: string }> = {
  iOS:       { label: 'iPhone',       color: '#0A84FF' },
  iPadOS:    { label: 'iPad',         color: '#5E5CE6' },
  macOS:     { label: 'Mac',          color: '#30D158' },
  watchOS:   { label: 'Apple Watch',  color: '#FF9F0A' },
  visionOS:  { label: 'Apple Vision', color: '#BF5AF2' },
  Android:   { label: 'Android',      color: '#3DDC84' },
  Web:       { label: 'Web',          color: '#0A84FF' },
}

export default function AppCard({ app }: { app: AppListing }) {
  return (
    <article className="app-card">
      <div className="app-card-icon" aria-hidden="true">
        {app.icon.startsWith('http') ? (
          <img src={app.icon} alt="" className="app-card-icon-img" />
        ) : (
          app.icon
        )}
      </div>

      <div className="app-card-body">
        <div className="app-card-top">
          <div>
            <h2 className="app-card-name">{app.name}</h2>
            <p className="app-card-subtitle">{app.subtitle}</p>
          </div>
          <span className="app-card-price">{app.price}</span>
        </div>

        <p className="app-card-desc">{app.description}</p>

        <div className="app-card-footer">
          <div className="platform-chips" role="list" aria-label="Supported platforms">
            {app.platforms.map((p) => (
              <span
                key={p}
                role="listitem"
                className="platform-chip"
                style={{ '--chip-color': PLATFORM_META[p].color } as React.CSSProperties}
              >
                {PLATFORM_META[p].label}
              </span>
            ))}
          </div>

          <div className="app-card-links">
            {app.storeUrl && (
              <a
                href={app.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="app-store-btn"
              >
                App Store
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
            {app.privacyPath && (
              <Link to={app.privacyPath} className="app-privacy-link">
                Privacy Policy
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
