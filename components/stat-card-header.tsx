import { ComponentType } from 'react'
import { CardHeader, CardTitle } from './ui/card'

export function StatCardHeader({
  children,
  Icon,
}: {
  children: React.ReactNode
  Icon: ComponentType<any>
}) {
  return (
    <CardHeader>
      <CardTitle className='flex items-center gap-3 sm:gap-4'>
        <Icon size={20} className='text-neutral-400' />
        {children}
      </CardTitle>
    </CardHeader>
  )
}
