'use client'

import { experience } from '@/data/experience'
import { motion } from 'framer-motion'

export function ExperienceTimeline() {
  return (
    <div className="relative pl-4 md:pl-0">
      {/* Vertical line */}
      <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-1/2" />

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
              <div className="absolute left-[-5px] md:left-1/2 mt-1.5 w-5 h-5 rounded-full bg-white border-4 border-indigo-500 shadow-md md:-translate-x-1/2 z-10" />

              <div className={`ml-8 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">{exp.role}</h3>
                  <span className="text-slate-500 font-semibold">{exp.company}</span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className={`space-y-2 ${isEven ? '' : 'md:flex md:flex-col md:items-end'}`}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium text-slate-600 max-w-md">
                      {!isEven && <span className="hidden md:inline text-indigo-500 mt-1">✦</span>}
                      <span className={!isEven ? 'md:hidden text-indigo-500 mt-1' : 'text-indigo-500 mt-1'}>✦</span>
                      <span className={!isEven ? 'md:text-right' : ''}>{ach}</span>
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
