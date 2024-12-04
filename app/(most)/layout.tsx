import { Navbar } from '@/components/navbar'
import { ReactNode } from 'react'

export default function WeirdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative w-full bg-white px-4 pt-8 dark:bg-black sm:px-8 md:px-16 md:py-16'>
        {children}
      </div>
    </>
  )
}
