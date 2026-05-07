'use client'

import { useContext } from 'react'
import { TerminalContext } from '@/context/TerminalContext'

export function useTerminal() {
  const context = useContext(TerminalContext)

  if (!context) {
    throw new Error('useTerminal must be used inside TerminalProvider')
  }

  return context
}
