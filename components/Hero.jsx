'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

export function Hero() {
  return (
    <section className="section hero-section">
      <div className="container hero-content">
        <motion.div {...fadeUp(0)}>
          <div className="status-badge">
            <span className="status-dot" />
            Available for new projects
          </div>
        </motion.div>

        <motion.h1 className="display-xl gradient-text" {...fadeUp(0.08)}>
          Muzammal<br />Ateeq
        </motion.h1>

        <motion.p
          className="text-lg"
          style={{ marginTop: '1.25rem', maxWidth: '620px' }}
          {...fadeUp(0.16)}
        >
          Full-Stack Developer specializing in high-performance web & mobile apps.
          I craft clean architecture, stunning UI and production-ready Next.js + React Native products.
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.24)}>
          <Link href="/portfolio" className="btn btn-primary">
            View My Work <ArrowRight size={15} />
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Let's Talk <Sparkles size={14} />
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp(0.32)}
          style={{
            marginTop: '4rem',
            display: 'flex',
            gap: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '15+', label: 'Projects Shipped' },
            { num: '3+',  label: 'Years Experience' },
            { num: '100%', label: 'Client Satisfaction' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ font: '700 2rem/1 var(--ff-head)', letterSpacing: '-0.04em', color: 'var(--c-text)' }}>{num}</div>
              <div className="text-sm text-muted" style={{ marginTop: '0.3rem' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
