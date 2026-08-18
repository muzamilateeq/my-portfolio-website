'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  const currentYear = new Date().getFullYear()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <footer className="border-t border-white/10 bg-[#030712]/90 backdrop-blur-xl py-12 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-black text-white text-sm tracking-widest">
            MUZAMMAL<span className="text-violet-400">.DEV</span>
          </Link>
          <p className="text-slate-500 text-xs font-medium" suppressHydrationWarning>
            © {currentYear} Muzammal Ateeq. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-2" suppressHydrationWarning>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            {timezone}
          </span>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-violet-300 transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-violet-300 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
