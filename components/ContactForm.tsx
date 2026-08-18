'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { Send, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isPending, setIsPending] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true)
    try {
      const { NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY } = process.env
      
      if (!NEXT_PUBLIC_EMAILJS_SERVICE_ID || !NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS keys are missing')
      }

      await emailjs.send(
        NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          reply_to: data.email,
          to_email: 'muzamilateeq423@gmail.com',
          message: data.message,
        },
        { publicKey: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      )
      
      toast.success('Message sent successfully! I will get back to you soon.')
      reset()
    } catch (error) {
      console.error(error)
      toast.error('Failed to send message. Please email me directly.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
          Name
        </label>
        <input
          {...register('name')}
          id="name"
          className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium placeholder:text-slate-600"
          placeholder="Your Name"
        />
        {errors.name && <p className="mt-2 text-sm font-medium text-rose-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium placeholder:text-slate-600"
          placeholder="Your Email"
        />
        {errors.email && <p className="mt-2 text-sm font-medium text-rose-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none font-medium placeholder:text-slate-600"
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="mt-2 text-sm font-medium text-rose-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-extrabold text-white hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin text-white" />
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  )
}
