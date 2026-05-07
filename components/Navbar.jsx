'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { MagneticButton } from '@/components/MagneticButton'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Muzammal Ateeq home">
        <span className="brand-mark">MA</span>
        <span>Muzammal Ateeq</span>
      </a>
      <div className="nav-links">
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <MagneticButton
          aria-label="Toggle theme"
          className="icon-button"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </MagneticButton>
      </div>
    </nav>
  )
}
