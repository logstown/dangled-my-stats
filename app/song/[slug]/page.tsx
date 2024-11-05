import { filter, find, maxBy, minBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getAllSongs, getSongFromSets } from '@/lib/phish-service'
import { RandomThing } from '@/components/random-thing'
import Link from 'next/link'
import { Song } from '@/lib/models'
import { TimesPlayed } from './_components/TimesPlayed'
import SongTimeline from './_components/Timeline'
import { TimelineFrequency } from './_components/TimelineFrequency'
import { Button } from '@/components/ui/button'
import { SetBreakdown } from './_components/SetBreakdown'
import { SegueBreakdown } from './_components/SegueBreakdown'
import { MostPlayedVenue } from './_components/MostPlayedVenue'
import { MostPlayedTour } from './_components/MostPlayedTour'

export default async function SongPage({ params }: { params: { slug: string } }) {
  const { data: allSongs, error } = await getAllSongs()

  if (error) {
    return
  }

  const { slug } = await params
  const song = find(allSongs, { slug }) as Song

  if (!song) {
    notFound()
  }

  const mostPlayedSongCount = maxBy(allSongs, x =>
    Number(x.times_played),
  )!.times_played

  const earliestDebut = minBy(allSongs, x => new Date(x.debut))!.debut
  const latestLastPlayed = maxBy(allSongs, x => new Date(x.last_played))!.last_played

  const setSongsResponse = await getSongFromSets(slug)
  const setSongs = filter(setSongsResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === '0',
  )

  return (
    <div>
      <div className='flex flex-wrap items-baseline justify-between gap-8 pb-12'>
        <div className='flex flex-wrap items-center gap-8'>
          <div>
            <h1 className='mb-2 text-5xl font-bold tracking-tight'>
              {song.song}
              {song.abbr && (
                <span className='ml-2 text-xl font-normal'>({song.abbr})</span>
              )}
            </h1>
            <h3 className='ml-2 font-light'>Original Artist: {song.artist}</h3>
          </div>
          <div>
            <TimesPlayed
              timesPlayed={Number(song.times_played)}
              mostPlayedSongCount={Number(mostPlayedSongCount)}
            />
          </div>
          <div>
            <div className='flex items-baseline justify-end'>
              <span className='font-bold text-zinc-400'>Debut:</span>
              <Button asChild variant='link'>
                <Link href={song.debut_permalink} target='_blank'>
                  {song.debut}
                </Link>
              </Button>
            </div>
            <div className='flex items-baseline justify-end'>
              <span className='font-bold text-zinc-400'>Last Played:</span>
              <Button asChild variant='link'>
                <Link href={song.last_permalink} target='_blank'>
                  {song.last_played}
                </Link>
              </Button>
            </div>
          </div>
          {/* <div className='flex items-baseline gap-2'>
            <span className='font-bold text-zinc-400'>Gap:</span>
            <span>{song.gap}</span>
          </div> */}
        </div>
        <RandomThing allSongs={allSongs} />
      </div>
      <div className='flex flex-col gap-16'>
        <TimelineFrequency setSongs={setSongs} />
        <SongTimeline
          setSongs={setSongs}
          earliestDebut={earliestDebut}
          lastShow={latestLastPlayed}
        />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <SetBreakdown setSongs={setSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <SegueBreakdown setSongs={setSongs} />
          </div>
        </div>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <MostPlayedVenue setSongs={setSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <MostPlayedTour setSongs={setSongs} />
          </div>
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
