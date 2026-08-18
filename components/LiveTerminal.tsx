'use client'

import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

type HistoryEntry = {
  command: string
  output: React.ReactNode
}

export function LiveTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: (
        <div className="text-slate-500 font-medium">
          Welcome to muzammal.dev terminal v2.0.<br />
          Type <span className="text-indigo-600 font-bold">help</span> to see available commands.
        </div>
      )
    }
  ])
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (history.length > 1) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    
    const cmd = input.trim().toLowerCase()
    let output: React.ReactNode = ''

    if (cmd === '') return

    switch (cmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-slate-600 font-medium">
            <div><span className="text-indigo-600 font-bold w-20 inline-block">help</span> - Show this message</div>
            <div><span className="text-indigo-600 font-bold w-20 inline-block">projects</span> - List featured projects</div>
            <div><span className="text-indigo-600 font-bold w-20 inline-block">skills</span> - List technical skills</div>
            <div><span className="text-indigo-600 font-bold w-20 inline-block">contact</span> - Show contact information</div>
            <div><span className="text-indigo-600 font-bold w-20 inline-block">clear</span> - Clear terminal output</div>
          </div>
        )
        break
      case 'projects':
        output = (
          <div className="flex flex-col gap-2">
            {projects.map(p => (
              <div key={p.id} className="font-medium">
                <span className="text-indigo-600 font-bold">{p.title}</span>
                <span className="text-slate-400 ml-2">[{p.stack.slice(0,2).join(', ')}]</span>
              </div>
            ))}
          </div>
        )
        break
      case 'skills':
        output = (
          <div className="flex flex-col gap-2">
            {skills.map(c => (
              <div key={c.title} className="font-medium">
                <span className="text-indigo-600 font-bold">{c.title}:</span>
                <span className="text-slate-600 ml-2">{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        )
        break
      case 'contact':
        output = (
          <div className="flex flex-col gap-1 text-slate-600 font-medium">
            <div>Email: <a href="mailto:muzamilateeq423@gmail.com" className="text-indigo-600 hover:underline">muzamilateeq423@gmail.com</a></div>
            <div>LinkedIn: linkedin.com/in/...</div>
            <div>GitHub: github.com/muzamilateeq</div>
          </div>
        )
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        output = <div className="text-rose-500 font-medium">Command not found: {cmd}. Type 'help' for available commands.</div>
    }

    setHistory(prev => [...prev, { command: cmd, output }])
    setInput('')
  }

  return (
    <div 
      className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-200/60 bg-white/80 backdrop-blur-xl font-mono text-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-slate-50/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600/20" />
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/20" />
        </div>
        <div className="flex-1 text-center flex items-center justify-center gap-2 text-slate-500 font-bold text-xs">
          <TerminalIcon size={12} /> zsh ~ guest@muzammal.dev
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 h-[300px] overflow-y-auto cursor-text text-slate-700 font-medium">
        {history.map((entry, i) => (
          <div key={i} className="mb-4">
            {entry.command && (
              <div className="flex items-center gap-2 mb-1 font-bold">
                <span className="text-indigo-600">➜</span>
                <span className="text-violet-500">~</span>
                <span className="text-slate-900">{entry.command}</span>
              </div>
            )}
            <div className="pl-4">{entry.output}</div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 font-bold">
          <span className="text-indigo-600">➜</span>
          <span className="text-violet-500">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  )
}
