'use client'

import { ReactNode } from 'react'
import { AuroraBackground } from './ui/aurora-background'
import { motion } from 'framer-motion'

export function AuroraWrapper({ children }: { children: ReactNode }) {
  return (
    <AuroraBackground>
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
    </AuroraBackground>
  )
}
