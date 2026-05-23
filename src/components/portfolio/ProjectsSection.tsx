import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../models/portfolio'
import LogoImg from './LogoImg'
import Section from './Section'
import { getCodeLogo, linkUrl } from './utils'
import './ProjectsSection.css'

import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'
import '@web.awesome.me/webawesome-pro/dist/components/tag/tag.js'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-inner">
        <div className="project-top">
          <div className="project-title-group">
            <LogoImg path={project.image} alt={project.name} size={32} />
            <h3 className="project-name">{project.name}</h3>
          </div>
        </div>
        <p className="project-desc">{project.description}</p>
        <div className="project-footer">
          <div className="tech-chips">
            {project.languages.map((l) => {
              const icon = getCodeLogo(l)
              return (
                <wa-tag key={l} className="tech-chip">
                  {icon && <wa-icon family="brands" name={icon} aria-hidden="true" />}
                  {l}
                </wa-tag>
              )
            })}
          </div>
          <div className="project-links">
            {project.links.map((link) => (
              <wa-button
                key={link.name}
                href={linkUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                appearance="outlined"
                size="s"
                pill
              >
                {link.name}
                <wa-icon slot="end" name="arrow-up-right-from-square" />
              </wa-button>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      const style = getComputedStyle(grid)
      const templateCols = style.gridTemplateColumns.split(' ').filter(Boolean)
      setCols(templateCols.length || 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [])

  const visible = expanded ? projects : projects.slice(0, cols)
  const hiddenCount = projects.length - cols

  return (
    <Section id="projects" eyebrow="Personal" title="Projects">
      <div className="project-grid" ref={gridRef}>
        {visible.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
      {hiddenCount > 0 && (
        <wa-button
          className="projects-toggle"
          pill
          appearance="outlined"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : `Show ${hiddenCount} more`}
        </wa-button>
      )}
    </Section>
  )
}
