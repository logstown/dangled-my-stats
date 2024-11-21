'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
// import { RandomThing } from '@/components/RandomThing'
import { Song } from '@/lib/models'
import { groupBy, map, replace, sortBy, split, words } from 'lodash'
import Link from 'next/link'
import { useMemo } from 'react'
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs'
import { maxBy } from 'lodash'

function isLetter(character: string) {
  return character.toLowerCase() != character.toUpperCase()
}

function getLetter(song: Song) {
  const songWords = words(song.song)
  const firstChar = songWords[0] === 'The' ? songWords[1][0] : song.song[0]

  return isLetter(firstChar) ? firstChar.toUpperCase() : '#'
}

function getDebutYear(song: Song) {
  return split(song.debut, '-')[0]
}

function getLastPlayedYear(song: Song) {
  return split(song.last_played, '-')[0]
}

export function BrowseSongs({ songs }: { songs: Song[] }) {
  const [originalsOnly, setOriginalsOnly] = useQueryState(
    'orignalsOnly',
    parseAsBoolean.withDefault(false),
  )
  const [selectedSortBy, setSelectedSortBy] = useQueryState('selectedSortBy', {
    defaultValue: 'letter',
  })
  const [timesPlayed, setTimesPlayed] = useQueryState(
    'timesPlayed',
    parseAsInteger.withDefault(10),
  )

  const songsByCategory = useMemo(() => {
    const grouped = groupBy(songs, (x: Song) => {
      switch (selectedSortBy) {
        case 'letter':
          return getLetter(x)
        case 'debut':
          return getDebutYear(x)
        case 'last_played':
          return getLastPlayedYear(x)
      }
    })

    return map(grouped, (songs: Song[], category: string) => {
      songs = sortBy(songs, (x: Song) => {
        const songWords = words(x.song)
        return songWords[0] === 'The' ? replace(x.song, 'The ', '') : x.song
      })
        .filter(song => !originalsOnly || song.artist === 'Phish')
        .filter(song => Number(song.times_played) >= timesPlayed)

      return { category, songs }
    }).filter(({ songs }) => songs.length)
  }, [songs, selectedSortBy, originalsOnly, timesPlayed])

  const maxTimesPlayed = useMemo(() => {
    const thing = maxBy(songs, x => Number(x.times_played))
    return Number(thing?.times_played) ?? 0
  }, [songs])

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-8'>
        <h1 className='pl-6 text-4xl font-medium tracking-tight'>Songs</h1>
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
                    <SelectItem value='debut'>Debut Date</SelectItem>
                    <SelectItem value='last_played'>Last Played Date</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='mb-3 flex items-center space-x-2'>
              <Checkbox
                id='originals-only'
                checked={originalsOnly}
                onCheckedChange={x =>
                  setOriginalsOnly(x === 'indeterminate' ? false : x)
                }
              />
              <label
                htmlFor='originals-only'
                className='leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Originals Only
              </label>
            </div>
            <div className='mb-3 flex flex-col gap-2'>
              <label htmlFor=''>
                Times Played: <strong>{timesPlayed}</strong>
              </label>
              <Slider
                className='w-[400px]'
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
      <Card className='song-grid mt-10 p-8'>
        {songsByCategory.map(({ category, songs }) => (
          <div key={category} className='mb-6'>
            <h2 className='pb-2 text-2xl font-semibold text-primary'>{category}</h2>
            <ul>
              {songs.map((song: Song) => (
                <li key={song.slug} className='truncate'>
                  <Link className='link-hover link' href={`/song/${song.slug}`}>
                    {song.song}
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
