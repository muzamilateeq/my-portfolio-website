'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const cursorX = useMotionValue(-80)
  const cursorY = useMotionValue(-80)
  const x = useSpring(cursorX, { stiffness: 420, damping: 32 })
  const y = useSpring(cursorY, { stiffness: 420, damping: 32 })
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    function moveCursor(event) {
      cursorX.set(event.clientX - 17)
      cursorY.set(event.clientY - 17)
    }

    function handleOver(event) {
      const projectTarget = event.target.closest('.project-flip-card')
      setLabel(projectTarget ? 'View Project' : '')
      setActive(Boolean(projectTarget || event.target.closest('a, button, input, textarea, .magnetic-target')))
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y, scale: active ? 1.55 : 1 }}
      aria-hidden="true"
    >
      <span className="cursor-dot"></span>
      {label ? <span className="cursor-label">{label}</span> : null}
    </motion.div>
  )
}
