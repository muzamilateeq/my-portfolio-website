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
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-50">
      {/* Background Mesh Gradient - Stripe Inspired */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-200/50 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[120px]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.3]" style={{
          backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-indigo-600 text-xs font-semibold tracking-wide mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for new projects
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.1]"
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
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed"
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
            className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-8 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
          >
            View Projects
          </Link>
          <button
            onClick={copyEmail}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5"
          >
            {copied ? <Check size={18} className="text-indigo-600" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
