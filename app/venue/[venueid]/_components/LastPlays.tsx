import { StatCardHeader } from '@/components/stat-card-header'
import { badgeVariants } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong, Song } from '@/lib/models'
import { getAllSongs } from '@/lib/phish-service'
import { find, reduce } from 'lodash'
import { HandIcon } from 'lucide-react'
import Link from 'next/link'

export async function VenueLastPlays({ venueSongs }: { venueSongs: SetSong[] }) {
  const { data: allSongs } = await getAllSongs()

  const lastPlayed = reduce(
    venueSongs,
    (lastPlayedList, venueSong) => {
      const foundSong = find(allSongs, { slug: venueSong.slug })!
      if (foundSong.last_played === venueSong.showdate) {
        lastPlayedList.push(foundSong)
      }

      return lastPlayedList
    },
    [] as Song[],
  )
  return (
    <Card>
      <StatCardHeader Icon={HandIcon}>Last Played</StatCardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {lastPlayed.map(x => (
            // <Badge key={x.slug}>{x.song}</Badge>
            <Link
              href={`/song/${x.slug}`}
              key={x.slug}
              className={`${badgeVariants({ variant: 'secondary' })} whitespace-nowrap`}
            >
              {x.song}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
