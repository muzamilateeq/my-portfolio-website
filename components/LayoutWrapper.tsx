'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <div className="min-h-screen w-full bg-[#030712]">
        {children}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-grid-pattern bg-radial-gradient">
      <Sidebar />
      <div className="flex-1 lg:pl-80 w-full min-h-screen flex flex-col justify-between">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
