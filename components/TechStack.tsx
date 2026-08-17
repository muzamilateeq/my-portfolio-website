'use client'

import { skills } from '@/data/skills'
import { motion } from 'framer-motion'

export function TechStack() {
  return (
    <section className="py-24 border-t border-slate-200 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Technical Arsenal</h2>
          <p className="mt-4 text-slate-500 text-lg">The tools and technologies I use to build robust products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                    <span className="text-slate-700 font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee Row */}
        <div className="mt-16 relative flex overflow-x-hidden group bg-slate-50 border-y border-slate-200 py-6">
          <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {[...skills.flatMap(c => c.skills), ...skills.flatMap(c => c.skills)].map((skill, i) => (
              <span key={i} className="mx-8 text-xl font-black text-slate-300 uppercase tracking-widest">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
