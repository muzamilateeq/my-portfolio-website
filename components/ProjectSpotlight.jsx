'use client'

import { motion } from 'framer-motion'
import { ExternalLink, GitBranch } from 'lucide-react'
import Image from 'next/image'

const fallbackSpotlight = [
  {
    id: 'blood-donation',
    title: 'Blood Donation Website',
    description:
      'A donor-request platform UI for finding blood donors across Pakistan with a fast form-first experience.',
    stack: ['React', 'Healthcare UI', 'Responsive Design'],
    image: '/projects/blood-donation-screenshot.png',
    live_url: 'https://blood-donation-kappa-ten.vercel.app/',
  },
  {
    id: 'restaurant-web',
    title: 'Restaurant Web Application',
    description:
      'A professional food delivery and restaurant UI built with modern React components.',
    stack: ['React', 'Food UI', 'Responsive Design'],
    image: '/projects/restaurant-web-screenshot.png',
    live_url: 'https://resturentweb-gules.vercel.app/',
  },
  {
    id: 'govconnect',
    title: 'GovConnect Portal',
    description:
      'A public services portal UI for government services, jobs, schemes, and application tracking.',
    stack: ['React', 'Public Services', 'Portal UI'],
    image: '/projects/govconnect-green-preview.png',
    live_url: 'https://gov-connect-web01.vercel.app/',
  },
]

export function ProjectSpotlight({ projects }) {
  const spotlightProjects = projects?.length ? projects : fallbackSpotlight

  return (
    <section className="project-spotlight" id="projects">
      <div className="spotlight-layout">
        <div className="spotlight-copy">
          <p className="eyebrow">Project Spotlight</p>
          <h2>Selected builds with clean product thinking.</h2>
          <p>
            A focused showcase for real portfolio projects, with readable
            previews, practical stack notes, and motion that supports the UI.
          </p>
        </div>
        <div className="spotlight-list">
          {spotlightProjects.slice(0, 3).map((project, index) => (
            <SpotlightCard index={index} key={project.id || project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpotlightCard({ project, index }) {
  const sourceUrl = project.source_url || project.repo_url

  function openLiveProject(event) {
    if (!project.live_url || event.target.closest('a')) {
      return
    }

    window.open(project.live_url, '_blank', 'noopener,noreferrer')
  }

  function handleKeyDown(event) {
    if ((event.key === 'Enter' || event.key === ' ') && project.live_url) {
      event.preventDefault()
      window.open(project.live_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.article
      className={`project-flip-card spotlight-card ${project.live_url ? 'clickable-project-card' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      role={project.live_url ? 'link' : undefined}
      onClick={openLiveProject}
      onKeyDown={handleKeyDown}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face flip-card-front">
          <div className="project-image-frame">
            <Image
              src={project.image || fallbackSpotlight[index]?.image || '/projects/blood-donation-screenshot.png'}
              width={1200}
              height={820}
              sizes="(max-width: 900px) 100vw, 42vw"
              priority={index === 0}
              alt={`${project.title} project preview`}
            />
          </div>
          <div className="flip-front-content">
            <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{project.title}</h3>
            <p className="project-mobile-summary">{project.description}</p>
            <div className="tag-list">
              {(project.stack || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <ProjectActions
              className="mobile-project-actions"
              liveUrl={project.live_url}
              sourceUrl={sourceUrl}
            />
          </div>
        </div>

        <div className="flip-card-face flip-card-back">
          <span className="card-index">Reveal</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ProjectActions liveUrl={project.live_url} sourceUrl={sourceUrl} />
        </div>
      </div>
    </motion.article>
  )
}

function ProjectActions({ liveUrl, sourceUrl, className = '' }) {
  return (
    <div className={`project-actions ${className}`}>
      {liveUrl ? (
        <a className="project-action primary-project-action" href={liveUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          View Live Demo
        </a>
      ) : null}
      {sourceUrl ? (
        <a className="project-action" href={sourceUrl} target="_blank" rel="noreferrer">
          <GitBranch size={16} />
          Source Code
        </a>
      ) : (
        <span className="project-action disabled-action" aria-disabled="true">
          <GitBranch size={16} />
          Source Code
        </span>
      )}
    </div>
  )
}
