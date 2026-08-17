'use client'

import { Project } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitFork, X, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function ProjectSpotlight({ projects, limit }: { projects: Project[], limit?: number }) {
  const displayProjects = limit ? projects.slice(0, limit) : projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex flex-col justify-between rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-6 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
            onClick={() => setSelectedProject(project)}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200 shadow-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <ChevronRight className="text-slate-400 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1" size={20} />
              </div>

              <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
              {project.stack.slice(0, 3).map(tech => (
                <span key={tech} className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg">
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="px-3 py-1 text-xs font-semibold bg-slate-50 text-slate-400 rounded-lg border border-slate-200">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal / Drawer for Deep Dive */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl z-10"
            >
              <div className="sticky top-0 right-0 p-4 flex justify-end z-20 bg-gradient-to-b from-white via-white/90 to-transparent">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 sm:p-10 -mt-14">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{selectedProject.title}</h2>
                
                <div className="flex gap-4 mb-8">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                      <ExternalLink size={16} /> Live Preview
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
                      <GitFork size={16} /> Source Code
                    </a>
                  )}
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-10 border border-slate-200 shadow-md">
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Overview</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">{selectedProject.description}</p>
                    </div>
                    
                    {selectedProject.problem && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">The Problem</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">{selectedProject.problem}</p>
                      </div>
                    )}
                    
                    {selectedProject.solution && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">The Solution</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">{selectedProject.solution}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map(tech => (
                          <span key={tech} className="px-3 py-1.5 text-xs font-bold bg-white text-indigo-600 rounded-lg shadow-sm border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.metrics && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Metrics</h4>
                        <ul className="space-y-3">
                          {selectedProject.metrics.map(metric => (
                            <li key={metric} className="flex gap-3 text-sm font-medium text-slate-700">
                              <span className="text-indigo-500 mt-0.5">✦</span>
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
