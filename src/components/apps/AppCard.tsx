import { Link } from 'react-router'
import type { AppListing, Platform } from '../../models/app'
import './AppCard.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/tag/tag.js'
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

export default function AppCard({ app }: { app: AppListing }) {
  return (
    <Link to={`/apps/${app.id}`} className="app-card-link" aria-label={`View ${app.name}`}>
      <wa-card className="app-card">
        <div className="app-card-icon" aria-hidden="true">
          {app.icon.startsWith('http') ? (
            <img src={app.icon} alt="" className="app-card-icon-img" />
          ) : (
            app.icon
          )}
        </div>

        <div className="app-card-info">
          <h2 className="app-card-name">{app.name}</h2>
          <p className="app-card-subtitle">{app.subtitle}</p>
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
          <div
            slot="footer"
            className="app-card-actions"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <wa-button
              href={app.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              appearance="outlined"
              size="s"
              pill
            >
              App Store
              <wa-icon slot="end" name="arrow-up-right-from-square" />
            </wa-button>
          </div>
        )}
      </wa-card>
    </Link>
  )
}
