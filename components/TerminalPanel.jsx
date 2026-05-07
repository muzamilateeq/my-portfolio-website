'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTerminal } from '@/hooks/useTerminal'

const highlights = ['Frontend craft', 'Mobile UX', 'Realtime data']

export function TerminalPanel() {
  const { lines, status, runCommand } = useTerminal()
  const [command, setCommand] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    runCommand(command)
    setCommand('')
  }

  return (
    <motion.div
      className="hero-visual draggable-console"
      aria-label="Developer console"
      drag
      dragConstraints={{ top: -40, right: 40, bottom: 40, left: -40 }}
      dragElastic={0.08}
    >
      <div className="terminal-window">
        <div className="window-bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="code-lines">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <form className="terminal-input" onSubmit={handleSubmit}>
          <span>$</span>
          <input
            aria-label="Developer console command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="help"
          />
        </form>
      </div>
      <button className="terminal-command magnetic-target" type="button" onClick={() => runCommand('help')}>
        Run stack scan
      </button>
      <div className="signal-grid">
        {highlights.map((item) => (
          <div className="signal" key={item}>
            <strong>{item}</strong>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
