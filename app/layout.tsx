import { LayoutWrapper } from '@/components/LayoutWrapper'
import { CursorGlow } from '@/components/CursorGlow'
import { Toaster } from 'sonner'
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
})

export const metadata = {
  title: 'Muzammal Ateeq | Senior Full-Stack Engineer',
  description: 'Full-Stack Developer Portfolio - Next.js, React Native, High-Performance Architectures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.className} bg-[#030712] text-slate-100 font-sans antialiased selection:bg-violet-500/30 selection:text-violet-300`}>
        <CursorGlow />
        
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
