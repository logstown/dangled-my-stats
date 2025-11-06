'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { HtmlText } from '@/components/html-text'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { VenueBrowse } from '@/lib/models'
import { maxBy } from 'lodash'
import { groupBy, map, replace, sortBy, words } from 'lodash'
import Link from 'next/link'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useMemo } from 'react'

function isLetter(character: string) {
  return character.toLowerCase() != character.toUpperCase()
}

function getLetter({ browse_name }: VenueBrowse) {
  const venueWords = words(browse_name)
  const firstChar = venueWords[0] === 'The' ? venueWords[1][0] : browse_name[0]

  return isLetter(firstChar) ? firstChar.toUpperCase() : '#'
}

function getState({ state, country }: VenueBrowse) {
  return state || country
}

export function BrowseVenues({ venues }: { venues: VenueBrowse[] }) {
  const [selectedSortBy, setSelectedSortBy] = useQueryState('selectedSortBy', {
    defaultValue: 'letter',
  })
  const [timesPlayed, setTimesPlayed] = useQueryState(
    'timesPlayed',
    parseAsInteger.withDefault(2),
  )

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
      venues = sortBy(venues, x => {
        switch (selectedSortBy) {
          case 'letter':
            const venueWords = words(x.browse_name)
            return venueWords[0] === 'The'
              ? replace(x.browse_name, 'The ', '')
              : x.browse_name
          case 'state':
            return `${x.city} ${x.browse_name}`
        }
      }).filter(x => Number(x.timesPlayed) >= timesPlayed)

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
  }, [venues, selectedSortBy, timesPlayed])

  const maxTimesPlayed = useMemo(() => {
    const thing = maxBy(venues, x => Number(x.timesPlayed))
    return Number(thing?.timesPlayed) ?? 0
  }, [venues])

  return (
    <div>
      <div className='flex flex-wrap items-center justify-center gap-8 sm:justify-between'>
        <h1 className='text-4xl font-medium tracking-tight sm:pl-6'>Venues</h1>
        <Card className='p-6'>
          <div className='flex flex-wrap items-end gap-16'>
            <div className='flex flex-col gap-2'>
              <Label>Sort By</Label>
              <Select value={selectedSortBy} onValueChange={setSelectedSortBy}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='letter'>Letter</SelectItem>
                    <SelectItem value='state'>State/Country</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='mb-3 flex w-full flex-col gap-2 sm:w-fit'>
              <label htmlFor=''>
                Times Played: <strong>{timesPlayed}</strong>
              </label>
              <Slider
                className='w-full sm:w-[400px]'
                value={[timesPlayed]}
                onValueChange={x => setTimesPlayed(x[0])}
                max={maxTimesPlayed}
                min={2}
                step={1}
              />
            </div>
          </div>
        </Card>
      </div>
      <Card className='venue-grid mt-10 p-8'>
        {venuesByCategory.map(({ category, venues }) => (
          <div key={category} className='mb-6'>
            <h2 className='pb-2 text-2xl font-semibold text-primary'>{category}</h2>
            <ul>
              {venues.map((venue: VenueBrowse) => (
                <li key={venue.venueid} className='truncate'>
                  <Link className='link-hover link' href={`/venue/${venue.venueid}`}>
                    <HtmlText>
                      {selectedSortBy === 'letter'
                        ? `${venue.browse_name}, ${venue.city}, ${venue.state || venue.country}`
                        : `${venue.city}: ${venue.browse_name}`}
                    </HtmlText>
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
