'use client'

import { VenueBrowse } from '@/lib/models'
import { groupBy, join, map, replace, sortBy, split, uniqBy, words } from 'lodash'
import { SearchIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

function isLetter(character: string) {
  return character.toLowerCase() != character.toUpperCase()
}

function getLetter(venue: VenueBrowse) {
  const venueWords = words(venue.browse_name)
  const firstChar = venueWords[0] === 'The' ? venueWords[1][0] : venue.browse_name[0]

  return isLetter(firstChar) ? firstChar.toUpperCase() : '#'
}

function getState(venue: VenueBrowse) {
  return venue.state || venue.country
}

export function BrowseVenues({ venues }: { venues: VenueBrowse[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSortBy, setSelectedSortBy] = useState('letter')

  const venuesByCategory = useMemo(() => {
    const grouped = groupBy(venues, (x: VenueBrowse) => {
      switch (selectedSortBy) {
        case 'letter':
          return getLetter(x)
        case 'state':
          return getState(x)
      }
    })

    const venuesByCat = map(grouped, (venues: VenueBrowse[], category: string) => {
      venues = sortBy(venues, (x: VenueBrowse) => {
        switch (selectedSortBy) {
          case 'letter':
            const venueWords = words(x.browse_name)
            return venueWords[0] === 'The'
              ? replace(x.browse_name, 'The ', '')
              : x.browse_name
          case 'state':
            return `${x.city} ${x.browse_name}`
        }
      }).filter(venue =>
        join([venue.browse_name, venue.city, venue.state, venue.country], ' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )

      return { category, venues }
    }).filter(({ venues }) => venues.length)

    return sortBy(venuesByCat, ({ category, venues }) => {
      switch (selectedSortBy) {
        case 'letter':
          return category
        case 'state':
          return venues[0].country === 'USA' ? `#${category}` : category
      }
    })
  }, [venues, selectedSortBy, searchTerm])

  return (
    <div>
      <div className='mb-10 flex items-baseline justify-between'>
        <h1 className='text-5xl font-bold'>Browse Venues</h1>
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
          <label className='form-control max-w-xs'>
            <div className='label'>
              <span className='label-text'>Sort By</span>
            </div>
            <select
              value={selectedSortBy}
              onChange={e => setSelectedSortBy(e.target.value)}
              className='select select-bordered select-primary'
            >
              <option value='letter'>Letter</option>
              <option value='state'>State/Country</option>
            </select>
          </label>
        </div>
      </div>
      <div className='venue-grid'>
        {venuesByCategory.map(({ category, venues }) => (
          <div key={category} className='mb-6'>
            <h2 className='pb-2 text-2xl font-semibold text-primary'>{category}</h2>
            <ul>
              {venues.map((venue: VenueBrowse) => (
                <li key={venue.venueid} className='truncate'>
                  <Link className='link-hover link' href={`/venue/${venue.venueid}`}>
                    {selectedSortBy === 'letter'
                      ? `${venue.browse_name}, ${venue.city}, ${venue.state || venue.country}`
                      : `${venue.city}: ${venue.browse_name}`}
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
