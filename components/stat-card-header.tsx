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
    <CardHeader className='mb-2 flex flex-row items-center justify-between gap-6 space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{children}</CardTitle>
      <Icon size={15} />
    </CardHeader>
  )
}
