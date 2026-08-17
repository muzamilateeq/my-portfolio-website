'use client'

import emailjs from '@emailjs/browser'
import { useState } from 'react'

export function ContactForm() {
  const [state, setState] = useState({ ok: null, message: '' })
  const [pending, setPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      name:    String(fd.get('name')    || '').trim(),
      email:   String(fd.get('email')   || '').trim(),
      message: String(fd.get('message') || '').trim(),
    }
    if (!payload.name || !payload.email || !payload.message) {
      return setState({ ok: false, message: 'Please fill in all fields.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return setState({ ok: false, message: 'Please enter a valid email address.' })
    }
    const { NEXT_PUBLIC_EMAILJS_SERVICE_ID: svc, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: tmpl, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: pub } = process.env
    if (!svc || !tmpl || !pub) {
      return setState({ ok: false, message: 'Contact form is not configured yet. Please email directly.' })
    }
    setPending(true)
    setState({ ok: null, message: '' })
    try {
      await emailjs.send(svc, tmpl, { from_name: payload.name, from_email: payload.email, reply_to: payload.email, to_email: 'muzamilateeq423@gmail.com', message: payload.message }, { publicKey: pub })
      e.target.reset()
      setState({ ok: true, message: '✓ Message sent successfully! I\'ll get back to you soon.' })
    } catch (err) {
      console.error(err)
      setState({ ok: false, message: 'Something went wrong. Please try emailing me directly.' })
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label className="form-label">Your Name</label>
        <input name="name" type="text" className="form-input" placeholder="Alex Johnson" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label className="form-label">Email Address</label>
        <input name="email" type="email" className="form-input" placeholder="alex@example.com" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea name="message" className="form-input" rows={5} placeholder="Tell me about your project..." required style={{ resize: 'vertical' }} />
      </div>
      <button type="submit" className="btn-submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send Message →'}
      </button>
      {state.message && (
        <p className={`form-msg ${state.ok ? 'success' : 'error'}`}>{state.message}</p>
      )}
    </form>
  )
}
