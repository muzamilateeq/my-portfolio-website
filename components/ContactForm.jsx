'use client'

import emailjs from '@emailjs/browser'
import { useState } from 'react'

const initialState = {
  ok: null,
  message: '',
}

export function ContactForm() {
  const [state, setState] = useState(initialState)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setState({ ok: false, message: 'Please complete all fields before sending.' })
      return
    }

    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
    if (!emailLooksValid) {
      setState({ ok: false, message: 'Please use a valid email address.' })
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setState({
        ok: false,
        message: 'EmailJS is not configured yet. Add your EmailJS keys in .env.local.',
      })
      return
    }

    setIsPending(true)
    setState(initialState)

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: payload.name,
          from_email: payload.email,
          reply_to: payload.email,
          to_email: 'muzamilateeq423@gmail.com',
          message: payload.message,
        },
        { publicKey },
      )

      form.reset()
      setState({ ok: true, message: 'Message sent successfully. Thank you!' })
    } catch (error) {
      console.error('EmailJS send failed:', error)
      setState({
        ok: false,
        message: 'Message could not be sent right now. Please try again.',
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <section className="contact-band" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Available for selected builds</p>
        <h2>Need a clean app with serious engineering underneath?</h2>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Message</span>
          <textarea name="message" rows="4" required />
        </label>
        <button className="primary-action" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Contact Muzammal'}
        </button>
        {state.message ? (
          <p className={state.ok ? 'form-status success' : 'form-status'}>
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  )
}
