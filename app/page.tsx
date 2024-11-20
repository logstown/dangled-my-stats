'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { shirkhand } from './fonts/fonts'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='flex h-full flex-col items-center justify-center gap-10'
      >
        <div className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3'>
          <h1
            className={`${shirkhand.className} text-4xl leading-none tracking-tight drop-shadow-2xl md:text-5xl xl:text-7xl`}
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
        </div>
      </motion.div>
    </AuroraBackground>
  )
}
