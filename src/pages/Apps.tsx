import { useTitle } from '../hooks/useTitle'
import { APPS } from '../data/appsData'
import AppCard from '../components/apps/AppCard'
import './Apps.css'

export default function Apps() {
  useTitle('Apps', true)

  return (
    <section className="apps-page">
      <ul className="app-list">
        {APPS.map((app) => (
          <li key={app.id}>
            <AppCard app={app} />
          </li>
        ))}
      </ul>
    </section>
  )
}
