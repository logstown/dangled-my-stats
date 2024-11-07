'use client'

import { ShuffleIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import { filter, uniqBy } from 'lodash'
import { getAllShows, getAllSongs, getAllVenues } from '@/lib/phish-service'

export function RandomThing() {
  const router = useRouter()
  const pathname = usePathname()
  const entities = useRef<any[]>([])
  const [pathAt, setPathAt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getEntities = (pathAt: string): Promise<any> => {
    switch (pathAt) {
      case 'song':
        return getAllSongs().then(({ data }) =>
          filter(data, x => Number(x.times_played) > 1),
        )
      case 'venue':
        return getAllVenues().then(({ data }) => data)
      case 'tour':
        return getAllShows().then(({ data }) =>
          uniqBy(data, 'tourid').filter(x => x.tourid !== '61'),
        )
      default:
        console.warn('wrong path')
        return Promise.resolve()
    }
  }

  useEffect(() => {
    if (!pathname) {
      return
    }

    const arr = pathname.split('/')

    const newPathAt =
      arr[1] === 'browse' ? arr[2].substring(0, arr[2].length - 1) : arr[1]

    if (newPathAt === pathAt) return

    setIsLoading(true)
    getEntities(newPathAt).then(data => {
      entities.current = data
      setIsLoading(false)
    })

    setPathAt(newPathAt)
  }, [pathname])

  const goToRandom = () => {
    const thing = getRandomFromArray(entities.current)

    switch (pathAt) {
      case 'song':
        router.push(`/song/${thing.slug}`)
        break
      case 'venue':
        router.push(`/venue/${thing.venueid}`)
        break
      case 'tour':
        router.push(`/tour/${thing.tourid}`)
    }
  }

  return (
    <Button
      disabled={isLoading}
      variant='ghost'
      className='capitalize'
      onClick={goToRandom}
    >
      {pathAt}
      <ShuffleIcon />
    </Button>
  )
}

function getRandomFromArray<T>(arr: Array<T>): T {
  return arr[(arr.length * Math.random()) | 0]
}
