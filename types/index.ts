export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  problem?: string
  solution?: string
  metrics?: string[]
  stack: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
}
