import { filter, find, maxBy, minBy } from 'lodash'
import { notFound } from 'next/navigation'
import { getAllSongs, getSongFromSets } from '@/lib/phish-service'
import { RandomThing } from '@/components/random-thing'
import { TimelineTwoDot } from './_components/TimelineTwoDot'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { Song } from '@/lib/models'
import { SongStats } from './_components/SongStats'
import { TimesPlayed } from './_components/TimesPlayed'
import SongTimeline from './_components/Timeline'
import { TimelineFrequency } from './_components/TimelineFrequency'

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

  const sections = [
    {
      name: 'Timeline',
      link: 'timeline',
      component: (
        <div className='flex flex-col gap-16'>
          <TimelineFrequency setSongs={setSongs} />
          <SongTimeline
            setSongs={setSongs}
            earliestDebut={earliestDebut}
            lastShow={latestLastPlayed}
          />
        </div>
      ),
    },
    {
      name: 'Stats',
      link: 'stats',
      component: <SongStats setSongs={setSongs} />,
    },
    {
      name: 'Blurbs',
      link: 'blurbs',
    },
  ]

  return (
    <div>
      {/* <div className='flex flex-col gap-4 border-b-2 border-primary/10 px-16 pb-0 pt-10'> */}
      <div className='flex flex-wrap items-center justify-between gap-8 pb-12'>
        <div>
          <h1 className='mb-2 text-5xl font-bold tracking-tight'>
            {song.song}
            {song.abbr && (
              <span className='ml-2 text-xl font-normal'>({song.abbr})</span>
            )}
          </h1>
          <h3 className='ml-2 font-light'>Original Artist: {song.artist}</h3>
        </div>
        <div className='flex items-center gap-8'>
          <TimesPlayed
            timesPlayed={Number(song.times_played)}
            mostPlayedSongCount={Number(mostPlayedSongCount)}
          />
          <RandomThing allSongs={allSongs} />
        </div>
      </div>
      {/* <NavigationMenu className='pb-2'>
          <NavigationMenuList className='space-x-4'>
            {sections.map(x => (
              <NavigationMenuItem key={x.link}>
                <Link href={`#${x.link}`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() +
                      ' text-xl font-bold text-primary/85'
                    }
                  >
                    {x.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu> */}
      {/* </div> */}
      {/* <div className='flex flex-col gap-24'>
        {sections.map(x => (
          <div key={x.link}>
            <h1
              id={x.link}
              className='mb-8 text-2xl font-semibold leading-none tracking-tight'
            >
              {x.name}
            </h1>
            {x.component}
          </div>
        ))}
      </div> */}
      <div className='flex flex-col gap-16'>
        <TimelineFrequency setSongs={setSongs} />
        <SongTimeline
          setSongs={setSongs}
          earliestDebut={earliestDebut}
          lastShow={latestLastPlayed}
        />
        <SongStats setSongs={setSongs} />,
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
