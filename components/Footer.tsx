'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  const currentYear = new Date().getFullYear()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-bold text-slate-900 text-sm">
            muzammal.dev
          </Link>
          <p className="text-slate-500 text-sm" suppressHydrationWarning>
            © {currentYear} Muzammal Ateeq. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-2" suppressHydrationWarning>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {timezone}
          </span>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
