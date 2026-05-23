import { Routes, Route, Link, Navigate, useLocation } from 'react-router'
import ThemeSwitcher from './components/theme/ThemeSwitcher'
import UserMenu from './components/user/UserMenu'
import Home from './pages/Home'
import Apps from './pages/Apps'
import AppDetail, { privacySectionId } from './pages/AppDetail'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
import Tools from './pages/Tools'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import JsonHelper from './pages/tools/JsonHelper'
import { APPS, PRIVACY_DATA } from './data/appsData'

import '@web.awesome.me/webawesome-pro/dist/components/page/page.js'
import PageHeader from './components/PageHeader'
import { PAGE_COLORS } from './lib/colors'

const NAV_LINKS = [
  { to: '/apps', label: 'Apps' },
  { to: '/tools', label: 'Tools' },
  { to: '/portfolio', label: 'Portfolio' },
]

const TOOL_NAV = [
  { id: 'password-generator', label: 'Password Generator' },
  { id: 'json-helper', label: 'JSON Helper' },
]

const PORTFOLIO_NAV = [
  { id: 'work', label: 'Work History' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
]

interface PageHeaderConfig {
  eyebrow?: string
  title: string
  subtitle?: string
  color?: string
  large?: boolean
}

const PAGE_HEADERS: Record<string, PageHeaderConfig> = {
  '/apps':                     { eyebrow: 'Apps',      title: "Things I've built",        color: PAGE_COLORS.apps },
  '/tools':                    { eyebrow: 'Tools',     title: 'Useful little utilities',  color: PAGE_COLORS.tools },
  '/portfolio':                { eyebrow: 'Portfolio', title: 'Malcolm Chew',             color: PAGE_COLORS.portfolio,
                                 large: true, subtitle: 'Test Engineer — automation testing and quality assurance.' },
  '/tools/password-generator': { eyebrow: 'Tools',     title: 'Password Generator',       color: PAGE_COLORS.tools },
  '/tools/json-helper':        { eyebrow: 'Tools',     title: 'JSON Helper',              color: PAGE_COLORS.tools },
}

export default function App() {
  const location = useLocation()
  const isToolPage = location.pathname.startsWith('/tools/')
  const isPortfolio = location.pathname === '/portfolio'

  const appDetailMatch = location.pathname.match(/^\/apps\/([^/]+)$/)
  const appDetailId = appDetailMatch?.[1]
  const appDetailApp = appDetailId ? APPS.find((a) => a.id === appDetailId) : undefined
  const appDetailPrivacy = appDetailId ? PRIVACY_DATA[appDetailId] : undefined

  const header = PAGE_HEADERS[location.pathname] ?? (
    appDetailApp
      ? { eyebrow: 'Apps', title: appDetailApp.name, color: PAGE_COLORS.apps }
      : undefined
  )

  return (
    <wa-page>
      <div slot="header" className="app-header">
        <Link to="/" className="app-brand">Haruto Apps</Link>
        <nav className="app-header-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="app-header-nav-link">{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <UserMenu />
          <ThemeSwitcher />
        </div>
      </div>

      {header && <PageHeader slot="main-header" {...header} />}

      {isToolPage && (
        <nav slot="navigation" className="page-side-nav" aria-label="Tools">
          <p className="page-side-nav-label">Tools</p>
          {TOOL_NAV.map(({ id, label }) => (
            <Link key={id} to={`/tools/${id}`} className="page-side-nav-link">
              {label}
            </Link>
          ))}
        </nav>
      )}

      {isPortfolio && (
        <nav slot="navigation" className="page-side-nav" aria-label="On this page">
          <p className="page-side-nav-label">On this page</p>
          {PORTFOLIO_NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="page-side-nav-link">
              {label}
            </a>
          ))}
        </nav>
      )}

      {appDetailApp && (
        <nav slot="navigation" className="page-side-nav" aria-label="On this page">
          <p className="page-side-nav-label">On this page</p>
          <a href="#overview" className="page-side-nav-link">Overview</a>
          {appDetailPrivacy && (
            <>
              <a href="#privacy" className="page-side-nav-link">Privacy Policy</a>
              {appDetailPrivacy.sections.map(({ title }) => (
                <a
                  key={title}
                  href={`#${privacySectionId(title)}`}
                  className="page-side-nav-link page-side-nav-link--sub"
                >
                  {title}
                </a>
              ))}
            </>
          )}
        </nav>
      )}

      <div className="page-content">
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/:appId" element={<AppDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/json-helper" element={<JsonHelper />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </wa-page>
  )
}
