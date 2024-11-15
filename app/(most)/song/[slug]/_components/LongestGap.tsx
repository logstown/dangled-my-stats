import { SetSong } from '@/lib/models'
import { findIndex, maxBy, tail } from 'lodash'
import { Card, CardContent } from '@/components/ui/card'
import { Unlink2Icon } from 'lucide-react'
import { StatCardHeader } from '@/components/stat-card-header'

export function LongestGap({ setSongs }: { setSongs: SetSong[] }) {
  let gapShows: SetSong[] = []
  const gapNextShow = maxBy(tail(setSongs), x => Number(x.gap))

  if (gapNextShow) {
    const idx = findIndex(setSongs, { uniqueid: gapNextShow.uniqueid })
    const gapFirstShow = setSongs[idx - 1]
    gapShows = [gapFirstShow, gapNextShow]
  }

  return (
    <Card>
      <StatCardHeader Icon={Unlink2Icon}>Longest Gap</StatCardHeader>
      <CardContent>
        {setSongs?.length > 1 ? (
          <div className='flex items-baseline justify-center gap-2'>
            <div className='text-center text-4xl font-bold'>{gapShows[1].gap}</div>
            <p className='text-center text-xs text-muted-foreground'>shows</p>
          </div>
        ) : (
          <p className='text-center text-2xl font-bold text-muted-foreground'>
            None
          </p>
        )}
      </CardContent>
    </Card>
  )
}
