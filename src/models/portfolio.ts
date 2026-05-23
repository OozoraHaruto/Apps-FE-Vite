export interface WorkExperience {
  company: string
  title: string
  logo: string
  summary: string
  details: Record<string, string[]>
  scope: string[]
  programming: string[]
  from: string
  to: string
}

export interface Skill {
  name: string
  proficiency: number
}

export interface School {
  name: string
  grade: string
  logo: string
  from: string
  to: string
}

export interface Certification {
  name: string
  image: string
  date: string
}

export interface Language {
  name: string
  listen: number
  speak: number
  write: number
}

export interface ProjectLink {
  name: string
  url: string
}

export interface Project {
  name: string
  description: string
  image: string
  lastUpdate: string
  languages: string[]
  links: ProjectLink[]
}
