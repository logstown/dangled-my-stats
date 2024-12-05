'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function SlideUpWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
