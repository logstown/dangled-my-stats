'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

export const description = 'A radial chart with text'

const chartConfig = {
  timesPlayed: {
    label: 'Times Played',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function TimesPlayed({
  timesPlayed,
  mostPlayedSongCount,
}: {
  timesPlayed: number
  mostPlayedSongCount: number
}) {
  const endAngle = (360 * timesPlayed) / mostPlayedSongCount - 90
  const chartData = [{ browser: 'safari', timesPlayed, fill: 'var(--color-safari)' }]

  return (
    <ChartContainer
      style={{ width: 115, height: 115 }}
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'
    >
      <RadialBarChart
        width={115}
        height={115}
        data={chartData}
        startAngle={90}
        endAngle={-endAngle}
        innerRadius={50}
        outerRadius={75}
        barSize={8}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:fill-muted last:fill-background'
          polarRadius={[51, 44]}
        />
        <RadialBar dataKey='timesPlayed' background cornerRadius={10} />
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
                      className='fill-foreground text-2xl font-bold'
                    >
                      {timesPlayed.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className='fill-muted-foreground'
                    >
                      Plays
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
