import { useEffect, useState } from 'react'
import { useTitle } from '../hooks/useTitle'
import './Portfolio.css'

import '@web.awesome.me/webawesome-pro/dist/components/spinner/spinner.js'
import '@web.awesome.me/webawesome-pro/dist/components/callout/callout.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'
import type {
  Certification, Language, Project, School, Skill, WorkExperience,
} from '../models/portfolio'
import { fetchSection } from '../components/portfolio/utils'
import WorkSection from '../components/portfolio/WorkSection'
import SkillsSection from '../components/portfolio/SkillsSection'
import ProjectsSection from '../components/portfolio/ProjectsSection'
import EducationSection from '../components/portfolio/EducationSection'
import LanguagesSection from '../components/portfolio/LanguagesSection'

interface PortfolioState {
  work: WorkExperience[]
  skills: Skill[]
  schools: School[]
  certifications: Certification[]
  languages: Language[]
  projects: Project[]
  loading: boolean
  error: string | null
}

export default function Portfolio() {
  useTitle("Malcolm's Portfolio")

  const [state, setState] = useState<PortfolioState>({
    work: [], skills: [], schools: [], certifications: [],
    languages: [], projects: [], loading: true, error: null,
  })

  useEffect(() => {
    Promise.all([
      fetchSection<WorkExperience>('work'),
      fetchSection<Skill>('skills'),
      fetchSection<School>('schools'),
      fetchSection<Certification>('certifications'),
      fetchSection<Language>('languages'),
      fetchSection<Project>('projects'),
    ]).then(([work, skills, schools, certifications, languages, projects]) => {
      setState({ work, skills, schools, certifications, languages, projects, loading: false, error: null })
    }).catch((err: Error) => {
      setState((s) => ({ ...s, loading: false, error: err.message }))
    })
  }, [])

  if (state.loading) {
    return (
      <div className="pf-loading">
        <wa-spinner />
        Loading portfolio…
      </div>
    )
  }

  if (state.error) {
    return (
      <wa-callout variant="danger">
        <wa-icon slot="icon" name="circle-xmark" family="duotone" />
        Failed to load portfolio: {state.error}
      </wa-callout>
    )
  }

  return (
    <div className="portfolio-page">
      <WorkSection        work={state.work} />
      <SkillsSection      skills={state.skills} />
      <ProjectsSection    projects={state.projects} />
      <EducationSection   schools={state.schools} certifications={state.certifications} />
      <LanguagesSection   languages={state.languages} />
    </div>
  )
}
