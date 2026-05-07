import { BentoGrid } from '@/components/BentoGrid'
import { ContactForm } from '@/components/ContactForm'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { PageTransition } from '@/components/PageTransition'
import { ProjectSpotlight } from '@/components/ProjectSpotlight'
import { SkillGrid } from '@/components/SkillGrid'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <PageTransition>
      <main className="site-shell">
        <Navbar />
        <Hero />
        <section className="metric-strip" aria-label="Professional strengths">
          <div>
            <strong>8</strong>
            <span>core technologies</span>
          </div>
          <div>
            <strong>Web</strong>
            <span>React and Next.js builds</span>
          </div>
          <div>
            <strong>Mobile</strong>
            <span>React Native experiences</span>
          </div>
        </section>
        <BentoGrid />
        <SkillGrid />
        <ProjectSpotlight projects={projects} />
        <ContactForm />
      </main>
    </PageTransition>
  )
}
