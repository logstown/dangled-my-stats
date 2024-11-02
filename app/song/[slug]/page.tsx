import { filter, find, maxBy, minBy, sortBy } from 'lodash'
import { notFound } from 'next/navigation'
import { MostPlayedVenue } from './_components/MostPlayedVenue'
import { MostPlayedTour } from './_components/MostPlayedTour'
import { SetBreakdown } from './_components/SetBreakdown'
import { SegueBreakdown } from './_components/SegueBreakdown'
import { getAllSongs, getSongFromSets } from '@/lib/phish-service'
import { TimesPlayed } from './_components/TimesPlayed'
import { LongestGap } from './_components/LongestGap'
import { RandomThing } from '@/components/random-thing'
import { TimelineTwoDot } from './_components/TimelineTwoDot'
import { LongestRun } from './_components/LongestRun'

export default async function SongPage({ params }: { params: { slug: string } }) {
  const { data: allSongs, error } = await getAllSongs()

  if (error) {
    return
  }

  // const sortedSongs = sortBy(allSongsResp.data, x => Number(x.times_played))

  const { slug } = await params
  const song = find(allSongs, { slug })

  if (!song) {
    notFound()
  }

  const mostPlayedSongCount = maxBy(allSongs, x =>
    Number(x.times_played),
  )?.times_played
  const largestGap = maxBy(
    allSongs.filter(x => Number(x.times_played) > 1),
    x => Number(x.gap),
  )?.gap
  const earliestDebut = minBy(allSongs, x => new Date(x.debut))?.debut
  const latestLastPlayed = maxBy(allSongs, x => new Date(x.last_played))?.last_played

  const setSongsResponse = await getSongFromSets(slug)
  const setSongs = filter(setSongsResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === '0',
  )

  const deal = sortBy(allSongs, x => Number(x.gap)).reverse()

  return (
    <div>
      {/* <RandomThing allSongs={allSongsResp.data} /> */}
      <div className='mb-16 flex justify-between'>
        <div>
          <h1 className='mb-2 text-5xl font-bold tracking-tight'>
            {song.song}
            {song.abbr && (
              <span className='ml-2 text-xl font-normal'>({song.abbr})</span>
            )}
          </h1>
          <h3 className='font-light'>Original Artist: {song.artist}</h3>
        </div>
        <RandomThing allSongs={allSongs} />
      </div>
      <div className='mb-36'>
        <TimelineTwoDot
          song={song}
          earliestDebut={earliestDebut}
          lastShow={latestLastPlayed}
        />
      </div>
      <div className='flex flex-wrap items-center justify-around gap-6'>
        <div>
          <TimesPlayed
            timesPlayed={song.times_played}
            mostPlayedSongCount={mostPlayedSongCount}
          />
        </div>
        <div>
          <LongestRun setSongs={setSongs} />
        </div>
        <div>
          <LongestGap setSongs={setSongs} />
        </div>
        <div>
          <SetBreakdown setSongs={setSongs} />
        </div>
        <div>
          <SegueBreakdown setSongs={setSongs} />
        </div>
        <div>
          <MostPlayedVenue setSongs={setSongs} />
        </div>
        <div>
          <MostPlayedTour setSongs={setSongs} />
        </div>
      </div>
    </div>
  )
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={`text-xl font-light uppercase text-muted-foreground ${className}`}
    >
      {children}
    </h3>
  )
}
