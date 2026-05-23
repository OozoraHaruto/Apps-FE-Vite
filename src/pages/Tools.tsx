import { Link } from 'react-router'
import { useTitle } from '../hooks/useTitle'
import './Tools.css'

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
            <Link to={`/tools/${tool.id}`} className="tool-list-card">
              <span className="tool-list-card-icon" aria-hidden="true">{tool.icon}</span>
              <div className="tool-list-card-body">
                <h2 className="tool-list-card-name">{tool.name}</h2>
                <p className="tool-list-card-desc">{tool.description}</p>
              </div>
              <span className="tool-list-card-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
