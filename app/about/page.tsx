import { ExperienceTimeline } from '../../components/ExperienceTimeline'
import { experience } from '../../data/experience'
import { User, Award } from 'lucide-react'

export const metadata = {
  title: 'About & Experience | Muzammal Ateeq',
  description: 'My professional journey and career experience.',
}

export default function AboutPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto">
      
      {/* HEADER HERO */}
      <section className="relative rounded-[3rem] overflow-hidden glass-panel border border-white/15 p-8 md:p-14 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Career background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />

        <div className="relative z-20 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <User size={16} /> Career Timeline
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Career & Experience
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            My journey building software products, leading engineering workflows, and scaling web & mobile platforms.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="glass-panel p-8 md:p-14 rounded-[3rem] border border-white/15 shadow-2xl">
        <h2 className="text-2xl font-black text-white mb-12 text-center">Work Experience</h2>
        <div className="max-w-4xl mx-auto">
          <ExperienceTimeline experience={experience} />
        </div>
      </section>

    </div>
  )
}
