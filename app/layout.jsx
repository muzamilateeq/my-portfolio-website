import { Providers } from '@/components/Providers'
import './globals.css'

const siteUrl = 'https://muzammal-ateeq.dev'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Muzammal Ateeq | Full-Stack Web & Mobile App Developer',
    template: '%s | Muzammal Ateeq',
  },
  description:
    'Next-level portfolio for Muzammal Ateeq, a full-stack web and mobile app developer building scalable apps, stunning UIs, and future-ready code.',
  keywords: [
    'Muzammal Ateeq',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'React Native Developer',
    'Supabase Developer',
  ],
  authors: [{ name: 'Muzammal Ateeq' }],
  creator: 'Muzammal Ateeq',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Muzammal Ateeq | Full-Stack Web & Mobile App Developer',
    description:
      'Dark, futuristic portfolio showcasing React, Next.js, React Native, TypeScript, Tailwind CSS, Supabase, Redux Toolkit, and Framer Motion.',
    url: '/',
    siteName: 'Muzammal Ateeq Portfolio',
    images: [
      {
        url: '/og-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Muzammal Ateeq full-stack developer portfolio cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muzammal Ateeq | Full-Stack Developer',
    description: 'Building scalable apps, stunning UIs, and future-ready code.',
    images: ['/og-cover.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muzammal Ateeq',
    url: siteUrl,
    jobTitle: 'Full-Stack Web & Mobile App Developer',
    description:
      'Developer specializing in React, Next.js, React Native, TypeScript, Tailwind CSS, Supabase, Redux Toolkit, and Framer Motion.',
    knowsAbout: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Redux Toolkit',
      'Framer Motion',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
