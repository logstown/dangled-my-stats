'use client'

import { ShuffleIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import { filter, uniqBy } from 'lodash'
import { PhishResponse } from '@/lib/phish-service'
import { groupBy } from 'lodash'
import { map } from 'lodash'
import type { Song, Show } from '@/lib/models'

export function RandomThing({ onClick }: { onClick?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()
  const entities = useRef<any[]>([])
  const [pathAt, setPathAt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getEntities = async (pathAt: string): Promise<any> => {
    switch (pathAt) {
      case 'song':
        const songsResp = await fetch('/api/songs')
        const songsData: PhishResponse<Song> = await songsResp.json()
        if (!songsData) return []
        return filter(songsData.data, x => x.times_played > 1)
      case 'venue':
        const showsForVenueResp = await fetch('/api/shows')
        const showsForVenueData: PhishResponse<Show> = await showsForVenueResp.json()
        const allStatsShows = filter(showsForVenueData.data, {
          exclude_from_stats: 0,
        })
        const byVenueId = groupBy(allStatsShows, 'venueid')
        return map(byVenueId, x => x[0])
      case 'tour':
        const showsForTourResp = await fetch('/api/shows')
        const showsForTourData: PhishResponse<Show> = await showsForTourResp.json()
        return uniqBy(showsForTourData.data, 'tourid').filter(x => x.tourid !== 61)
      default:
        return Promise.resolve([])
    }
  }

  useEffect(() => {
    if (!pathname) {
      return
    }

    const arr = pathname.split('/')
    const newPathAt = arr[2] ? arr[1] : arr[1].substring(0, arr[1].length - 1)

    if (newPathAt === pathAt) return

    setIsLoading(true)
    getEntities(newPathAt)
      .then(data => (entities.current = data))
      .finally(() => {
        setIsLoading(false)
      })

    setPathAt(newPathAt)
  }, [pathname, pathAt])

  const goToRandom = () => {
    if (onClick) {
      onClick()
    }

    if (!entities.current) {
      return
    }

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
        break
    }
  }

  return pathname === '/about' ? null : (
    <Button
      disabled={isLoading}
      variant='ghost'
      className='text-base capitalize'
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
