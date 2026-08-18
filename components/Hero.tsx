'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const email = 'muzamilateeq423@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop)' }}
    >
      {/* Light frosted glass overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-md z-0" />
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block overflow-hidden">
        {[
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React", className: "top-[15%] left-[10%] w-16 h-16 opacity-60", duration: 3, delay: 0 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", className: "top-[20%] right-[12%] w-14 h-14 opacity-60", duration: 4, delay: 0.5 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js", className: "bottom-[20%] left-[15%] w-20 h-20 opacity-60", duration: 3.5, delay: 1 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python", className: "bottom-[25%] right-[15%] w-16 h-16 opacity-60", duration: 4.5, delay: 1.5 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", alt: "Next.js", className: "top-[45%] right-[8%] w-16 h-16 opacity-80", duration: 3.2, delay: 0.8 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL", className: "top-[50%] left-[8%] w-14 h-14 opacity-60", duration: 3.8, delay: 0.3 },
        ].map((icon, idx) => (
          <motion.img
            key={idx}
            src={icon.src}
            alt={icon.alt}
            className={`absolute ${icon.className} drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]`}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [0, -20, 0], 
              opacity: 0.8
            }}
            transition={{
              y: { duration: icon.duration, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1, delay: icon.delay }
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center text-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] border border-slate-100 text-indigo-600 text-xs font-bold tracking-wide mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Available for new projects
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.1] drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Engineering robust applications with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              precision and scale.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm Muzammal Ateeq, a Full-Stack Developer specializing in Next.js, React Native, and high-performance system architectures.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-900 px-8 font-bold text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.15)] transition-all hover:bg-slate-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <button
              onClick={copyEmail}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-bold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5"
            >
              {copied ? <Check size={18} className="text-indigo-600" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
