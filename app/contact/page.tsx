import { ContactForm } from '@/components/ContactForm'
import { GitFork, ExternalLink, Mail, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Contact | Muzammal Ateeq',
  description: 'Get in touch for freelance opportunities, full-time roles, or just to say hi.',
}

export default function ContactPage() {
  return (
    <main className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Let's build something great.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">
              Whether you have a specific project in mind, need a full-stack engineer for your team, or just want to chat about tech—I'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 mb-1">Email</div>
                  <a href="mailto:muzamilateeq423@gmail.com" className="font-semibold hover:text-indigo-600 transition-colors">
                    muzamilateeq423@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 mb-1">Location</div>
                  <span className="font-semibold">Pakistan</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Connect on Socials</h3>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all">
                  <GitFork size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a message</h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  )
}
