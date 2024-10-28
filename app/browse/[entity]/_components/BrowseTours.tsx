'use client'

import { Show } from '@/lib/models'
import { groupBy, map, mapValues, sortBy, uniqBy } from 'lodash'
import { SearchIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export function BrowseTours({ shows }: { shows: Show[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const toursByCategory = useMemo(() => {
    let grouped = groupBy(shows, 'showyear')
    grouped = mapValues(grouped, shows =>
      uniqBy(shows, 'tourid').filter(x => x.tourid !== '61'),
    )

    const toursByCat = map(grouped, (tours: Show[], year: string) => {
      tours = sortBy(tours, x => Number(x.showmonth)).filter(tour =>
        tour.tour_name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      return { year, tours }
    }).filter(({ tours }) => tours.length)

    return sortBy(toursByCat, 'year')
  }, [shows, searchTerm])

  return (
    <div>
      <div className='mb-16 flex items-baseline justify-between'>
        <h1 className='text-5xl font-bold'>Browse Tours</h1>
        <div className='flex items-end gap-8'>
          <label className='input input-bordered input-primary flex items-center gap-2'>
            <input
              type='text'
              className='grow'
              placeholder='Search'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <XIcon size={20} onClick={() => setSearchTerm('')} />
            ) : (
              <SearchIcon size={20} />
            )}
          </label>
        </div>
      </div>
      <div className='song-grid'>
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
      </div>
    </div>
  )
}
