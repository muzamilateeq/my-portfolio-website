'use client'

import { experience as fallbackExperience } from '@/data/experience'
import { motion } from 'framer-motion'
import { Experience } from '@/types'

interface ExperienceTimelineProps {
  experience?: Experience[]
}

export function ExperienceTimeline({ experience = fallbackExperience }: ExperienceTimelineProps) {
  return (
    <div className="relative pl-4 md:pl-0">
      {/* Vertical line */}
      <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2" />

      <div className="space-y-12">
        {experience.map((exp, idx) => {
          const isEven = idx % 2 === 0
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 mt-1.5 w-5 h-5 rounded-full bg-zinc-950 border-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] md:-translate-x-1/2 z-10 transition-transform duration-300 hover:scale-125" />

              <div className={`ml-8 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-extrabold text-zinc-50">{exp.role}</h3>
                  <span className="text-zinc-400 font-bold">{exp.company}</span>
                </div>

                <p className="text-zinc-300 text-base leading-relaxed mb-4 font-medium">
                  {exp.description}
                </p>

                <ul className={`space-y-2 ${isEven ? '' : 'md:flex md:flex-col md:items-end'}`}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-3 text-sm font-bold text-zinc-400 max-w-md">
                      {!isEven && <span className="hidden md:inline text-emerald-400 mt-1">✦</span>}
                      <span className={!isEven ? 'md:hidden text-emerald-400 mt-1' : 'text-emerald-400 mt-1'}>✦</span>
                      <span className={!isEven ? 'md:text-right text-zinc-300' : 'text-zinc-300'}>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
