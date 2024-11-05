'use client'

import { Song } from '@/lib/models'
import { ShuffleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useMemo } from 'react'
import { filter } from 'lodash'

export function RandomThing({ allSongs }: { allSongs: Song[] }) {
  const router = useRouter()

  const moreThanOnceSongs = useMemo(() => {
    return filter(allSongs, x => Number(x.times_played) > 1)
  }, [allSongs])

  const goToRandom = () => {
    const song = getRandomFromArray(moreThanOnceSongs)

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
