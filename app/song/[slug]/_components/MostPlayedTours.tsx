'use client'

import { BusIcon } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useMemo } from 'react'
import { countBy, find, map, reject, sortBy, takeRight } from 'lodash'
import { SetSong } from '@/lib/models'
import { StatCardHeader } from '@/components/stat-card-header'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function MostPlayedTours({ setSongs }: { setSongs: SetSong[] }) {
  const data = useMemo(() => {
    const filtered = reject(setSongs, { tourid: '61' })
    const tourCounts = countBy(filtered, 'tourid')
    let tourCountsObj = map(tourCounts, (count, tourid) => {
      const tourShow = find(setSongs, { tourid })!

      return {
        id: tourid,
        name: tourShow.tourname,
        when: tourShow.tourwhen,
        count,
      }
    })
    tourCountsObj = sortBy(tourCountsObj, 'count')
    return takeRight(tourCountsObj, 5).reverse()
  }, [setSongs])

  return (
    <Card>
      <StatCardHeader Icon={BusIcon}>Most Played Tours</StatCardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              width={250}
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
