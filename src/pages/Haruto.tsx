import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTitle } from '../hooks/useTitle'
import HarutoAppCard, { type HomeApp } from '../components/haruto/HarutoAppCard'
import './Haruto.css'

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

/* ─── Chevron icon ─────────────────────────────────────────── */
function Chevron() {
  return (
    <svg
      className="h-chevron"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* ─── Skeleton card ────────────────────────────────────────── */
function CardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="h-skeleton"
      style={{ '--anim-delay': `${delay}s` } as CSSProperties}
    >
      <div className="h-skeleton-img" />
      <div className="h-skeleton-body">
        <div className="h-skeleton-line h-skeleton-line--title" />
        <div className="h-skeleton-line h-skeleton-line--a" />
      </div>
    </div>
  )
}

/* ─── Animated section ─────────────────────────────────────── */
function Section({
  title,
  label,
  children,
  defaultOpen = true,
}: {
  title: string
  label?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`h-section${open ? ' h-section--open' : ''}`}>
      <button
        type="button"
        className="h-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="h-toggle-left">
          <span className="h-toggle-title">{title}</span>
          {label && <span className="h-toggle-sub">{label}</span>}
        </span>
        <span className="h-toggle-right">
          <Chevron />
        </span>
      </button>

      <div className="h-collapse">
        <div className="h-collapse-inner">
          <div className="h-body">{children}</div>
        </div>
      </div>
    </div>
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
        </tr>
      </thead>
      <tbody>
        {keys.length > 0 ? (
          keys.map((key, i) => (
            <tr key={i}>
              <th scope="row">{key.item}</th>
              <td>{key.productKey}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} style={{ color: 'var(--wa-color-text-subtle)', padding: '0.5rem' }}>
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
        <Section title="アプリ" label="My Apps" defaultOpen>
          <div className="h-grid">
            {apps
              ? apps.map((app, i) => (
                  <HarutoAppCard key={i} app={app} delay={i * 0.045} />
                ))
              : Array.from({ length: SKELETON_COUNT }, (_, i) => (
                  <CardSkeleton key={i} delay={i * 0.045} />
                ))}
          </div>
        </Section>
      )}

      <Section title="他のアプリ" label="Official Apps" defaultOpen={!isMe}>
        <div className="h-grid">
          {appsOfficial
            ? appsOfficial.map((app, i) => (
                <HarutoAppCard key={i} app={app} delay={i * 0.045} />
              ))
            : Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <CardSkeleton key={i} delay={i * 0.045} />
              ))}
        </div>
      </Section>

      {isMe && (
        <Section title="Product Keys" label="プロダクトキー" defaultOpen={false}>
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
        </Section>
      )}
    </div>
  )
}
