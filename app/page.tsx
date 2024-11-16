import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { shirkhand } from './fonts/fonts'

export default function Home() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3'>
        <h1
          className={`${shirkhand.className} text-4xl leading-none tracking-tight drop-shadow-2xl md:text-5xl xl:text-7xl`}
        >
          Dangled My Stats
        </h1>
        <h3 className='sm:tex-base text-sm text-neutral-500 lg:text-xl'>
          Phish charts and data
        </h3>
      </div>
      <div className='px-10'>
        <Image
          className='rounded-full shadow-xl'
          width={400}
          height={400}
          alt='landing page'
          src='/landingimage.jpeg'
        />
      </div>
      <div className='text-center'>
        <p className='text-xl text-neutral-500'>Browse:</p>
        <div className='flex flex-col items-center justify-center gap-4 p-4 sm:flex-row'>
          <Button
            asChild
            size='lg'
            className='w-full px-8 py-6 text-lg shadow-xl sm:w-auto'
          >
            <Link href='/browse/songs'>Songs</Link>
          </Button>
          <Button
            asChild
            size='lg'
            className='w-full px-8 py-6 text-lg shadow-xl sm:w-auto'
          >
            <Link href='/browse/venues'>Venues</Link>
          </Button>
          <Button
            asChild
            size='lg'
            className='w-full px-8 py-6 text-lg shadow-xl sm:w-auto'
          >
            <Link href='/browse/tours'>Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
