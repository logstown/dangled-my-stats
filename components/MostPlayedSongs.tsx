'use client'

import { ChevronsUpDownIcon, MusicIcon } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import { countBy, find, map, sortBy } from 'lodash'
import { SetSong } from '@/lib/models'
import { StatCardHeader } from '@/components/stat-card-header'
import { Button } from './ui/button'
import { take } from 'lodash'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function MostPlayedSongs({ setSongs }: { setSongs: SetSong[] }) {
  const [chartData, setChartData] = useState<any>([])
  const [dataChunk, setDataChunk] = useState(1)
  const [isStillMore, setIsStillMore] = useState(true)

  useEffect(() => {
    // const filtered = reject(setSongs, { tourid: '61' })
    const songCounts = countBy(setSongs, 'slug')
    let songCountsObj = map(songCounts, (count, slug) => {
      const song = find(setSongs, { slug })!

      return {
        id: slug,
        name: song.song,
        count,
      }
    })
    songCountsObj = sortBy(songCountsObj, 'count').reverse()
    const displayedSongLength = dataChunk * 15
    setChartData(take(songCountsObj, displayedSongLength))
    setIsStillMore(displayedSongLength < songCountsObj.length)
  }, [setSongs, dataChunk])

  return (
    <Card>
      <StatCardHeader Icon={MusicIcon}>Top 15 Songs</StatCardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className={`w-full`}
          style={{ height: `${dataChunk * 500}px` }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              left: -20,
            }}
          >
            <XAxis type='number' dataKey='count' hide />
            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={200}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='count' fill='var(--color-count)' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex justify-center'>
        {isStillMore && (
          <Button
            onClick={() => setDataChunk(x => x + 1)}
            variant='secondary'
            size='sm'
          >
            <ChevronsUpDownIcon /> More
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
