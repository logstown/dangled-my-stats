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

export default async function VenuePage({
  params,
}: {
  params: { venueid: string }
}) {
  const { data: allVenues, error } = await getAllVenues()

  if (error) {
    return
  }

  const { venueid } = await params
  const venue = find(allVenues, { venueid })

  if (!venue) {
    notFound()
  }

  const setVenueResponse = await getVenueSetSongs(venueid)
  const setVenues = filter(setVenueResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === '0',
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
    <div>
      <div className='flex flex-wrap items-center justify-between gap-8 pb-12'>
        <div className='flex flex-wrap items-center gap-8'>
          <div>
            <h1 className='mb-2 max-w-[700px] text-5xl font-bold tracking-tight'>
              {venue.venuename}
              {/* {!!Number(venue.alias) && (
                <span className='ml-2 text-xl font-normal'>({venue.alias})</span>
              )} */}
            </h1>
            <h3 className='ml-2 font-light'>
              {venue.city}, {venue.state ?? venue.country}
            </h3>
          </div>
        </div>
        <div className='flex items-center gap-8'>
          <div>
            {firstVenueShow && (
              <div className='flex items-baseline justify-end'>
                <span className='font-bold text-zinc-400'>First Show:</span>
                <Button asChild variant='link'>
                  <Link href={firstVenueShow.permalink} target='_blank'>
                    {firstVenueShow.showdate}
                  </Link>
                </Button>
              </div>
            )}
            {lastVenueShow && (
              <div className='flex items-baseline justify-end'>
                <span className='font-bold text-zinc-400'>Last Show:</span>
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
      </div>
      <div className='flex flex-col gap-16'>
        <ShowTimeline showSongs={venueShowsSongs} shouldDisplayDate />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <Debuts setSongs={setVenues} />
          </div>
          <div className='w-full lg:w-1/2'>
            <LastPlays setSongs={setVenues} />
          </div>
        </div>
        <MostPlayedSongs setSongs={setVenues} />
        <VenueTours venueSongs={setVenues} />
      </div>
    </div>
  )
}