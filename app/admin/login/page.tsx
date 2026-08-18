'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '../../actions/auth'
import { Lock, Loader2, ShieldCheck, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const result = await loginAction(formData)
    
    if (result.success) {
      router.push('/admin/projects')
    } else {
      setError(result.error || 'Authentication failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#030712] p-6 relative overflow-hidden">
      {/* Glow Blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md glass-panel rounded-[2.5rem] border border-white/15 shadow-2xl p-8 sm:p-10 relative z-10 bg-[#030712]/90">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 shadow-[0_0_25px_rgba(139,92,246,0.3)] mb-6">
            <Lock size={30} />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-3">
            <ShieldCheck size={14} /> Portfolio System Admin
          </div>
          <h1 className="text-3xl font-black text-white">Admin Authentication</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Enter your credentials to access the portfolio dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium placeholder:text-slate-600"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium placeholder:text-slate-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-extrabold text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-indigo-500 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? <Loader2 size={20} className="animate-spin text-white" /> : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
