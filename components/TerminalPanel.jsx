'use client'

import { motion } from 'framer-motion'

export function TerminalPanel() {
  return (
    <motion.div 
      className="terminal-window"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="window-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="code-lines">
        <p>
          <span className="code-keyword">import</span> {'{ '}
          <span className="code-function">Developer</span>
          {' }'} <span className="code-keyword">from</span> <span className="code-string">'@muzammal/core'</span>;
        </p>
        <br />
        <p>
          <span className="code-keyword">const</span> profile = {'{'}
        </p>
        <p style={{ paddingLeft: '1.5rem' }}>
          name: <span className="code-string">'Muzammal Ateeq'</span>,
        </p>
        <p style={{ paddingLeft: '1.5rem' }}>
          role: <span className="code-string">'Full-Stack Software Engineer'</span>,
        </p>
        <p style={{ paddingLeft: '1.5rem' }}>
          skills: [<span className="code-string">'React'</span>, <span className="code-string">'Next.js'</span>, <span className="code-string">'React Native'</span>, <span className="code-string">'Supabase'</span>, <span className="code-string">'Tailwind'</span>],
        </p>
        <p style={{ paddingLeft: '1.5rem' }}>
          passion: <span className="code-string">'Building high-performance, beautiful user interfaces'</span>
        </p>
        <p>{'};'}</p>
        <br />
        <p>
          <span className="code-comment">// Let's build something amazing together.</span>
        </p>
        <p>
          <span className="code-function">profile.init</span>();
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--accent-primary)', marginLeft: '4px', verticalAlign: 'middle' }}
          />
        </p>
      </div>
    </motion.div>
  )
}
