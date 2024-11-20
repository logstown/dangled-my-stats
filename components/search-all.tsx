'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import { useMemo, useState } from 'react'
import { Show, Song, VenueBrowse } from '@/lib/models'
import { useRouter } from 'next/navigation'

export function SearchAll({
  songs,
  venues,
  tours,
  isNavbar,
}: {
  songs: Song[]
  venues: VenueBrowse[]
  tours: Show[]
  isNavbar: boolean
}) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredSongs = useMemo(
    () =>
      songs.filter(song =>
        song.song.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [songs, searchTerm],
  )

  const filteredVenues = useMemo(
    () =>
      venues.filter(venue =>
        venue.browse_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [venues, searchTerm],
  )

  const filteredTours = useMemo(
    () =>
      tours.filter(tour =>
        tour.tour_name?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [tours, searchTerm],
  )

  const goToRoute = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <>
      {isNavbar ? (
        <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
          <SearchIcon className='h-4 w-4' />
        </Button>
      ) : (
        <Button size='icon' onClick={() => setOpen(true)}>
          <SearchIcon className='h-5 w-5' />
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Search songs, venues, tours...'
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {searchTerm.length > 1 && (
            <>
              <CommandGroup heading='Songs'>
                {filteredSongs.map(song => (
                  <CommandItem
                    key={song.slug}
                    onSelect={() => goToRoute(`/song/${song.slug}`)}
                  >
                    {song.song}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Venues'>
                {filteredVenues.map(venue => (
                  <CommandItem
                    key={venue.venueid}
                    onSelect={() => goToRoute(`/venue/${venue.venueid}`)}
                  >
                    {venue.browse_name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Tours'>
                {filteredTours.map(tour => (
                  <CommandItem
                    key={tour.tourid}
                    onSelect={() => goToRoute(`/tour/${tour.tourid}`)}
                  >
                    {tour.tour_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
