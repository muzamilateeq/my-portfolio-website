import { AnimatedHeadline } from '@/components/AnimatedHeadline'
import { HeroScene } from '@/components/HeroScene'
import { MagneticButton } from '@/components/MagneticButton'
import { TerminalPanel } from '@/components/TerminalPanel'

export function Hero() {
  return (
    <section className="hero-section" id="top">
      <HeroScene />
      <div className="hero-copy">
        <p className="eyebrow">Full-Stack Web & Mobile App Developer</p>
        <AnimatedHeadline />
        <p className="intro">
          I create fast, responsive, and scalable web and mobile applications
          using React, Next.js, React Native, TypeScript, Tailwind CSS,
          Supabase, Redux Toolkit, and Framer Motion.
        </p>
        <div className="hero-actions" aria-label="Portfolio actions">
          <MagneticButton className="primary-action" href="#contact">
            Start a project
          </MagneticButton>
          <MagneticButton className="secondary-action" href="#projects">
            View projects
          </MagneticButton>
        </div>
      </div>
      <TerminalPanel />
    </section>
  )
}
