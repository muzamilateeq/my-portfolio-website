'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderGit2, LogOut, Code2, Briefcase, ShieldCheck } from 'lucide-react'
import { logoutAction } from '../actions/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { href: '/admin/profile', label: 'Profile & Avatar', icon: ShieldCheck },
    { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
    { href: '/admin/skills', label: 'Skills', icon: Code2 },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  ]

  const handleLogout = async () => {
    await logoutAction()
    window.location.href = '/admin/login'
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col md:flex-row">
      {/* Desktop Fixed Admin Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/10 flex flex-col hidden md:flex fixed top-0 left-0 h-full z-20 bg-[#030712]/95 backdrop-blur-2xl">
        <div className="h-20 flex items-center px-6 border-b border-white/10 justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-violet-400" />
            <span className="font-black text-white tracking-tight">Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map(link => {
            const isActive = pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-violet-400' : 'text-slate-500'} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-bold text-sm text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all border border-transparent"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation Header */}
      <header className="md:hidden sticky top-0 z-30 w-full glass-panel border-b border-white/10 p-4 bg-[#030712]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-violet-400" />
            <span className="font-black text-white text-sm">Admin Console</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
          >
            Sign Out
          </button>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {links.map(link => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive 
                    ? 'bg-violet-600/30 text-white border border-violet-500/40' 
                    : 'text-slate-400 bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}
