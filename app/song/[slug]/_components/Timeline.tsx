'use client'

import { useEffect, useRef } from 'react'
import { DataSet, Timeline } from 'vis-timeline/standalone'
// import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import { SetSong } from '@/lib/models'
import { find, last } from 'lodash'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { ChartNoAxesGantt } from 'lucide-react'

const SongTimeline = ({
  setSongs,
  earliestDebut,
  lastShow,
}: {
  setSongs: SetSong[]
  earliestDebut: string
  lastShow: string
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<Timeline | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!timelineRef.current) initTimeline()
  }, [containerRef])

  const initTimeline = () => {
    if (!containerRef.current) return

    const data = setSongs.map(x => ({
      id: x.uniqueid,
      title: x.venue,
      content: `${x.city}, ${x.state ?? x.country}`,
      start: x.showdate,
    }))

    // const data = [
    //   {
    //     id: setSongs[0].showid,
    //     content: 'Debut',
    //     start: setSongs[0].showdate,
    //   },
    //   {
    //     id: last(setSongs)?.showid,
    //     content: 'Last Played',
    //     start: last(setSongs)?.showdate,
    //   },
    // ]

    var items2 = new DataSet(data)

    timelineRef.current = new Timeline(containerRef.current, items2, {
      cluster: {},
      //   start: earliestDebut,
      //   end: new Date(),
    })

    timelineRef.current.on('select', ({ items }: { items: string[] }) => {
      const setSong = find(setSongs, { uniqueid: items[0] })
      if (setSong) {
        window.open(setSong.permalink, '_blank')
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <ChartNoAxesGantt className='text-neutral-400' />
          Timeline
        </CardTitle>
        <CardDescription className='ml-10'>
          Scroll and click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} />
      </CardContent>
    </Card>
  )
}

export default SongTimeline
