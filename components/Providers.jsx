'use client'

import { CustomCursor } from '@/components/CustomCursor'
import { GsapEffects } from '@/components/GsapEffects'
import { TerminalProvider } from '@/context/TerminalContext'
import { ThemeProvider } from '@/context/ThemeContext'

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <GsapEffects />
        <CustomCursor />
        {children}
      </TerminalProvider>
    </ThemeProvider>
  )
}
