import { ProjectSpotlight } from '../../components/ProjectSpotlight'
import { projects } from '../../data/projects'
import { Briefcase, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Portfolio & Projects | Muzammal Ateeq',
  description: 'Explore my recent work and case studies.',
}

export default function PortfolioPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto">
      
      {/* HEADER HERO */}
      <section className="relative rounded-[3rem] overflow-hidden glass-panel border border-white/15 p-8 md:p-14 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
          alt="Portfolio background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />

        <div className="relative z-20 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Briefcase size={16} /> Selected Work & Case Studies
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Engineering Projects & Work
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            Explore production builds demonstrating high performance, intuitive UX, and clean architecture.
          </p>
        </div>
      </section>

      {/* PROJECTS LIST */}
      <section>
        <ProjectSpotlight projects={projects} limit={99} />
      </section>

    </div>
  )
}
