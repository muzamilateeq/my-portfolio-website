'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderGit2, LogOut, Code2, Briefcase } from 'lucide-react'
import { logoutAction } from '../actions/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-bold text-slate-900 tracking-tight">Portfolio Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => {
            const isActive = pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}
