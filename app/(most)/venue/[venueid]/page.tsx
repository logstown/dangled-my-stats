import { filter, find, maxBy, minBy, uniqBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getAllVenues, getVenueSetSongs } from '@/lib/phish-service'
import { VenueTours } from './_components/Tours'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TimesPlayed } from '@/app/(most)/song/[slug]/_components/TimesPlayed'
import ShowTimeline from '@/components/Timeline'
import { Debuts } from '@/components/Debuts'
import { LastPlays } from '@/components/LastPlays'
import { MostPlayedSongs } from '@/components/MostPlayedSongs'
import { Card } from '@/components/ui/card'
import { TicketIcon } from 'lucide-react'
import { SlideUpWrapper } from '@/components/slide-up-wrapper'

export default async function VenuePage({
  params,
}: {
  params: Promise<{ venueid: string }>
}) {
  const { data: allVenues, error } = await getAllVenues()

  if (error) {
    return
  }

  const { venueid } = await params
  const venue = find(allVenues, { venueid: Number(venueid) })

  if (!venue) {
    notFound()
  }

  const setVenueResponse = await getVenueSetSongs(venueid)
  const setVenues = filter(setVenueResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === 0,
  )

  const venueShowsSongs = uniqBy(setVenues, 'showid')
  const firstVenueShow = minBy(venueShowsSongs, x => new Date(x.showdate))
  const lastVenueShow = maxBy(venueShowsSongs, x => new Date(x.showdate))

  //timeline                      check
  // song counts                  check
  // list tours                   check
  // average number of sets
  // Song debuts                 check
  // Song last playeds           check
  // reviews
  // Total length of songs played

  return (
    <SlideUpWrapper>
      <div className='flex flex-wrap items-center justify-center gap-8 pb-12 sm:justify-between'>
        <div className='flex flex-col items-center gap-4 pl-6 drop-shadow-2xl sm:flex-row sm:items-baseline'>
          <TicketIcon size={30} className='text-neutral-400' />
          <div>
            <h1 className='max-w-[700px] bg-gradient-to-br from-primary to-[#E76E50] bg-clip-text pb-2 text-center text-5xl font-bold tracking-tight text-transparent sm:text-left'>
              {venue.venuename}
            </h1>
            <h3 className='text-center font-light sm:ml-2 sm:text-left'>
              {venue.city}, {venue.state || venue.country}
            </h3>
          </div>
        </div>
        <Card className='w-full p-6 sm:w-fit'>
          <div className='flex items-center justify-evenly gap-8'>
            <div>
              {firstVenueShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-500'>First Show:</span>
                  <Button asChild variant='link'>
                    <Link href={firstVenueShow.permalink} target='_blank'>
                      {firstVenueShow.showdate}
                    </Link>
                  </Button>
                </div>
              )}
              {lastVenueShow && (
                <div className='flex items-baseline justify-end'>
                  <span className='font-bold text-zinc-500'>Last Show:</span>
                  <Button asChild variant='link'>
                    <Link href={lastVenueShow.permalink} target='_blank'>
                      {lastVenueShow.showdate}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <div>
              <TimesPlayed
                isVenue
                timesPlayed={Number(venueShowsSongs.length)}
                mostPlayedSongCount={60}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <Debuts setSongs={setVenues} />
          </div>
          <div className='w-full lg:w-1/2'>
            <LastPlays setSongs={setVenues} />
          </div>
        </div>
        <MostPlayedSongs setSongs={setVenues} />
        <ShowTimeline showSongs={venueShowsSongs} shouldDisplayDate />
        <VenueTours venueSongs={setVenues} />
      </div>
    </SlideUpWrapper>
  )
}
