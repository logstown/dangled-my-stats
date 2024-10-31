import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { SetSong } from '@/lib/models'
import { countBy, map, maxBy, reduce } from 'lodash'
import { ArrowLeftRightIcon, ListMusicIcon } from 'lucide-react'
import { useMemo } from 'react'

const segueNameMap = {
  '1': 'None',
  '2': '>',
  '3': '->',
  '6': 'None',
} as any

export function SegueBreakdown({ setSongs }: { setSongs: SetSong[] }) {
  console.log('********', setSongs.length)
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
        name: segueNameMap[transId],
        value: count,
      }
    })
  }, [setSongs])

  const mostLikely = maxBy(data, 'value')

  return (
    <Card className='min-w-52'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Most Likely Segue</CardTitle>
        <ArrowLeftRightIcon size={15} />
      </CardHeader>
      <CardContent>
        <div className='mt-4 text-center text-4xl font-bold'>{mostLikely?.name}</div>
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
