import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className='flex justify-center p-16'>
      <Spinner size='large' />
    </div>
  )
}
