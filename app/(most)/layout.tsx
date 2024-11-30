import { Navbar } from '@/components/navbar'
import { ReactNode } from 'react'

export default function WeirdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='px-4 pt-8 sm:px-8 md:px-16 md:pt-16'>{children}</div>
    </>
  )
}
