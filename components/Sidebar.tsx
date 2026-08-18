'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, User, Mail, GitFork, ExternalLink, Sparkles, Menu, X } from 'lucide-react'
import { getProfileAction, ProfileData } from '@/app/actions/admin'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/portfolio', label: 'Projects & Work', icon: Briefcase },
  { href: '/about', label: 'Career & Experience', icon: User },
  { href: '/contact', label: 'Get in Touch', icon: Mail },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Muzammal Ateeq',
    title: 'Full-Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    status: 'Available for Hire & Contract'
  })

  useEffect(() => {
    getProfileAction().then(data => {
      if (data && data.avatar) setProfile(data)
    }).catch(() => {})
  }, [])

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between fixed top-0 left-0 w-80 h-screen glass-panel border-r border-white/10 p-6 z-40 bg-[#030712]/95 backdrop-blur-2xl">
        
        {/* Top Profile Section */}
        <div>
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <img 
                  src={profile.avatar}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
                  }}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#030712]"></span>
              </span>
            </div>

            <div>
              <h2 className="font-extrabold text-white text-base tracking-tight">{profile.name}</h2>
              <p className="text-xs font-semibold text-violet-400">{profile.title}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-8 p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-300 flex items-center gap-2">
            <Sparkles size={14} className="text-violet-400 shrink-0" />
            <span className="line-clamp-1">{profile.status}</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 mb-3">Navigation</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-violet-400' : 'text-slate-500'} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Socials & Quick Action */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Link
            href="/contact"
            className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-extrabold text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-indigo-500 transition-all text-sm"
          >
            <Mail size={16} /> Contact Me
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 text-xs font-bold text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-violet-300 transition-colors">
              <GitFork size={14} /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <ExternalLink size={14} /> LinkedIn
            </a>
          </div>
        </div>

      </aside>

      {/* Mobile Top Header Bar */}
      <header className="lg:hidden sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-5 py-3.5 flex items-center justify-between bg-[#030712]/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <img 
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-sm tracking-tight">{profile.name}</h2>
            <p className="text-[10px] font-semibold text-violet-400">{profile.title}</p>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Animated Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-between bg-[#030712]/95 backdrop-blur-2xl p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5">
                    <img 
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-white text-base">{profile.name}</h2>
                    <p className="text-xs font-semibold text-violet-400">{profile.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6 p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-300 flex items-center gap-2">
                <Sparkles size={14} className="text-violet-400 shrink-0" />
                <span>{profile.status}</span>
              </div>

              {/* Nav Links */}
              <nav className="space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-extrabold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={22} className={isActive ? 'text-violet-400' : 'text-slate-400'} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4 mt-8">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-extrabold text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] text-base"
              >
                <Mail size={18} /> Contact Me
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
