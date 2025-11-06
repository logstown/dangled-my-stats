// Timeline
// Most popular Songs
// Debuts
// Last played
// total length of songs played

import { filter, maxBy, minBy, uniqBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getTourSetSongs } from '@/lib/phish-service'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TimesPlayed } from '@/app/(most)/song/[slug]/_components/TimesPlayed'
import ShowTimeline from '@/components/Timeline'
import { Debuts } from '@/components/Debuts'
import { LastPlays } from '@/components/LastPlays'
import { MostPlayedSongs } from '@/components/MostPlayedSongs'
import { Card } from '@/components/ui/card'
import { BusIcon } from 'lucide-react'
import { SlideUpWrapper } from '@/components/slide-up-wrapper'
import { HtmlText } from '@/components/html-text'

export default async function VenuePage({
  params,
}: {
  params: Promise<{ tourid: string }>
}) {
  const { tourid } = await params
  const { data } = await getTourSetSongs(tourid)

  if (!data.length) {
    notFound()
  }

  const tourName = data[0].tourname
  const tourWhen = data[0].tourwhen

  const phishTourSongs = filter(data, { artist_slug: 'phish' }).filter(
    x => x.exclude == 0,
  )

  const tourShowsSongs = uniqBy(phishTourSongs, 'showid')
  const firstTourShow = minBy(tourShowsSongs, x => new Date(x.showdate))
  const lastTourShow = maxBy(tourShowsSongs, x => new Date(x.showdate))

  return (
    <SlideUpWrapper>
      <div className='flex flex-wrap items-center justify-center gap-8 pb-12 sm:justify-between'>
        <div className='flex flex-col items-center gap-4 pl-6 drop-shadow-2xl sm:flex-row sm:items-baseline'>
          <BusIcon size={30} className='text-neutral-400' />
          <div>
            <h1 className='max-w-[700px] bg-linear-to-br from-primary to-[#E76E50] bg-clip-text pb-2 text-center text-5xl font-bold tracking-tight text-transparent sm:text-left'>
              <HtmlText>{tourName}</HtmlText>
            </h1>
            <h3 className='text-center font-light sm:ml-2 sm:text-left'>
              <HtmlText>{tourWhen}</HtmlText>
            </h3>
          </div>
        </div>
        <Card className='w-full p-6 sm:w-fit'>
          <div className='flex items-center justify-evenly gap-4 sm:gap-8'>
            <div>
              {firstTourShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-500'>First Show:</span>
                  <Button asChild variant='link'>
                    <Link href={firstTourShow.permalink} target='_blank'>
                      {firstTourShow.showdate}
                    </Link>
                  </Button>
                </div>
              )}
              {lastTourShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-500'>Last Show:</span>
                  <Button asChild variant='link'>
                    <Link href={lastTourShow.permalink} target='_blank'>
                      {lastTourShow.showdate}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <div>
              <TimesPlayed
                isVenue
                timesPlayed={Number(tourShowsSongs.length)}
                mostPlayedSongCount={124}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <Debuts setSongs={phishTourSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <LastPlays setSongs={phishTourSongs} />
          </div>
        </div>
        <ShowTimeline showSongs={tourShowsSongs} />
        <MostPlayedSongs setSongs={phishTourSongs} />
      </div>
    </SlideUpWrapper>
  )
}
