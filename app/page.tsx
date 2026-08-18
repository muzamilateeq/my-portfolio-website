import Link from 'next/link'
import { ArrowRight, TerminalIcon, ExternalLink, Sparkles, Code2, Cpu, Layers, Rocket, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { projects } from '../data/projects'
import { Project } from '../types'
import { LiveTerminal } from '../components/LiveTerminal'
import { CodeShowcase } from '../components/CodeShowcase'

export const metadata = {
  title: 'Muzammal Ateeq | Senior Full-Stack Engineer',
  description: 'Full-Stack Developer specializing in Next.js, React Native, and high-performance system architectures.',
}

export default function HomePage() {
  const featuredProjects = projects.filter((p: Project) => p.featured).slice(0, 3)

  return (
    <div className="p-6 md:p-12 space-y-16 max-w-7xl mx-auto">
      
      {/* HERO SECTION WITH DEVELOPER BACKGROUND */}
      <section className="relative rounded-[3rem] overflow-hidden glass-panel border border-white/15 p-8 md:p-16 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
          alt="Developer background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />

        <div className="relative z-20 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles size={14} className="text-violet-400" />
            Senior Full-Stack Engineer & Systems Architect
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Architecting high-scale web & mobile systems with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(139,92,246,0.4)]">
              world-class execution.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            Building production applications with Next.js, React Native, Node.js, and PostgreSQL. Focused on ultra-fast performance, strict security, and elegant UX.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 font-extrabold text-white shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_55px_rgba(139,92,246,0.7)] hover:-translate-y-0.5"
            >
              Start a Project <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white/10 border border-white/20 px-8 font-bold text-white hover:bg-white/20 transition-all"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* PERFORMANCE METRICS BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Average API Latency', value: '<45ms', color: 'text-emerald-400' },
          { label: 'Production Uptime', value: '99.9%', color: 'text-cyan-400' },
          { label: 'Type Safety Standard', value: '100%', color: 'text-violet-400' },
          { label: 'Shipped Applications', value: '15+', color: 'text-fuchsia-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border border-white/10 text-center hover:border-violet-500/40 transition-all shadow-xl">
            <p className={`text-3xl md:text-4xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* INTERACTIVE CODE IDE SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <Code2 size={16} /> Live Architecture Code Preview
          </div>
          <span className="text-xs font-bold text-slate-400">Click tabs to switch files</span>
        </div>
        <CodeShowcase />
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">
              <Layers size={14} /> Production Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Selected Engineering Work</h2>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
            View all work <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group glass-panel rounded-[3rem] overflow-hidden border border-white/15 shadow-2xl hover:border-violet-500/50 hover:shadow-[0_0_60px_rgba(139,92,246,0.25)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden bg-slate-950/80 p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {(project.stack || []).map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    {project.shortDescription || project.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link 
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-full hover:from-violet-500 hover:to-indigo-500 shadow-lg transition-all"
                  >
                    Explore Case Study <ExternalLink size={16} />
                  </Link>
                  <span className="text-xs font-bold text-slate-400">Verified Build</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE COMMAND LINE */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
            <TerminalIcon size={20} className="text-cyan-400" />
            <h3 className="text-xl font-extrabold text-white">Interactive Command Line</h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Type 'help'</span>
        </div>
        <div className="rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
          <LiveTerminal />
        </div>
      </section>

    </div>
  )
}
