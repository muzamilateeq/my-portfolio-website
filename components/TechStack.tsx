'use client'

import { skills } from '@/data/skills'
import { motion } from 'framer-motion'

const getIconUrl = (skill: string) => {
  const s = skill.toLowerCase()
  if (s.includes('react')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
  if (s.includes('next.js')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
  if (s.includes('typescript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
  if (s.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
  if (s.includes('flutter')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg'
  if (s.includes('swift')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg'
  if (s.includes('kotlin')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg'
  if (s.includes('tailwind')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
  if (s.includes('html')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
  if (s.includes('css')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
  if (s.includes('node')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
  if (s.includes('python')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
  if (s.includes('go (')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg'
  if (s.includes('rust')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg'
  if (s.includes('c++')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg'
  if (s.includes('java')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg'
  if (s.includes('php')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg'
  if (s.includes('express')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg'
  if (s.includes('graphql')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg'
  if (s.includes('three.js')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg'
  if (s.includes('unity')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg'
  if (s.includes('postgres')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
  if (s.includes('mongo')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg'
  if (s.includes('redis')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg'
  if (s.includes('mysql')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
  if (s.includes('supabase')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg'
  if (s.includes('firebase')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg'
  if (s.includes('prisma')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg'
  if (s.includes('aws')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
  if (s.includes('docker')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
  if (s.includes('kubernetes')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg'
  if (s.includes('vercel')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg'
  if (s.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
  return null
}

export function TechStack() {
  return (
    <section className="py-32 bg-[#FAFAFA] relative overflow-hidden border-y border-slate-200/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Technical Arsenal</h2>
          <p className="mt-4 text-slate-500 text-lg font-medium">The tools and technologies I use to build robust products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] group"
            >
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-8 group-hover:text-indigo-500 transition-colors">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {category.skills.map((skill) => {
                  const iconUrl = getIconUrl(skill)
                  return (
                    <li key={skill} className="flex items-center gap-4">
                      {iconUrl ? (
                        <img src={iconUrl} alt={skill} className="w-6 h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.3)] ml-2" />
                      )}
                      <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">{skill}</span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee Row */}
        <div className="mt-20 relative flex overflow-x-hidden group py-6 mask-image-fade">
          <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {[...skills.flatMap(c => c.skills), ...skills.flatMap(c => c.skills)].map((skill, i) => (
              <span key={i} className="mx-8 text-xl font-black text-slate-200 uppercase tracking-widest hover:text-indigo-500 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
