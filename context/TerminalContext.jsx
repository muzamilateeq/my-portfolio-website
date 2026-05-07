'use client'

import { createContext, useMemo, useState } from 'react'

const bootLines = [
  'booting muzammal.dev',
  'type help to explore commands',
  'status: ready',
]

const commandResponses = {
  help: [
    'available commands:',
    'bio - read the developer profile',
    'projects - list featured builds',
    'skills - show core stack',
    'clear - reset the console',
  ],
  bio: [
    'Muzammal Ateeq',
    'Full-Stack Web & Mobile App Developer',
    'Focused on scalable apps, stunning UIs, and future-ready code.',
  ],
  projects: [
    'currency-converter: realtime utility app',
    'restaurant-web: polished business website',
    'todo-app: state-driven productivity flow',
  ],
  skills: [
    'React, Next.js, React Native, TypeScript',
    'Tailwind CSS, Supabase, Redux Toolkit, Framer Motion',
  ],
}

export const TerminalContext = createContext(null)

export function TerminalProvider({ children }) {
  const [lines, setLines] = useState(bootLines)
  const [status, setStatus] = useState('online')

  function runCommand(rawCommand = 'help') {
    const command = rawCommand.trim().toLowerCase()

    if (!command) {
      return
    }

    if (command === 'clear') {
      setLines(bootLines)
      setStatus('ready')
      return
    }

    const response = commandResponses[command] || [
      `command not found: ${command}`,
      'type help for available commands',
    ]

    setStatus(commandResponses[command] ? 'executed' : 'waiting')
    setLines((currentLines) => [...currentLines, `> ${command}`, ...response])
  }

  const value = useMemo(
    () => ({
      lines,
      status,
      runCommand,
    }),
    [lines, status],
  )

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>
}
