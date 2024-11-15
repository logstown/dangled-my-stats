import { Song } from '@/lib/models'

import { format, differenceInDays } from 'date-fns'
import { last } from 'lodash'
import Link from 'next/link'

export function TimelineTwoDot({
  song,
  earliestDebut,
  lastShow,
}: {
  song: Song
  earliestDebut: string
  lastShow: string
}) {
  let timelineData = [
    { title: 'First Show', date: new Date(earliestDebut), link: '#' },
  ]

  if (song.debut === song.last_played) {
    timelineData.push({
      title: 'Only occurrence',
      date: new Date(song.debut),
      link: song.debut_permalink,
    })
  } else {
    timelineData = [
      ...timelineData,
      ...[
        { title: 'Debut', date: new Date(song.debut), link: song.debut_permalink },
        {
          title: 'Last Played',
          date: new Date(song.last_played),
          link: song.last_permalink,
        },
      ],
    ]
  }

  timelineData.push({ title: 'Last Show', date: new Date(lastShow), link: '#' })

  const startDate = timelineData[0].date
  const endDate = last(timelineData)?.date ?? new Date()
  const totalDays = differenceInDays(endDate, startDate)

  const getPosition = (date: Date) => {
    const days = differenceInDays(date, startDate)
    return (days / totalDays) * 100
  }

  return (
    <div className='relative'>
      {/* Timeline line */}
      <div className='absolute left-0 right-0 top-4 h-0.5 bg-gray-300' />

      {/* Timeline items */}
      {timelineData.map((item, index) => {
        const position = getPosition(item.date)
        return (
          <div
            key={index}
            className={`absolute -top-5 ${index === timelineData.length - 2 ? 'z-20' : ''}`}
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            {index === 0 || index === timelineData.length - 1 ? (
              <div className='mt-6 h-6 w-0.5 bg-gray-300' />
            ) : (
              <Link
                href={item.link}
                className='flex flex-col items-center'
                target='_blank'
              >
                <div className='mb-2 whitespace-nowrap text-center text-xs font-medium sm:text-sm'>
                  {item.title}
                </div>
                <div className='z-10 mb-2 h-4 w-4 rounded-full bg-primary' />
                <div className='mb-1 text-center text-xs text-muted-foreground'>
                  {format(item.date, 'MMM d yyyy')}
                </div>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
