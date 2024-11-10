import { filter, find, uniqBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getAllVenues, getVenueSetSongs } from '@/lib/phish-service'
import VenueTimeline from './_components/VenueTimeline'
import { MostPlayedSongs } from './_components/MostPlayedSongs'
import { VenueDebuts } from './_components/Debuts'
import { VenueLastPlays } from './_components/LastPlays'

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

  const venueShowsSongs = uniqBy(setVenues, 'showid')

  //timeline                      check
  // song counts                  check
  // list tours
  // average number of sets
  // Song debuts                 check
  // Song last playeds           check
  // reviews

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
      <div className='flex flex-col gap-16'>
        {/* <TimelineFrequency setVenues={setVenues} /> */}
        <VenueTimeline venueShowsSongs={venueShowsSongs} />
        <VenueDebuts venueSongs={setVenues} />
        <VenueLastPlays venueSongs={setVenues} />
        <div className='w-full lg:w-1/2'>
          <MostPlayedSongs venueSongs={setVenues} />
        </div>
        {/* <div className='flex flex-col gap-8 lg:flex-row'>
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
        </div> */}
      </div>
    </div>
  )
}
