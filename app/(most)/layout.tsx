import { Navbar } from '@/components/navbar'
import { ReactNode } from 'react'

export default function WeirdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='p-4 sm:p-8 md:p-16'>{children}</div>
    </>
  )
}
