import { ProjectSpotlight } from '@/components/ProjectSpotlight'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Portfolio | Muzammal Ateeq',
  description: 'Explore my full-stack projects, architectures, and case studies.',
}

export default function PortfolioPage() {
  return (
    <main className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Portfolio & Case Studies
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A comprehensive look at systems I've built. Click on any project card to open a deep-dive case study covering the problem, solution, architecture, and key metrics.
          </p>
        </div>

        <ProjectSpotlight projects={projects} />
      </div>
    </main>
  )
}
