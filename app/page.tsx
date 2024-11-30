import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { SearchAllServer } from '@/components/search-all-server'
import { shirkhand } from './fonts/fonts'
import { AuroraWrapper } from '@/components/aurora-wrapper'

export default function HomePage() {
  return (
    <AuroraWrapper>
      <div className='flex h-full flex-col items-center justify-center gap-10'>
        <div className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3'>
          <h1
            className={`${shirkhand.className} bg-gradient-to-br from-primary to-teal-500 bg-clip-text text-4xl leading-none tracking-tight text-transparent drop-shadow-2xl md:text-5xl xl:text-7xl`}
          >
            Dangled My Stats
          </h1>
          <h3 className='sm:tex-base text-sm text-neutral-500 lg:text-xl'>
            Phish data
          </h3>
        </div>
        <div className='px-10'>
          <Image
            className='rounded-2xl shadow-xl'
            width={500}
            height={500}
            alt='landing page'
            src='/Phish_2009-12-30.jpg'
          />
        </div>
        <div className='relative z-20 flex flex-col items-center justify-center gap-4 p-4 sm:flex-row'>
          <Button
            asChild
            size='lg'
            variant='link'
            className='w-full px-8 py-6 text-lg sm:w-auto'
          >
            <Link href='/browse/songs'>Songs</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='link'
            className='w-full px-8 py-6 text-lg sm:w-auto'
          >
            <Link href='/browse/venues'>Venues</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='link'
            className='w-full px-8 py-6 text-lg sm:w-auto'
          >
            <Link href='/browse/tours'>Tours</Link>
          </Button>
          <div className='sm:ml-6'>
            <SearchAllServer />
          </div>
        </div>
      </div>
    </AuroraWrapper>
  )
}
