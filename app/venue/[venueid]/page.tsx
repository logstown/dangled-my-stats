import { filter, find, maxBy, minBy } from 'lodash'
import { notFound } from 'next/navigation'
import {
  getAllSongs,
  getAllVenues,
  getSongFromSets,
  getVenueSetSongs,
} from '@/lib/phish-service'
import { RandomThing } from '@/components/random-thing'
import Link from 'next/link'
import { Song } from '@/lib/models'
import { Button } from '@/components/ui/button'
import { TimesPlayed } from '@/app/song/[slug]/_components/TimesPlayed'

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

  console.log(venue)

  // const mostPlayedSongCount = maxBy(allVenues, x =>
  //   Number(x.times_played),
  // )!.times_played

  // const earliestDebut = minBy(allVenues, x => new Date(x.debut))!.debut
  // const latestLastPlayed = maxBy(allVenues, x => new Date(x.last_played))!.last_played

  const setVenueResponse = await getVenueSetSongs(venueid)
  const setVenues = filter(setVenueResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === '0',
  )

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-8 pb-12'>
        <div className='flex flex-wrap items-center gap-8'>
          <div>
            <h1 className='mb-2 max-w-[700px] text-5xl font-bold tracking-tight'>
              {venue.venuename}
              {!!Number(venue.alias) && (
                <span className='ml-2 text-xl font-normal'>({venue.alias})</span>
              )}
            </h1>
            <h3 className='ml-2 font-light'>
              {venue.city}, {venue.state ?? venue.country}
            </h3>
          </div>
        </div>
        {/* <div className='flex items-center gap-8'>
          <div>
            <div className='flex items-baseline justify-end'>
              <span className='font-bold text-zinc-400'>Debut:</span>
              <Button asChild variant='link'>
                <Link href={venue.debut_permalink} target='_blank'>
                  {venue.debut}
                </Link>
              </Button>
            </div>
            <div className='flex items-baseline justify-end'>
              <span className='font-bold text-zinc-400'>Last Played:</span>
              <Button asChild variant='link'>
                <Link href={venue.last_permalink} target='_blank'>
                  {venue.last_played}
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <TimesPlayed
              timesPlayed={Number(venue.times_played)}
              mostPlayedSongCount={Number(mostPlayedSongCount)}
            />
          </div>
        </div> */}
      </div>
      {/* <div className='flex flex-col gap-16'>
        <TimelineFrequency setVenues={setVenues} />
        <SongTimeline
          setVenues={setVenues}
          earliestDebut={earliestDebut}
          lastShow={latestLastPlayed}
        />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <SetBreakdown setVenues={setVenues} />
          </div>
          <div className='w-full lg:w-1/2'>
            <SegueBreakdown setVenues={setVenues} />
          </div>
        </div>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <MostPlayedVenues setVenues={setVenues} />
          </div>
          <div className='w-full lg:w-1/2'>
            <MostPlayedTours setVenues={setVenues} />
          </div>
        </div>
      </div> */}
    </div>
  )
}
