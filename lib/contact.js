import { createSupabaseServerClient } from '@/lib/supabase'

export async function saveContactSubmission(payload) {
  const supabase = createSupabaseServerClient()

  if (!supabase) {
    return {
      ok: false,
      message: 'Supabase is not configured yet. Add your keys in .env.local.',
    }
  }

  const { error } = await supabase.from('contact_submissions').insert({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  })

  if (error) {
    console.error('Supabase contact insert failed:', error.message)
    return {
      ok: false,
      message: 'Message could not be sent right now. Please try again shortly.',
    }
  }

  return {
    ok: true,
    message: 'Message sent. I will get back to you soon.',
  }
}
