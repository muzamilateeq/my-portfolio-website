'use client'

import { motion } from 'framer-motion'

const profile = [
  {
    label: 'Profile',
    wide: true,
    heading: 'Full-stack thinking, interface-level precision.',
    body: 'I\'m Muzammal Ateeq — a full-stack developer who builds applications where the UI is sharp, the data model is clean, and the product is ready to ship. I specialize in React, Next.js, and React Native ecosystems.',
  },
  {
    label: 'Frontend',
    heading: 'Web & Mobile Systems',
    body: null,
    chips: ['React', 'Next.js 16', 'React Native', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend & Data',
    heading: 'Infrastructure & APIs',
    body: null,
    chips: ['Supabase', 'PostgreSQL', 'REST APIs', 'Auth & RLS', 'Redux Toolkit'],
  },
]

export function BentoGrid() {
  return (
    <div className="bento-grid">
      {profile.map((card, i) => (
        <motion.div
          key={card.label}
          className={`bento-card${card.wide ? ' wide' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
        >
          <div className="bento-label">{card.label}</div>
          <h3>{card.heading}</h3>
          {card.body && <p style={{ marginTop: '0.5rem' }}>{card.body}</p>}
          {card.chips && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
              {card.chips.map(c => (
                <span key={c} className="skill-chip" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>{c}</span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
