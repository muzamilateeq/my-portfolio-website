'use server'

import { createSupabaseServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function submitProjectAction(_previousState, formData) {
  const payload = {
    title: String(formData.get('title') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    stack: String(formData.get('stack') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    image: String(formData.get('image') || '').trim(),
    live_url: String(formData.get('live_url') || '').trim(),
    repo_url: String(formData.get('repo_url') || '').trim(),
  }

  if (!payload.title || !payload.description) {
    return {
      ok: false,
      message: 'Please complete at least the title and description.',
    }
  }

  const supabase = createSupabaseServerClient()

  if (!supabase) {
    return {
      ok: false,
      message: 'Database connection is not configured. Project was not saved.',
    }
  }

  const { error } = await supabase.from('projects').insert([payload])

  if (error) {
    console.error('Supabase project insert failed:', error)
    return {
      ok: false,
      message: `Failed to save project: ${error.message}`,
    }
  }

  // Revalidate the home page to reflect the new project
  revalidatePath('/')

  return {
    ok: true,
    message: 'Project successfully added!',
  }
}
