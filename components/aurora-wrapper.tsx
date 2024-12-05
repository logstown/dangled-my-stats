'use client'

import { ReactNode } from 'react'
import { AuroraBackground } from './ui/aurora-background'
import { SlideUpWrapper } from './slide-up-wrapper'

export function AuroraWrapper({ children }: { children: ReactNode }) {
  return (
    <AuroraBackground>
      <SlideUpWrapper>{children}</SlideUpWrapper>
    </AuroraBackground>
  )
}
