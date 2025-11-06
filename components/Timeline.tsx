'use client'

import { useEffect, useRef } from 'react'
import { Timeline } from 'vis-timeline/standalone'
import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import { SetSong } from '@/lib/models'
import { find } from 'lodash'
import { decodeHtml } from '@/lib/decode-html'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartNoAxesGantt } from 'lucide-react'

const ShowTimeline = ({
  showSongs,
  shouldDisplayDate,
}: {
  showSongs: SetSong[]
  shouldDisplayDate?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<Timeline | null>(null)

  const initTimeline = () => {
    if (!containerRef.current) return

    const data = showSongs.map(x => ({
      id: x.uniqueid,
      content: shouldDisplayDate
        ? x.showdate
        : `${decodeHtml(x.city)}, ${decodeHtml(x.state || x.country)}`,
      start: x.showdate,
    }))

    const items2 = new DataSet(data)

    timelineRef.current = new Timeline(containerRef.current, items2, {
      cluster: {},
    })

    timelineRef.current.on('select', ({ items }: { items: number[] }) => {
      const setSong = find(showSongs, { uniqueid: items[0] })
      if (setSong) {
        window.open(setSong.permalink, '_blank')
      }
    })
  }

  useEffect(() => {
    if (!timelineRef.current) initTimeline()
  }, [containerRef, initTimeline])

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

export default ShowTimeline
