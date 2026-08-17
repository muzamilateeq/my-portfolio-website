'use client'

import { motion } from 'framer-motion'

const skills = [
  { name: 'React.js',       cat: 'Frontend'   },
  { name: 'Next.js 16',     cat: 'Fullstack'  },
  { name: 'React Native',   cat: 'Mobile'     },
  { name: 'TypeScript',     cat: 'Language'   },
  { name: 'Tailwind CSS',   cat: 'Styling'    },
  { name: 'Supabase',       cat: 'Database'   },
  { name: 'Redux Toolkit',  cat: 'State'      },
  { name: 'Framer Motion',  cat: 'Animation'  },
  { name: 'REST APIs',      cat: 'Backend'    },
  { name: 'PostgreSQL',     cat: 'Database'   },
]

export function SkillGrid() {
  return (
    <div>
      <div className="eyebrow">Technical Stack</div>
      <h2 className="display-md" style={{ marginBottom: '0.25rem' }}>Core Expertise</h2>
      <p className="text-lg" style={{ maxWidth: '520px' }}>
        Technologies I use daily to build fast, scalable products.
      </p>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <motion.span
            key={s.name}
            className="skill-chip"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            {s.name}
            <span className="skill-chip-cat">· {s.cat}</span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}
