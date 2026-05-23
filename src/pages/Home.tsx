import { useTitle } from '../hooks/useTitle'
import HubPanel from '../components/home/HubPanel'
import { PAGE_COLORS } from '../lib/colors'
import './Home.css'

const PANELS = [
  {
    to: '/apps',
    numeral: '01',
    eyebrow: 'Explore',
    heading: 'Apps',
    body: "Projects & tools I've shipped",
    cta: 'View all',
    accent: PAGE_COLORS.apps,
  },
  {
    to: '/tools',
    numeral: '02',
    eyebrow: 'Utilities',
    heading: 'Tools',
    body: 'Handy little utilities',
    cta: 'Explore',
    accent: PAGE_COLORS.tools,
  },
  {
    to: '/portfolio',
    numeral: '03',
    eyebrow: 'About me',
    heading: 'Portfolio',
    body: 'Work history, skills & contact',
    cta: 'View CV',
    accent: PAGE_COLORS.portfolio,
  },
]

export default function Home() {
  useTitle()

  return (
    <div className="home-hub">
      {PANELS.map((panel) => (
        <HubPanel key={panel.to} {...panel} />
      ))}
    </div>
  )
}
