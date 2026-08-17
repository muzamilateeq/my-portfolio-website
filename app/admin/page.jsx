'use client'

import { useActionState } from 'react'
import { submitProjectAction } from './actions'
import { motion } from 'framer-motion'
import { Save, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [state, formAction, isPending] = useActionState(submitProjectAction, null)

  return (
    <main className="admin-page" style={{ minHeight: '100vh', padding: '4rem 2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={16} />
          Back to Site
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Add New Project</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Fill out the details below to add a new project to your portfolio.
          </p>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="title" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Project Title</label>
              <input type="text" id="title" name="title" required placeholder="e.g. E-Commerce Dashboard" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="description" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Description</label>
              <textarea id="description" name="description" required rows={4} placeholder="A brief description of what you built..." style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="stack" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Tech Stack (comma separated)</label>
              <input type="text" id="stack" name="stack" placeholder="e.g. React, Next.js, Tailwind" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="image" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Image URL</label>
              <input type="text" id="image" name="image" placeholder="e.g. /projects/my-app.png or https://..." style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="live_url" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Live URL</label>
              <input type="url" id="live_url" name="live_url" placeholder="https://my-app.com" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="repo_url" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Repository URL</label>
              <input type="url" id="repo_url" name="repo_url" placeholder="https://github.com/..." style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>

            {state && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '8px', background: state.ok ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: state.ok ? '#22c55e' : '#ef4444', border: `1px solid ${state.ok ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}` }}>
                {state.ok ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: '600', border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1, marginTop: '1rem', transition: 'transform 0.2s ease',
              }}
            >
              <Save size={18} />
              {isPending ? 'Saving...' : 'Save Project'}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  )
}
