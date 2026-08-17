import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link href="/" style={{ font: '700 0.95rem/1 var(--ff-head)', color: 'var(--c-text)', letterSpacing: '0.04em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c-accent)', boxShadow: '0 0 8px var(--c-accent-glow)', display: 'inline-block' }} />
          MUZAMMAL ATEEQ
        </Link>
        <p style={{ fontSize: '0.82rem', color: 'var(--c-muted)' }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <ul className="footer-links">
          <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="mailto:muzamilateeq423@gmail.com">Email</a></li>
        </ul>
      </div>
    </footer>
  )
}
