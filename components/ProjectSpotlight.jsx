'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, GitFork, Sparkles, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types'

const fallback: Project[] = [
  {
    id: 'blood-donation',
    title: 'Blood Donation Platform',
    shortDescription: 'A donor-request platform for finding blood donors across Pakistan.',
    description: 'A donor-request platform for finding blood donors across Pakistan with a fast form-first experience. Built with real-time request matching and SMS notification services.',
    stack: ['React', 'Healthcare', 'Responsive'],
    image: '/projects/blood-donation-screenshot.png',
    liveUrl: 'https://blood-donation-kappa-ten.vercel.app/',
    featured: true
  },
  {
    id: 'restaurant-web',
    title: 'Restaurant Web App',
    shortDescription: 'Professional food delivery & restaurant management UI.',
    description: 'Professional food delivery & restaurant management UI built with modern React components and Redux Toolkit state management.',
    stack: ['React', 'Food UI', 'Responsive'],
    image: '/projects/restaurant-web-screenshot.png',
    liveUrl: 'https://resturentweb-gules.vercel.app/',
    featured: true
  },
  {
    id: 'govconnect',
    title: 'GovConnect Portal',
    shortDescription: 'Public services portal for government services and job tracking.',
    description: 'Public services portal for government services, jobs, and application tracking with lighthouse 99 accessibility score.',
    stack: ['React', 'Portal UI', 'Services'],
    image: '/projects/govconnect-green-preview.png',
    liveUrl: 'https://gov-connect-web01.vercel.app/',
    featured: true
  },
]

export function ProjectSpotlight({ projects, limit }: { projects?: Project[], limit?: number }) {
  const list = (projects?.length ? projects : fallback).slice(0, limit || 99)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((project, idx) => (
          <motion.div
            key={project.id || project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setActiveProject(project)}
            className="group relative glass-panel rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl hover:border-violet-500/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            {/* Card Image Thumbnail Frame */}
            <div className="relative w-full h-64 overflow-hidden bg-slate-950/80 p-3">
              <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Card Content - SHORT DESCRIPTION ONLY */}
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {(project.stack || []).slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed text-sm line-clamp-2">
                  {project.shortDescription || project.description}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-extrabold text-violet-400 group-hover:text-violet-300 transition-colors">
                  View Full Case Study <Sparkles size={16} />
                </span>
                <span className="text-xs font-bold text-slate-400">Click to expand</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULL PROJECT DETAIL MODAL (DARK GLASS 2.0) */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Dark Glass Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-[3rem] border border-white/20 shadow-2xl p-6 md:p-10 z-10 space-y-8 bg-[#030712]/95"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all z-20"
              >
                <X size={20} />
              </button>

              {/* Full HD Image Display */}
              <div className="w-full h-[300px] md:h-[420px] rounded-3xl overflow-hidden bg-slate-950/90 border border-white/15 p-4 flex items-center justify-center relative">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {(activeProject.stack || []).map(tag => (
                    <span key={tag} className="text-xs font-bold px-4 py-1.5 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {activeProject.title}
                </h2>

                <p className="text-base text-violet-300 font-bold">
                  {activeProject.shortDescription}
                </p>
              </div>

              {/* Metrics if available */}
              {activeProject.metrics && activeProject.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeProject.metrics.map((metric, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-200">{metric}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Detailed Description */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-extrabold text-white">Full Overview & Architecture</h3>
                <p className="text-slate-300 leading-relaxed font-medium whitespace-pre-line text-sm md:text-base">
                  {activeProject.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                {(activeProject.liveUrl || (activeProject as any).live_url) && (
                  <Link
                    href={activeProject.liveUrl || (activeProject as any).live_url || '#'}
                    target="_blank"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 font-extrabold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all"
                  >
                    Open Live Application <ExternalLink size={18} />
                  </Link>
                )}

                {activeProject.githubUrl && (
                  <Link
                    href={activeProject.githubUrl}
                    target="_blank"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 font-bold text-white hover:bg-white/20 transition-all"
                  >
                    View Source Code <GitFork size={18} />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
