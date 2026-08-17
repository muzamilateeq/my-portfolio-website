import { ExperienceTimeline } from '@/components/ExperienceTimeline'

export const metadata = {
  title: 'Experience | Muzammal Ateeq',
  description: 'My career journey, experience, and professional background as a Full-Stack Developer.',
}

export default function AboutPage() {
  return (
    <main className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Career & Experience
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            My professional journey building software for startups, agencies, and enterprise clients over the past few years.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <ExperienceTimeline />
        </div>
      </div>
    </main>
  )
}
