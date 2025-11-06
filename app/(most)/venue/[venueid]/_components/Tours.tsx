import { StatCardHeader } from '@/components/stat-card-header'
import { badgeVariants } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SetSong } from '@/lib/models'
import { uniqBy } from 'lodash'
import { BusIcon } from 'lucide-react'
import Link from 'next/link'
import { HtmlText } from '@/components/html-text'

export function VenueTours({ venueSongs }: { venueSongs: SetSong[] }) {
  const tours = uniqBy(venueSongs, 'tourname')
  return (
    <Card className='h-full'>
      <StatCardHeader Icon={BusIcon}>Tours</StatCardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {tours.map(x => (
            // <Badge key={x.slug}>{x.song}</Badge>
            <Link
              href={`/tour/${x.tourid}`}
              key={x.tourid}
              className={`${badgeVariants({ variant: 'outline' })} whitespace-nowrap`}
            >
              <HtmlText>{x.tourname}</HtmlText>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
