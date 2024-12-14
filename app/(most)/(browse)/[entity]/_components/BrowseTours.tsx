'use client'

import { Card } from '@/components/ui/card'
import { Show } from '@/lib/models'
import { groupBy, map, mapValues, sortBy, uniqBy } from 'lodash'
import Link from 'next/link'
import { useMemo } from 'react'

export function BrowseTours({ shows }: { shows: Show[] }) {
  const toursByCategory = useMemo(() => {
    let grouped = groupBy(shows, 'showyear')
    grouped = mapValues(grouped, shows =>
      uniqBy(shows, 'tourid').filter(x => x.tourid !== 61),
    )

    const toursByCat = map(grouped, (tours: Show[], year: string) => {
      tours = sortBy(tours, x => Number(x.showmonth))

      return { year, tours }
    })

    return sortBy(toursByCat, 'year')
  }, [shows])

  return (
    <div>
      <div className='flex items-baseline justify-between'>
        <h1 className='pl-6 text-4xl font-medium tracking-tight'>Tours</h1>
      </div>
      <Card className='song-grid mt-10 p-8'>
        {toursByCategory.map(({ year, tours }) => (
          <div key={year} className='mb-6'>
            <h2 className='pb-2 text-2xl font-semibold text-primary'>{year}</h2>
            <ul>
              {tours.map((tour: Show) => (
                <li key={tour.tourid} className='truncate'>
                  <Link className='link-hover link' href={`/tour/${tour.tourid}`}>
                    {tour.tour_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  )
}
