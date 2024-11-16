import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className='flex justify-center'>
      <Spinner size='large' />
    </div>
  )
}