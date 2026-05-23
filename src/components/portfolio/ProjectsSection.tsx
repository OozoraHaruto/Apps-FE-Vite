import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../models/portfolio'
import LogoImg from './LogoImg'
import Section from './Section'
import { getCodeLogo, linkUrl } from './utils'
import './ProjectsSection.css'

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
                <span key={l} className="tech-chip">
                  {icon && <wa-icon family="brands" name={icon} aria-hidden="true"></wa-icon>}
                  {l}
                </span>
              )
            })}
          </div>
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.name}
                href={linkUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {link.name}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
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
        <button className="projects-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `Show ${hiddenCount} more`}
        </button>
      )}
    </Section>
  )
}
