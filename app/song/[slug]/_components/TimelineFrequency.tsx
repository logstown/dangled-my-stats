'use client'

import { AudioLinesIcon, ChartLineIcon, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { SetSong } from '@/lib/models'
import { useMemo } from 'react'
import { countBy, find, groupBy, last, map } from 'lodash'
import { TimesPlayed } from './TimesPlayed'

export const description = 'An area chart with gradient fill'

const chartConfig = {
  timesPlayed: {
    label: 'Times Played',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function TimelineFrequency({ setSongs }: { setSongs: SetSong[] }) {
  const chartData = useMemo(() => {
    console.log(setSongs)
    const counts = countBy(setSongs, setSong =>
      new Date(setSong.showdate).getFullYear(),
    )

    const mapped = map(counts, (timesPlayed, year) => ({
      year: Number(year),
      timesPlayed,
    }))

    const final = []
    for (let year = mapped[0].year; year <= last(mapped)!.year; year++) {
      const found = find(mapped, { year })

      final.push({
        year,
        timesPlayed: found?.timesPlayed ?? 0,
      })
    }

    return final
  }, [setSongs])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <AudioLinesIcon size={20} />
          Frequency
        </CardTitle>
        <CardDescription className='ml-8'>By Year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          style={{ height: '350px', width: '100%' }}
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='year'
              tickLine={false}
              //   domain={[chartData[0].year, last(chartData)?.year ?? 2024]}
              axisLine={false}
              //   type='number'
              tickMargin={8}
              tickFormatter={value => (value % 5 === 0 ? value : '')}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <defs>
              <linearGradient id='fillTimesPlayed' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-timesPlayed)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-timesPlayed)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='timesPlayed'
              type='basis'
              fill='url(#fillTimesPlayed)'
              fillOpacity={0.4}
              stroke='var(--color-timesPlayed)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
