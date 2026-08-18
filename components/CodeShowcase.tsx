'use client'

import { useState } from 'react'
import { Check, Copy, FileCode, Play, Terminal } from 'lucide-react'

const files = [
  {
    name: 'NextApp.tsx',
    language: 'typescript',
    code: `import { createServerClient } from '@supabase/ssr'
import { motion } from 'framer-motion'

export default async function RealtimeDashboard() {
  const supabase = createServerClient()
  const { data: metrics } = await supabase.from('analytics').select('*')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MetricsGrid data={metrics} cacheStrategy="stale-while-revalidate" />
    </motion.div>
  )
}`,
  },
  {
    name: 'Architecture.ts',
    language: 'typescript',
    code: `interface SystemConfig {
  environment: 'production' | 'staging'
  maxLatencyMs: number
  cacheUptime: '99.9%'
}

export const coreArchitecture: SystemConfig = {
  environment: 'production',
  maxLatencyMs: 45,
  cacheUptime: '99.9%',
}`,
  },
  {
    name: 'Database.prisma',
    language: 'prisma',
    code: `model UserProfile {
  id        String   @id @default(uuid())
  email     String   @unique
  projects  Project[]
  createdAt DateTime @default(now())
}

model Project {
  id        String   @id @default(cuid())
  title     String
  authorId  String
  author    UserProfile @relation(fields: [authorId], references: [id])
}`,
  },
]

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRun = () => {
    setRunning(true)
    setOutput('Compiling TypeScript...')
    setTimeout(() => {
      setOutput('✓ Build Success | 0 errors | Latency: 38ms')
      setRunning(false)
    }, 1200)
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl font-mono">
      {/* IDE Header Bar */}
      <div className="bg-[#030712]/90 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          
          <div className="ml-4 flex items-center gap-1.5 overflow-x-auto">
            {files.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => { setActiveTab(idx); setOutput(null) }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-violet-600/30 border border-violet-500/40 text-violet-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <FileCode size={13} className={activeTab === idx ? 'text-violet-400' : 'text-slate-500'} />
                {file.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
          >
            <Play size={12} className="fill-emerald-300" /> Run Code
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all"
            title="Copy Code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* IDE Code Viewport */}
      <div className="p-5 text-xs md:text-sm leading-relaxed overflow-x-auto bg-[#030712]/70 text-slate-200 min-h-[220px] font-mono">
        <pre className="whitespace-pre">
          <code>
            {files[activeTab].code.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-slate-600 pr-4 select-none text-right w-8">{i + 1}</span>
                <span className="table-cell">
                  {line
                    .replace(/(import|export|default|function|const|async|return|interface|model)/g, '🔑$1🔑')
                    .replace(/(from|await|type)/g, '⚡$1⚡')
                    .split(/(🔑.*?🔑|⚡.*?⚡)/)
                    .map((part, pIdx) => {
                      if (part.startsWith('🔑')) {
                        return <span key={pIdx} className="text-violet-400 font-bold">{part.replaceAll('🔑', '')}</span>
                      }
                      if (part.startsWith('⚡')) {
                        return <span key={pIdx} className="text-cyan-400 font-bold">{part.replaceAll('⚡', '')}</span>
                      }
                      if (part.includes("'") || part.includes('"')) {
                        return <span key={pIdx} className="text-emerald-300">{part}</span>
                      }
                      return <span key={pIdx}>{part}</span>
                    })}
                </span>
              </div>
            ))}
          </code>
        </pre>

        {output && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <Terminal size={14} /> {output}
          </div>
        )}
      </div>
    </div>
  )
}
