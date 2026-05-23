import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTitle } from '../hooks/useTitle'
import './Me.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'
import '@web.awesome.me/webawesome-pro/dist/components/divider/divider.js'
import '@web.awesome.me/webawesome-pro/dist/components/avatar/avatar.js'

const API = 'https://app-api-pr9v.onrender.com'

export default function Me() {
  useTitle('My Profile')
  const { user, payload, token, logout, refresh, loading } = useAuth()
  const [profileId, setProfileId] = useState<string | null>(null)
  const [tapCount, setTapCount] = useState(0)
  const showRaw = tapCount >= 5

  useEffect(() => {
    if (!token) return
    fetch(`${API}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.id) setProfileId(json.data.id)
      })
      .catch(() => {})
  }, [token])

  if (!user || !payload) {
    return <Navigate to="/auth/login" replace />
  }

  const sessionExpires = new Date(payload.exp * 1000).toLocaleString()

  return (
    <div className="me-page">
      <wa-card className="me-card">
        <div slot="media" className="me-card-hero" />
        <div className="me-card-body">
          <div
            className="me-avatar-wrapper"
            onClick={() => setTapCount((n) => n + 1)}
            role="button"
            aria-label="Profile picture"
          >
            <wa-avatar
              image={user.icon}
              label={user.name}
              shape="circle"
              style={{ '--size': '100%' } as React.CSSProperties}
            />
          </div>
          <h1 className="me-name">{user.name}</h1>
          <p className="me-subtitle">Haruto Apps member</p>

          <wa-divider style={{ '--spacing': '1.5rem 0' } as React.CSSProperties} />

          <ul className="me-info-list">
            <li className="me-info-row">
              <span className="me-info-label">
                <wa-icon name="fingerprint" variant="solid" />
                User ID
              </span>
              <code className="me-info-value">{profileId ?? '—'}</code>
            </li>
            <li className="me-info-row">
              <span className="me-info-label">
                <wa-icon name="clock" variant="solid" />
                Session expires
              </span>
              <span className="me-info-value me-info-value--muted">{sessionExpires}</span>
            </li>
          </ul>

          {showRaw && (
            <div className="me-raw-jwt">
              <p className="me-raw-jwt-label">Raw JWT payload</p>
              <pre className="me-raw-jwt-body">{JSON.stringify(payload, null, 2)}</pre>
            </div>
          )}

          <div className="me-actions">
            <wa-button
              appearance="outlined"
              class="me-refresh-btn"
              onClick={refresh}
              loading={loading || undefined}
            >
              <wa-icon slot="start" name="rotate" variant="solid" />
              Refresh session
            </wa-button>
            <wa-button
              variant="danger"
              appearance="outlined"
              class="me-logout-btn"
              onClick={logout}
            >
              <wa-icon slot="start" name="right-from-bracket" variant="solid" />
              Sign out
            </wa-button>
          </div>
        </div>
      </wa-card>
    </div>
  )
}
