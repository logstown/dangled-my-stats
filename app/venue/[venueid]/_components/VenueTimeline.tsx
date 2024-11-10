'use client'

import { useEffect, useRef } from 'react'
import { DataSet, Timeline } from 'vis-timeline/standalone'
// import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import { SetSong } from '@/lib/models'
import { find } from 'lodash'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartNoAxesGantt } from 'lucide-react'

const VenueTimeline = ({ venueShowsSongs }: { venueShowsSongs: SetSong[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<Timeline | null>(null)

  useEffect(() => {
    if (!timelineRef.current) initTimeline()
  }, [containerRef])

  const initTimeline = () => {
    if (!containerRef.current) return

    console.log(venueShowsSongs)

    const data = venueShowsSongs.map(x => ({
      id: x.showid,
      content: x.showdate,
      start: x.showdate,
    }))

    var items2 = new DataSet(data)

    timelineRef.current = new Timeline(containerRef.current, items2, {
      cluster: {},
      //   start: earliestDebut,
      //   end: new Date(),
    })

    timelineRef.current.on('select', ({ items }: { items: string[] }) => {
      const show = find(venueShowsSongs, { showid: items[0] })
      if (show) {
        window.open(show.permalink, '_blank')
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

export default VenueTimeline
