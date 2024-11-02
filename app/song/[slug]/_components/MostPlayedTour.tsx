'use client'

import { SetSong } from '@/lib/models'
import { countBy, find, map, reject, sortBy, takeRight } from 'lodash'
import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BusIcon } from 'lucide-react'
import { StatCardHeader } from '@/components/stat-card-header'

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
    <Card>
      <StatCardHeader Icon={BusIcon}>Most Played Tour</StatCardHeader>
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
