'use server'

import { saveContactSubmission } from '@/lib/contact'

export async function submitContactForm(_previousState, formData) {
  const payload = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    message: String(formData.get('message') || '').trim(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return {
      ok: false,
      message: 'Please complete all fields before sending.',
    }
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  if (!emailLooksValid) {
    return {
      ok: false,
      message: 'Please use a valid email address.',
    }
  }

  return saveContactSubmission(payload)
}
