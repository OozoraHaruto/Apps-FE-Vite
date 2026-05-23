import { useTitle } from '../hooks/useTitle'
import type { AppListing } from '../models/app'
import AppCard from '../components/apps/AppCard'
import './Apps.css'

const APPS: AppListing[] = [
  {
    id: 'sg-weather',
    name: 'SG Weather Application',
    subtitle: 'A more accurate SG weather app',
    description:
      'Reads temperature from approximately 22 Singapore locations sourced from NEA (National Environment Agency) via data.gov.sg. Provides location-specific readings rather than a single generalised value — covering areas like Jurong, Pasir Ris, and more. No advertisements, on-device location calculations to protect your privacy, and home screen widgets included.',
    icon: '🌦',
    platforms: ['iOS', 'iPadOS', 'macOS', 'watchOS', 'visionOS'],
    price: 'Free',
    storeUrl: 'https://apps.apple.com/sg/app/sg-weather-application/id1535913667',
    category: 'Reference',
  },
]

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
