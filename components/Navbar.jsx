'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',          label: 'Home'      },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About'     },
  { href: '/contact',   label: 'Contact'   },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          <span className="logo-dot" />
          MUZAMMAL ATEEQ
        </Link>

        <nav>
          <ul className="navbar-links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}>
          Let's Talk
        </Link>
      </div>
    </header>
  )
}
