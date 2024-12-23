'use client'

import { TicketIcon } from 'lucide-react'
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
import { useRouter } from 'next/navigation'
import { CategoricalChartState } from 'recharts/types/chart/types'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function MostPlayedVenues({ setSongs }: { setSongs: SetSong[] }) {
  const router = useRouter()
  const data = useMemo(() => {
    const venueCounts = countBy(setSongs, 'venueid')
    let venueCountsObj = map(venueCounts, (count, venueid) => {
      const { venue, city, state, country } = find(setSongs, {
        venueid: Number(venueid),
      })!

      return {
        count,
        venue,
        city,
        state,
        country,
        venueid,
      }
    })
    venueCountsObj = sortBy(venueCountsObj, 'count')
    return takeRight(venueCountsObj, 5).reverse()

    //   const venuesWithoutMSG = reject(venueCountsObj, { venueid: '157' })
    //   const mostPopVenueId = maxBy(venueCountsObj, 'count')
    //   const venueSet = find(setSongs, { venueid: mostPopVenueId?.venueid })
  }, [setSongs])

  const venueClicked = ({ index }: { index: number }) => {
    router.push(`/venue/${data[index].venueid}`)
  }

  const chartClicked = ({ activeTooltipIndex }: CategoricalChartState) => {
    if (activeTooltipIndex || activeTooltipIndex === 0) {
      router.push(`/venue/${data[activeTooltipIndex].venueid}`)
    }
  }

  return (
    <Card>
      <StatCardHeader Icon={TicketIcon}>Most Played Venues</StatCardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            onClick={chartClicked}
            accessibilityLayer
            data={data}
            layout='vertical'
            margin={{
              left: -20,
            }}
          >
            <XAxis type='number' dataKey='count' hide />
            <YAxis
              className='cursor-pointer'
              onClick={venueClicked}
              dataKey='venue'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={200}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
            <Bar
              label={{ fill: 'white' }}
              className='cursor-pointer'
              dataKey='count'
              fill='var(--color-count)'
              radius={5}
            />
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
