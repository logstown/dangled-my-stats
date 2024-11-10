'use client'

import { MusicIcon } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useMemo } from 'react'
import { countBy, find, map, sortBy, takeRight } from 'lodash'
import { SetSong } from '@/lib/models'
import { StatCardHeader } from '@/components/stat-card-header'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function MostPlayedSongs({ venueSongs }: { venueSongs: SetSong[] }) {
  const data = useMemo(() => {
    // const filtered = reject(venueSongs, { tourid: '61' })
    const songCounts = countBy(venueSongs, 'slug')
    let songCountsObj = map(songCounts, (count, slug) => {
      const song = find(venueSongs, { slug })!

      return {
        id: slug,
        name: song.song,
        count,
      }
    })
    songCountsObj = sortBy(songCountsObj, 'count')
    return takeRight(songCountsObj, 15).reverse()
  }, [venueSongs])

  return (
    <Card>
      <StatCardHeader Icon={MusicIcon}>Top 15 Songs</StatCardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{ height: '500px', width: '100%' }}
        >
          <BarChart
            accessibilityLayer
            data={data}
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
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
