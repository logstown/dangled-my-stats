'use client'

import { AudioLinesIcon } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
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
import { countBy, find, map } from 'lodash'

export const description = 'An area chart with gradient fill'

const chartConfig = {
  timesPlayed: {
    label: 'Times Played',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function TimelineFrequency({ setSongs }: { setSongs: SetSong[] }) {
  // const now = new Date();
  // const domainToday = d3.scaleTime().domain([d3.timeDay.floor(now), d3.timeDay.ceil(now)]);
  // const timeFormatter = (tick) => {return d3.timeFormat('%H:%M:%S')(new Date(tick));};
  // const ticks = domainToday.ticks(d3.timeHour.every(1));

  const chartData = useMemo(() => {
    const counts = countBy(setSongs, setSong =>
      new Date(setSong.showdate).getFullYear(),
    )

    const mapped = map(counts, (timesPlayed, year) => ({
      year: Number(year),
      timesPlayed,
    }))

    const final = []
    for (let year = 1983; year <= new Date().getFullYear() + 1; year++) {
      const found = find(mapped, { year })

      final.push({
        year: +new Date(year, 0),
        timesPlayed: found?.timesPlayed ?? 0,
      })
    }

    return final
  }, [setSongs])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <AudioLinesIcon className='text-neutral-400' size={20} />
          Frequency
        </CardTitle>
        <CardDescription className='ml-8'>by year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          style={{ height: '300px', width: '100%' }}
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
              domain={[+new Date(1983, 0), +new Date()]}
              axisLine={false}
              type='number'
              scale='time'
              interval='equidistantPreserveStart'
              tickFormatter={time =>
                new Date(time).toLocaleString('en-US', { year: 'numeric' })
              }
              tickMargin={8}
            />
            <YAxis
              dataKey='timesPlayed'
              tickLine={false}
              axisLine={false}
              width={15}
              allowDecimals={false}
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
