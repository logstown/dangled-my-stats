'use client'

import { StatCardHeader } from '@/components/stat-card-header'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong } from '@/lib/models'
import { countBy, map, maxBy } from 'lodash'
import { ListMusicIcon } from 'lucide-react'
import { useMemo } from 'react'

const setNameMap = {
  1: 'Set 1',
  2: 'Set 2',
  3: 'Set 3',
  4: 'Set 4',
  5: 'Set 5',
  e: 'Encore',
  e2: 'Encore 2',
  e3: 'Encore 3',
} as any

export function SetBreakdown({ setSongs }: { setSongs: SetSong[] }) {
  console.log(map(setSongs, 'set'))
  const data = useMemo(() => {
    const counts = countBy(setSongs, 'set')
    return map(counts, (count, set) => ({
      value: count,
      name: setNameMap[set],
    }))
  }, [setSongs])

  const mostPlayed = maxBy(data, 'value')

  return (
    <Card>
      <StatCardHeader Icon={ListMusicIcon}>Most Likely Set</StatCardHeader>
      <CardContent>
        <div className='text-center text-4xl font-bold'>{mostPlayed?.name}</div>
      </CardContent>
    </Card>
  )

  // return (
  //   <PieChart width={800} height={400}>
  //     {/* <Pie
  //         data={data}
  //         cx={120}
  //         cy={200}
  //         innerRadius={60}
  //         outerRadius={80}
  //         fill="#8884d8"
  //         paddingAngle={5}
  //         dataKey="value"
  //       >
  //         {data.map((entry, index) => (
  //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //         ))}
  //       </Pie> */}
  //     <Pie
  //       data={data}
  //       cx={420}
  //       cy={200}
  //       startAngle={180}
  //       endAngle={0}
  //       innerRadius={120}
  //       outerRadius={160}
  //       fill='#8884d8'
  //       stroke='black'
  //       paddingAngle={5}
  //       dataKey='value'
  //       label={({ name }) => name}
  //     >
  //       {data.map((entry, index) => (
  //         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //       ))}
  //     </Pie>
  //     <Tooltip />
  //   </PieChart>
  // )
}
