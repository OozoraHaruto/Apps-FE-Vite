import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTitle } from '../hooks/useTitle'
import HarutoAppCard, { type HomeApp } from '../components/haruto/HarutoAppCard'
import './Haruto.css'

import '@web.awesome.me/webawesome-pro/dist/components/details/details.js'
import '@web.awesome.me/webawesome-pro/dist/components/skeleton/skeleton.js'
import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/copy-button/copy-button.js'

const API = 'https://api.harutoapps.org/home'

interface ProductKey {
  item: string
  productKey: string
  platform: string
}

function useHarutoData(token: string | null, isMe: boolean, isAllowed: boolean) {
  const [apps, setApps] = useState<HomeApp[] | null>(null)
  const [appsOfficial, setAppsOfficial] = useState<HomeApp[] | null>(null)
  const [macKeys, setMacKeys] = useState<ProductKey[] | null>(null)
  const [winKeys, setWinKeys] = useState<ProductKey[] | null>(null)

  useEffect(() => {
    if (!isMe || !token) return
    fetch(`${API}/apps`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data) setApps(json.data) })
      .catch(() => {})
  }, [isMe, token])

  useEffect(() => {
    if (!isAllowed || !token) return
    fetch(`${API}/appsOfficial`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data) setAppsOfficial(json.data) })
      .catch(() => {})
  }, [isAllowed, token])

  useEffect(() => {
    if (!isMe || !token) return
    fetch(`${API}/productKeys`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (!json.success || !json.data) return
        const data: ProductKey[] = json.data
        setMacKeys(data.filter((k) => k.platform === 'マック'))
        setWinKeys(data.filter((k) => k.platform === 'ウインドーズ'))
      })
      .catch(() => {})
  }, [isMe, token])

  return { apps, appsOfficial, macKeys, winKeys }
}

/* ─── Skeleton card ────────────────────────────────────────── */
function CardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <wa-card
      className="h-skeleton"
      style={{ '--anim-delay': `${delay}s`, '--spacing': '0' } as CSSProperties}
    >
      <wa-skeleton slot="media" effect="sheen" className="h-skeleton-img" />
      <div className="h-skeleton-body">
        <wa-skeleton effect="sheen" className="h-skeleton-line h-skeleton-line--title" />
        <wa-skeleton effect="sheen" className="h-skeleton-line h-skeleton-line--a" />
      </div>
    </wa-card>
  )
}

/* ─── Product key table ────────────────────────────────────── */
function KeysTable({ title, keys }: { title: string; keys: ProductKey[] }) {
  return (
    <table className="h-keys-table">
      <caption className="h-keys-caption">{title}</caption>
      <thead>
        <tr>
          <th className="h-keys-th">Item</th>
          <th className="h-keys-th">Product Key</th>
          <th className="h-keys-th h-keys-th--copy" />
        </tr>
      </thead>
      <tbody>
        {keys.length > 0 ? (
          keys.map((key, i) => (
            <tr key={i}>
              <th scope="row">{key.item}</th>
              <td>{key.productKey}</td>
              <td className="h-keys-td--copy">
                <wa-copy-button value={key.productKey} {...{ tooltip: 'none' } as object}>
                  <wa-button variant="neutral" appearance="plain" size="xs"><wa-icon name="copy" label="Copy" /></wa-button>
                </wa-copy-button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} style={{ color: 'var(--wa-color-text-subtle)', padding: '0.5rem' }}>
              —
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const SKELETON_COUNT = 4

/* ─── Page ─────────────────────────────────────────────────── */
export default function Haruto() {
  useTitle("Haruto's Apps")
  const { user, payload, token } = useAuth()

  const isMe = payload?.allowed.includes('haruto/*') ?? false
  const isAllowed = isMe || (payload?.allowed.includes('haruto/appsOfficial') ?? false)

  const { apps, appsOfficial, macKeys, winKeys } = useHarutoData(token, isMe, isAllowed)

  if (!user || !payload) return <Navigate to="/auth/login" replace />
  if (!isAllowed) return <Navigate to="/" replace />

  return (
    <div className="h-page">
      {isMe && (
        <wa-details className="h-section" open summary="アプリ — My Apps">
          <div className="h-grid">
            {apps
              ? apps.map((app, i) => (
                  <HarutoAppCard key={i} app={app} delay={i * 0.045} />
                ))
              : Array.from({ length: SKELETON_COUNT }, (_, i) => (
                  <CardSkeleton key={i} delay={i * 0.045} />
                ))}
          </div>
        </wa-details>
      )}

      <wa-details className="h-section" open={!isMe || undefined} summary="他のアプリ — Official Apps">
        <div className="h-grid">
          {appsOfficial
            ? appsOfficial.map((app, i) => (
                <HarutoAppCard key={i} app={app} delay={i * 0.045} />
              ))
            : Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <CardSkeleton key={i} delay={i * 0.045} />
              ))}
        </div>
      </wa-details>

      {isMe && (
        <wa-details className="h-section" summary="Product Keys — プロダクトキー">
          <div className="h-keys-grid">
            {macKeys && winKeys ? (
              <>
                <KeysTable title="マック" keys={macKeys} />
                <KeysTable title="ウインドーズ" keys={winKeys} />
              </>
            ) : (
              <p style={{ color: 'var(--wa-color-text-subtle)', fontSize: '0.875rem', margin: 0 }}>
                Loading…
              </p>
            )}
          </div>
        </wa-details>
      )}
    </div>
  )
}
