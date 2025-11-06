import { filter, find, maxBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getAllSongs, getSongFromSets } from '@/lib/phish-service'
import Link from 'next/link'
import { Song } from '@/lib/models'
import { TimesPlayed } from './_components/TimesPlayed'
import { TimelineFrequency } from './_components/TimelineFrequency'
import { Button } from '@/components/ui/button'
import { SetBreakdown } from './_components/SetBreakdown'
import { SegueBreakdown } from './_components/SegueBreakdown'
import { MostPlayedVenues } from './_components/MostPlayedVenues'
import { MostPlayedTours } from './_components/MostPlayedTours'
import ShowTimeline from '@/components/Timeline'
import { Card } from '@/components/ui/card'
import { MusicIcon } from 'lucide-react'
import { SlideUpWrapper } from '@/components/slide-up-wrapper'
import { HtmlText } from '@/components/html-text'

// average length

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { data: allSongs, error } = await getAllSongs()

  if (error) {
    return
  }

  const { slug } = await params
  const song = find(allSongs, { slug }) as Song

  if (!song) {
    notFound()
  }

  const mostPlayedSongCount = maxBy(allSongs, 'times_played')!.times_played

  const setSongsResponse = await getSongFromSets(slug)
  console.log(setSongsResponse.error, setSongsResponse.data[0])
  const setSongs = filter(setSongsResponse.data, { artist_slug: 'phish' }).filter(
    x => x.exclude === 0,
  )

  console.log(setSongs[0])

  return (
    <SlideUpWrapper>
      <div className='flex flex-wrap items-center justify-center gap-8 pb-12 sm:justify-between'>
        <div className='drop-shadow-2xl'>
          <h1 className='max-w-[700px] bg-gradient-to-br from-primary to-[#E76E50] bg-clip-text pb-2 text-center text-5xl font-bold tracking-tight text-transparent sm:text-left'>
            <HtmlText>{song.song}</HtmlText>
            {song.abbr && (
              <HtmlText className='ml-2 text-xl font-normal'>{`(${song.abbr})`}</HtmlText>
            )}
          </h1>
          <h3 className='text-center font-light sm:ml-2 sm:text-left'>
            Original Artist: <HtmlText>{song.artist}</HtmlText>
          </h3>
        </div>
        <Card className='w-full p-6 sm:w-fit'>
          <div className='flex items-center justify-evenly gap-4 sm:gap-8'>
            <div>
              <div className='flex items-baseline justify-end'>
                <span className='font-bold text-zinc-500'>Debut:</span>
                <Button asChild variant='link'>
                  <Link href={song.debut_permalink} target='_blank'>
                    {song.debut}
                  </Link>
                </Button>
              </div>
              <div className='flex items-baseline justify-end'>
                <span className='whitespace-nowrap font-bold text-zinc-500'>
                  Last Played:
                </span>
                <Button asChild variant='link'>
                  <Link href={song.last_permalink} target='_blank'>
                    {song.last_played}
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <TimesPlayed
                timesPlayed={song.times_played}
                mostPlayedSongCount={mostPlayedSongCount}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-16'>
        <TimelineFrequency setSongs={setSongs} />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <MostPlayedVenues setSongs={setSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <MostPlayedTours setSongs={setSongs} />
          </div>
        </div>
        <ShowTimeline showSongs={setSongs} />
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <SetBreakdown setSongs={setSongs} />
          </div>
          <div className='w-full lg:w-1/2'>
            <SegueBreakdown setSongs={setSongs} />
          </div>
        </div>
      </div>
    </SlideUpWrapper>
  )
}
