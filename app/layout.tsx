import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Toaster } from 'sonner'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Muzammal Ateeq | Full-Stack Developer',
  description: 'Full-Stack Developer Portfolio - React, Next.js, React Native',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-900`}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
