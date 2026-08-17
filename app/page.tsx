import { Hero } from '../components/Hero'
import { TechStack } from '../components/TechStack'
import { ProjectSpotlight } from '../components/ProjectSpotlight'
import { LiveTerminal } from '../components/LiveTerminal'
import { projects } from '../data/projects'
import { Project } from '../types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Muzammal Ateeq | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in Next.js, React Native, and high-performance system architectures.',
}

export default function HomePage() {
  const featuredProjects = projects.filter((p: Project) => p.featured)

  return (
    <main>
      <Hero />
      
      <TechStack />

      <section className="py-24 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Selected Work</h2>
              <p className="mt-4 text-slate-500 text-lg max-w-2xl">
                A showcase of production-ready applications prioritizing user experience, scale, and clean architecture.
              </p>
            </div>
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          
          <ProjectSpotlight projects={featuredProjects} limit={2} />
        </div>
      </section>

      <section className="py-24 border-t border-slate-200 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Live Terminal</h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Interact with my portfolio using a fully functional command-line interface. Try typing 'help'.
            </p>
          </div>
          
          <LiveTerminal />
        </div>
      </section>

      <section className="py-24 border-t border-slate-200 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            Ready to scale your next idea?
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
            Available for full-stack engineering roles, freelance builds, and technical consultations. I usually respond within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-indigo-600 px-8 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  )
}
