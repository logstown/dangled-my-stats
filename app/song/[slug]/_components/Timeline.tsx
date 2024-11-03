'use client'

import { useEffect, useRef } from 'react'
import { Timeline as Vis } from 'vis-timeline/standalone'
import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import { SetSong } from '@/lib/models'
import { last } from 'lodash'

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
  const timelineRef = useRef<Vis | null>(null)

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

    timelineRef.current = new Vis(containerRef.current, items2, {
      cluster: {},
      //   start: earliestDebut,
      //   end: new Date(),
    })
  }

  return <div ref={containerRef} />
}

export default SongTimeline
