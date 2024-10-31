'use client'

import { SetSong } from '@/lib/models'
import { countBy, find, map, reject, sortBy, takeRight } from 'lodash'
import { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BusIcon } from 'lucide-react'

export function MostPlayedTour({ setSongs }: { setSongs: SetSong[] }) {
  const mostPlayedTours = useMemo(() => {
    const filtered = reject(setSongs, { tourid: '61' })
    const tourCounts = countBy(filtered, 'tourid')
    let tourCountsObj = map(tourCounts, (count, tourid) => {
      const tourShow = find(setSongs, { tourid })!

      return {
        id: tourid,
        name: tourShow.tourname,
        when: tourShow.tourwhen,
        count,
      }
    })
    tourCountsObj = sortBy(tourCountsObj, 'count')
    return takeRight(tourCountsObj, 5)
  }, [setSongs])

  return (
    <Card className='min-w-48'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Most Played Tour</CardTitle>
        <BusIcon size={15} />
      </CardHeader>
      <CardContent>
        {mostPlayedTours.length ? (
          <>
            <div className='mt-2 text-center text-2xl font-bold'>
              {mostPlayedTours[0].name}
            </div>
            <p className='text-center text-xs text-muted-foreground'>
              {mostPlayedTours[0].when}
            </p>
          </>
        ) : (
          <p className='text-center text-2xl font-bold text-muted-foreground'>
            None
          </p>
        )}
      </CardContent>
    </Card>
  )
}
