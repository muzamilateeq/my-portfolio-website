import { ContactForm } from '../../components/ContactForm'
import { Mail, MapPin, GitFork, ExternalLink, Send } from 'lucide-react'

export const metadata = {
  title: 'Contact | Muzammal Ateeq',
  description: 'Get in touch for freelance projects, open roles, and consultation.',
}

export default function ContactPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto">
      
      {/* HEADER HERO */}
      <section className="relative rounded-[3rem] overflow-hidden glass-panel border border-white/15 p-8 md:p-14 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Contact background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />

        <div className="relative z-20 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Send size={16} /> Direct Inquiry
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Let's Build Something Great
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            Available for full-stack engineering roles, technical consultations, and high-impact freelance builds.
          </p>
        </div>
      </section>

      {/* FORM & DETAILS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 glass-panel p-8 md:p-12 rounded-[3rem] border border-white/15 shadow-2xl flex flex-col justify-between space-y-8">
          <div className="space-y-8">
              <div className="flex items-center gap-5 text-slate-400 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:scale-105 transition-transform shrink-0">
                  <Mail size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Email</div>
                  <a href="mailto:muzamilateeq423@gmail.com" className="font-extrabold text-sm sm:text-base md:text-lg text-slate-200 hover:text-violet-300 transition-colors break-all block">
                    muzamilateeq423@gmail.com
                  </a>
                </div>
              </div>

            <div className="flex items-center gap-5 text-slate-400 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Location</div>
                <span className="font-extrabold text-lg text-slate-200">Pakistan</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Social Networks</h3>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-slate-400 hover:text-violet-300 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all">
                <GitFork size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-[3rem] border border-white/15 shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-8">Send a Message</h3>
          <ContactForm />
        </div>
      </section>

    </div>
  )
}
