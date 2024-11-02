import { StatCardHeader } from '@/components/stat-card-header'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong } from '@/lib/models'
import { countBy, map, find, takeRight, sortBy } from 'lodash'
import { TicketIcon } from 'lucide-react'
import { useMemo } from 'react'

export function MostPlayedVenue({ setSongs }: { setSongs: SetSong[] }) {
  const data = useMemo(() => {
    const venueCounts = countBy(setSongs, 'venueid')
    let venueCountsObj = map(venueCounts, (count, venueid) => {
      const { venue, city, state, country } = find(setSongs, { venueid })!

      return {
        count,
        venue,
        city,
        state,
        country,
      }
    })
    venueCountsObj = sortBy(venueCountsObj, 'count')
    return takeRight(venueCountsObj, 5).reverse()

    //   const venuesWithoutMSG = reject(venueCountsObj, { venueid: '157' })
    //   const mostPopVenueId = maxBy(venueCountsObj, 'count')
    //   const venueSet = find(setSongs, { venueid: mostPopVenueId?.venueid })
  }, [setSongs])

  console.log(data[0])

  return (
    <Card>
      <StatCardHeader Icon={TicketIcon}>Most Played Venue</StatCardHeader>
      <CardContent>
        <div className='mt-2 text-center text-2xl font-bold'>{data[0].venue}</div>
        <p className='text-center text-xs text-muted-foreground'>
          {data[0].city}, {data[0].state ?? data[0].country}
        </p>
      </CardContent>
    </Card>
  )

  // return (
  //   <BarChart
  //     width={700}
  //     height={500}
  //     data={data}
  //     layout='vertical'
  //     margin={{
  //       top: 30,
  //       right: 20,
  //       bottom: 10,
  //       left: 10,
  //     }}
  //   >
  //     <XAxis type='number' hide={true} />
  //     <YAxis
  //       type='category'
  //       width={300}
  //       dataKey='venue'
  //       tickLine={false}
  //       axisLine={false}
  //     />
  //     {/* <CartesianGrid strokeDasharray='3 3' /> */}
  //     <Bar
  //       dataKey='count'
  //       layout='vertical'
  //       fill='#8884d8'
  //       label={{ position: 'right' }}
  //     />
  //   </BarChart>
  // )
}
