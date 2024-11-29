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

export default async function VenuePage({ params }: { params: { tourid: string } }) {
  const { tourid } = await params
  const { data } = await getTourSetSongs(tourid)

  if (!data.length) {
    notFound()
  }

  const tourName = data[0].tourname
  const tourWhen = data[0].tourwhen

  const phishTourSongs = filter(data, { artist_slug: 'phish' }).filter(
    x => x.exclude === '0',
  )

  const tourShowsSongs = uniqBy(phishTourSongs, 'showid')
  const firstTourShow = minBy(tourShowsSongs, x => new Date(x.showdate))
  const lastTourShow = maxBy(tourShowsSongs, x => new Date(x.showdate))

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-8 pb-12'>
        <div className='pl-6 drop-shadow-2xl'>
          <h1 className='mb-2 max-w-[700px] text-5xl font-bold tracking-tight'>
            {tourName}
          </h1>
          <h3 className='ml-2 font-light'>{tourWhen}</h3>
        </div>
        <Card className='p-6'>
          <div className='flex items-center gap-8'>
            <div>
              {firstTourShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-400'>First Show:</span>
                  <Button asChild variant='link'>
                    <Link href={firstTourShow.permalink} target='_blank'>
                      {firstTourShow.showdate}
                    </Link>
                  </Button>
                </div>
              )}
              {lastTourShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-400'>Last Show:</span>
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
        <ShowTimeline showSongs={tourShowsSongs} />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <Debuts setSongs={phishTourSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <LastPlays setSongs={phishTourSongs} />
          </div>
        </div>
        <MostPlayedSongs setSongs={phishTourSongs} />
      </div>
    </div>
  )
}
