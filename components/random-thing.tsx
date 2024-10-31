'use client'

import { Song } from '@/lib/models'
import { ShuffleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function RandomThing({ allSongs }: { allSongs: Song[] }) {
  const router = useRouter()

  const goToRandom = () => {
    // const letter = getRandomFromArray(songsByLetter)
    // const song = getRandomFromArray(letter.songs)

    // let songs = flatMap(songsByLetter, 'songs') as Song[]
    // if (originalsOnly) {
    // const phishSongs = filter(allSongs, { artist: 'Phish' })
    // }

    const song = getRandomFromArray(allSongs)

    router.push(`/song/${song.slug}`)
  }

  return (
    <Button variant='outline' onClick={goToRandom}>
      <ShuffleIcon />
      Random Song
    </Button>
  )
}

function getRandomFromArray<T>(arr: Array<T>): T {
  return arr[(arr.length * Math.random()) | 0]
}
