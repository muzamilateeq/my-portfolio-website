'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const fallback = [
  {
    id: 'blood-donation',
    title: 'Blood Donation Platform',
    description: 'A donor-request platform for finding blood donors across Pakistan with a fast form-first experience.',
    stack: ['React', 'Healthcare', 'Responsive'],
    image: '/projects/blood-donation-screenshot.png',
    live_url: 'https://blood-donation-kappa-ten.vercel.app/',
  },
  {
    id: 'restaurant-web',
    title: 'Restaurant Web App',
    description: 'Professional food delivery & restaurant management UI built with modern React components.',
    stack: ['React', 'Food UI', 'Responsive'],
    image: '/projects/restaurant-web-screenshot.png',
    live_url: 'https://resturentweb-gules.vercel.app/',
  },
  {
    id: 'govconnect',
    title: 'GovConnect Portal',
    description: 'Public services portal for government services, jobs, and application tracking.',
    stack: ['React', 'Portal UI', 'Services'],
    image: '/projects/govconnect-green-preview.png',
    live_url: 'https://gov-connect-web01.vercel.app/',
  },
]

export function ProjectSpotlight({ projects, limit }) {
  const list = (projects?.length ? projects : fallback).slice(0, limit || 99)

  return (
    <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))' }}>
      {list.map((project, i) => (
        <motion.a
          key={project.id || project.title}
          href={project.live_url || '#'}
          target="_blank"
          rel="noreferrer"
          className="project-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
        >
          <div className={`project-image-wrap ${i === 0 ? 'aspect-wide' : 'aspect-square'}`}>
            <Image
              src={project.image || fallback[i % 3].image}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width:768px) 100vw, 50vw"
              priority={i === 0}
              alt={`${project.title} preview`}
            />
          </div>

          <div className="project-body">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-footer">
              <div className="project-tags">
                {(project.stack || []).map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <span className="project-link">
                View live <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
