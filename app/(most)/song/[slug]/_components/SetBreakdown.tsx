'use client'

import { ListMusicIcon, TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

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
import { countBy, map } from 'lodash'
import { StatCardHeader } from '@/components/stat-card-header'

const chartConfig = {
  value: {
    label: 'Count',
  },
  1: {
    label: 'Set 1',
    color: 'hsl(var(--chart-1))',
  },
  2: {
    label: 'Set 2',
    color: 'hsl(var(--chart-2))',
  },
  3: {
    label: 'Set 3',
    color: 'hsl(var(--chart-3))',
  },
  4: {
    label: 'Set 4',
    color: 'hsl(var(--chart-4))',
  },
  5: {
    label: 'Set 5',
    color: 'hsl(var(--chart-5))',
  },
  e: {
    label: 'Encore',
    color: 'hsl(var(--chart-4))',
  },
  e2: {
    label: 'Encore 2',
    color: 'hsl(var(--chart-5))',
  },
  e3: {
    label: 'Encore 3',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig as any

export function SetBreakdown({ setSongs }: { setSongs: SetSong[] }) {
  const data = useMemo(() => {
    const counts = countBy(setSongs, 'set')
    return map(counts, (count, set) => ({
      value: count,
      name: set,
      fill: `var(--color-${set})`,
    }))
  }, [setSongs])

  return (
    <Card className='flex flex-col'>
      <StatCardHeader Icon={ListMusicIcon}>Set Distribution</StatCardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          style={{ height: '250px', width: '100%' }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              cy={190}
              innerRadius={100}
              outerRadius={150}
              paddingAngle={5}
              startAngle={180}
              endAngle={0}
              label={({ name }) => chartConfig[name].label}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
