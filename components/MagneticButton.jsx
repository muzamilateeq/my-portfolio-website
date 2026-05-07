'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticButton({ children, className = '', href, type = 'button', ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 15 })
  const springY = useSpring(y, { stiffness: 180, damping: 15 })
  const MotionTag = href ? motion.a : motion.button

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.24)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.24)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionTag
      className={`magnetic-target ${className}`}
      href={href}
      type={href ? undefined : type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
