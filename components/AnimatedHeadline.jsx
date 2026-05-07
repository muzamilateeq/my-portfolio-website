'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const phrases = ['Scalable Apps', 'Stunning UIs', 'Clean Code']

export function AnimatedHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length)
    }, 2300)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <h1>
      Muzammal Ateeq
      <span className="headline-break">Building </span>
      <span className="headline-dynamic" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrases[phraseIndex]}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -24, filter: 'blur(10px)' }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            {phrases[phraseIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  )
}
