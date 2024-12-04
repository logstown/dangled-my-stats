'use client'

import { BusIcon } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
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
import { useRouter } from 'next/navigation'
import { CategoricalChartState } from 'recharts/types/chart/types'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function MostPlayedTours({ setSongs }: { setSongs: SetSong[] }) {
  const router = useRouter()

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

  const tourClicked = ({ index }: { index: number }) => {
    router.push(`/tour/${data[index].id}`)
  }

  const chartClicked = ({ activeTooltipIndex }: CategoricalChartState) => {
    console.log(activeTooltipIndex)
    if (activeTooltipIndex || activeTooltipIndex === 0) {
      router.push(`/tour/${data[activeTooltipIndex].id}`)
    }
  }

  return (
    <Card>
      <StatCardHeader Icon={BusIcon}>Most Played Tours</StatCardHeader>
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
              onClick={tourClicked}
              dataKey='name'
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
