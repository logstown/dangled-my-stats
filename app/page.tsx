import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { SearchAllServer } from '@/components/search-all-server'
import { shirkhand } from './fonts/fonts'
import { AuroraWrapper } from '@/components/aurora-wrapper'
import { ArrowRight } from 'lucide-react'
import { formatUpdateDate, updates } from '@/lib/updates'

export default function HomePage() {
  const latestUpdate = updates[0]

  return (
    <AuroraWrapper>
      <div className='flex h-full flex-col items-center justify-center gap-5 sm:gap-10'>
        <div className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3'>
          <h1
            className={`${shirkhand.className} from-primary bg-linear-to-br to-[#E76E50] bg-clip-text text-4xl leading-none tracking-tight text-transparent drop-shadow-2xl md:text-5xl xl:text-7xl`}
          >
            Dangled My Stats
          </h1>
          <h3 className='sm:tex-base text-sm text-neutral-500 lg:text-xl'>
            Phish data for fun
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
            <Link href='/songs'>Songs</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='link'
            className='w-full px-8 py-6 text-lg sm:w-auto'
          >
            <Link href='/venues'>Venues</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='link'
            className='w-full px-8 py-6 text-lg sm:w-auto'
          >
            <Link href='/tours'>Tours</Link>
          </Button>
          <div className='sm:ml-6'>
            <SearchAllServer />
          </div>
        </div>
        <Link
          href={`/updates#${latestUpdate.id}`}
          className='border-primary/15 focus-visible:outline-ring relative z-20 mx-4 flex max-w-md items-center gap-4 rounded-xl border bg-white/80 px-5 py-3 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4'
        >
          <div>
            <div className='text-muted-foreground text-xs'>
              <span className='text-primary font-semibold'>Latest update</span>
              {' · '}
              <time dateTime={latestUpdate.date}>
                {formatUpdateDate(latestUpdate.date)}
              </time>
            </div>
            <p className='mt-1 text-sm font-medium'>{latestUpdate.title}</p>
          </div>
          <ArrowRight className='text-primary size-4 shrink-0' aria-hidden='true' />
        </Link>
      </div>
    </AuroraWrapper>
  )
}
