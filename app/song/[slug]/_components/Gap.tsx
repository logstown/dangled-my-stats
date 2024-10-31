'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  gap: {
    label: 'Gap',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function SongGap({ gap, largestGap }: { gap: number; largestGap: number }) {
  const endAngle = (360 * gap) / largestGap - 90
  const chartData = [{ browser: 'safari', gap, fill: 'var(--color-safari)' }]

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'
    >
      <RadialBarChart
        width={200}
        height={200}
        data={chartData}
        startAngle={90}
        endAngle={-endAngle}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:fill-muted last:fill-background'
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey='gap' background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-4xl font-bold'
                    >
                      {gap.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className='fill-muted-foreground'
                    >
                      Show gap
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
