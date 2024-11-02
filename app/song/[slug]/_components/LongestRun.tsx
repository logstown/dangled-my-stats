import { SetSong } from '@/lib/models'
import { cloneDeep } from 'lodash'
import { Card, CardContent } from '@/components/ui/card'
import { Link2Icon } from 'lucide-react'
import { StatCardHeader } from '@/components/stat-card-header'

export function LongestRun({ setSongs }: { setSongs: SetSong[] }) {
  const { longestRun } = setSongs.reduce(
    (
      { longestRun, currentRun }: { longestRun: SetSong[]; currentRun: SetSong[] },
      setSong,
      i,
    ) => {
      if (setSong.gap === '1') {
        currentRun.push(setSong)
      } else if (setSongs[i - 1]?.gap === '1') {
        if (currentRun.length > longestRun.length) {
          longestRun = cloneDeep(currentRun)
        }

        currentRun = []
      } else if (setSongs[i + 1]?.gap === '1') {
        currentRun.push(setSong)
      }

      return { longestRun, currentRun }
    },
    { longestRun: [], currentRun: [] },
  )

  return (
    <Card>
      <StatCardHeader Icon={Link2Icon}>Longest Run</StatCardHeader>
      <CardContent>
        {setSongs?.length > 1 ? (
          <div className='flex items-baseline justify-center gap-2'>
            <div className='text-center text-4xl font-bold'>{longestRun.length}</div>
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
