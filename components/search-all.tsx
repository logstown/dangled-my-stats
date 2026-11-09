'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { HtmlText } from './html-text'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { useMemo, useState } from 'react'
import { Show, Song, VenueBrowse } from '@/lib/models'
import { useRouter } from 'next/navigation'
import { decodeHtml } from '@/lib/decode-html'

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
  const searchQuery = searchTerm.trim().toLowerCase()
  const router = useRouter()

  const filteredSongs = useMemo(
    () =>
      songs.filter(song =>
        decodeHtml(song.song).toLowerCase().includes(searchQuery),
      ),
    [songs, searchQuery],
  )

  const filteredVenues = useMemo(
    () =>
      venues.filter(venue =>
        decodeHtml(venue.browse_name).toLowerCase().includes(searchQuery),
      ),
    [venues, searchQuery],
  )

  const filteredTours = useMemo(
    () =>
      tours.filter(tour =>
        decodeHtml(tour.tour_name ?? '')
          .toLowerCase()
          .includes(searchQuery),
      ),
    [tours, searchQuery],
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
      {/* Results are filtered above; cmdk must not filter them a second time. */}
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder='Search songs, venues, tours...'
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          <CommandEmpty>
            {searchQuery.length < 2
              ? 'Type at least 2 characters to search.'
              : 'No results found.'}
          </CommandEmpty>

          {searchQuery.length > 1 && (
            <>
              {filteredSongs.length > 0 && (
                <CommandGroup heading='Songs'>
                  {filteredSongs.map(song => (
                    <CommandItem
                      key={song.slug}
                      value={`song-${song.slug}`}
                      onSelect={() => goToRoute(`/song/${song.slug}`)}
                    >
                      <HtmlText>{song.song}</HtmlText>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {filteredVenues.length > 0 && (
                <CommandGroup heading='Venues'>
                  {filteredVenues.map(venue => (
                    <CommandItem
                      key={venue.venueid}
                      value={`venue-${venue.venueid}`}
                      onSelect={() => goToRoute(`/venue/${venue.venueid}`)}
                    >
                      <HtmlText>{venue.browse_name}</HtmlText>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {filteredTours.length > 0 && (
                <CommandGroup heading='Tours'>
                  {filteredTours.map(tour => (
                    <CommandItem
                      key={tour.tourid}
                      value={`tour-${tour.tourid}`}
                      onSelect={() => goToRoute(`/tour/${tour.tourid}`)}
                    >
                      <HtmlText>{tour.tour_name}</HtmlText>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
