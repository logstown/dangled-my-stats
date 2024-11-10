import { StatCardHeader } from '@/components/stat-card-header'
import { badgeVariants } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong, Song } from '@/lib/models'
import { getAllSongs } from '@/lib/phish-service'
import { find, reduce } from 'lodash'
import { ListPlusIcon } from 'lucide-react'
import Link from 'next/link'

export async function VenueDebuts({ venueSongs }: { venueSongs: SetSong[] }) {
  const { data: allSongs } = await getAllSongs()

  const debuts = reduce(
    venueSongs,
    (debutList, venueSong) => {
      const foundSong = find(allSongs, { slug: venueSong.slug })!
      if (foundSong.debut === venueSong.showdate) {
        debutList.push(foundSong)
      }

      return debutList
    },
    [] as Song[],
  )
  return (
    <Card>
      <StatCardHeader Icon={ListPlusIcon}>Debuts</StatCardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {debuts.map(x => (
            // <Badge key={x.slug}>{x.song}</Badge>
            <Link
              href={`/song/${x.slug}`}
              key={x.slug}
              className={`${badgeVariants({})} whitespace-nowrap`}
            >
              {x.song}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
