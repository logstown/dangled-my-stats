'use client'

import { ArrowLeftRightIcon } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { SetSong } from '@/lib/models'
import { useMemo } from 'react'
import { countBy, map, reduce } from 'lodash'
import { StatCardHeader } from '@/components/stat-card-header'

const chartConfig = {
  value: {
    label: 'Count',
  },
  1: {
    label: 'None',
    color: 'hsl(var(--chart-1))',
  },
  2: {
    label: '>',
    color: 'hsl(var(--chart-2))',
  },
  3: {
    label: '->',
    color: 'hsl(var(--chart-3))',
  },
  6: {
    label: 'None',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig as any

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
}: any) => {
  const RADIAN = Math.PI / 180
  // eslint-disable-next-line
  const radius = 25 + innerRadius + (outerRadius - innerRadius)
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      className='sm:text-xl'
      x={x}
      y={y}
      fill={chartConfig[name].color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {chartConfig[name].label}
    </text>
  )
}

export function SegueBreakdown({ setSongs }: { setSongs: SetSong[] }) {
  const data = useMemo(() => {
    const counts = countBy(setSongs, 'transition')

    const cleanCounts = reduce(
      counts,
      (clean, count, transId: string) => {
        if (Number(transId) <= 3) {
          clean[transId] = count
        } else {
          clean['1'] = clean['1'] ?? 0
          clean['1'] += count
        }

        return clean
      },
      {} as any,
    )

    return map(cleanCounts, (count, transId) => {
      return {
        name: transId,
        value: count,
        fill: `var(--color-${transId})`,
      }
    })
  }, [setSongs])

  return (
    <Card className='flex flex-col'>
      <StatCardHeader Icon={ArrowLeftRightIcon}>Segue Distribution</StatCardHeader>
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
              cy={200}
              innerRadius={100}
              outerRadius={150}
              paddingAngle={5}
              startAngle={180}
              endAngle={0}
              label={renderCustomizedLabel}
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
