import { Link } from 'react-router'
import { useTitle } from '../hooks/useTitle'
import './Tools.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'

const TOOLS = [
  {
    id: 'password-generator',
    icon: '🔑',
    name: 'Password Generator',
    description: 'Generate strong, random passwords with customisable character sets and safety rules.',
  },
  {
    id: 'json-helper',
    icon: '{ }',
    name: 'JSON Helper',
    description: 'Compact or pretty-print JSON — encode it to a minified string, or decode it to readable format.',
  },
]

export default function Tools() {
  useTitle('Tools', true)

  return (
    <section className="tools-page">
      <ul className="tool-list">
        {TOOLS.map((tool) => (
          <li key={tool.id}>
            <Link to={`/tools/${tool.id}`} className="tool-card-link" aria-label={tool.name}>
              <wa-card className="tool-list-card">
                <div className="tool-card-inner">
                  <span className="tool-list-card-icon" aria-hidden="true">{tool.icon}</span>
                  <div className="tool-list-card-body">
                    <h2 className="tool-list-card-name">{tool.name}</h2>
                    <p className="tool-list-card-desc">{tool.description}</p>
                  </div>
                  <wa-icon name="arrow-right" family="duotone" className="tool-card-arrow" aria-hidden="true" />
                </div>
              </wa-card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
