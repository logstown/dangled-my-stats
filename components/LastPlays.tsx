import { StatCardHeader } from '@/components/stat-card-header'
import { badgeVariants } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong, Song } from '@/lib/models'
import { getAllSongs } from '@/lib/phish-service'
import { find, reduce, uniqBy } from 'lodash'
import { HandIcon } from 'lucide-react'
import Link from 'next/link'
import { HtmlText } from './html-text'

export async function LastPlays({ setSongs }: { setSongs: SetSong[] }) {
  const { data: allSongs, error } = await getAllSongs()
  if (error) return

  const lastPlayed = reduce(
    setSongs,
    (lastPlayedList, venueSong) => {
      const foundSong = find(allSongs, { slug: venueSong.slug })!
      if (foundSong.last_played === venueSong.showdate) {
        lastPlayedList.push(foundSong)
      }

      return lastPlayedList
    },
    [] as Song[],
  )

  const uniqueLastPlayed = uniqBy(lastPlayed, 'slug')

  return (
    <Card className='h-full'>
      <StatCardHeader Icon={HandIcon}>Last Played</StatCardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {uniqueLastPlayed.map(x => (
            // <Badge key={x.slug}>{x.song}</Badge>
            <Link
              href={`/song/${x.slug}`}
              key={x.slug}
              className={`${badgeVariants({ variant: 'secondary' })} whitespace-nowrap`}
            >
              <HtmlText>{x.song}</HtmlText>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
