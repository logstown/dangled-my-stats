import { SetSong } from '@/lib/models'
import { cloneDeep, findIndex, last, maxBy, reject, tail } from 'lodash'
import { CheckIcon, CircleEllipsisIcon, CircleIcon } from 'lucide-react'
import Link from 'next/link'

export function SongTimeline({ setSongs }: { setSongs: SetSong[] }) {
  setSongs = reject(
    setSongs,
    (song: SetSong, i) => song.showid === setSongs[i - 1]?.showid,
  )

  const { longestRun } = setSongs.reduce(
    (
      { longestRun, currentRun }: { longestRun: SetSong[]; currentRun: SetSong[] },
      setSong,
      i,
    ) => {
      if (setSong.gap === '1') {
        currentRun.push(setSong)
      } else if (setSongs[i - 1]?.gap === '1') {
        if (currentRun.length > longestRun.length) {
          longestRun = cloneDeep(currentRun)
        }

        currentRun = []
      } else if (setSongs[i + 1]?.gap === '1') {
        currentRun.push(setSong)
      }

      return { longestRun, currentRun }
    },
    { longestRun: [], currentRun: [] },
  )

  let gapShows: SetSong[] = []
  const gapNextShow = maxBy(tail(setSongs), x => Number(x.gap))

  if (gapNextShow) {
    const idx = findIndex(setSongs, { uniqueid: gapNextShow.uniqueid })
    const gapFirstShow = setSongs[idx - 1]
    gapShows = [gapFirstShow, gapNextShow]
  }

  const debut = setSongs[0]
  let lastPlayed = last(setSongs)
  if (debut.showid === lastPlayed?.showid) {
    lastPlayed = undefined
  }

  const nothingLine = <hr className='bg-neutral' />
  const nothingDot = (
    <div className='timeline-middle'>
      <CircleEllipsisIcon size={20} strokeWidth={2} className='text-neutral' />
    </div>
  )
  const somethingDot = (
    <div className='timeline-middle'>
      <CircleIcon size={18} className='text-primary' fill='currentColor' />
    </div>
  )

  const filler = (
    <>
      <li>
        {nothingLine}
        {nothingDot}
        <div className='timeline-start invisible mb-10'>...</div>
        {nothingLine}
      </li>
    </>
  )

  const longestRunJsx = longestRun.map((show, i) => (
    <li key={show.showid}>
      <hr className={i === 0 ? 'bg-neutral' : 'bg-primary'} />
      {somethingDot}
      <ShowLink
        setSong={show}
        className={i === longestRun.length - 1 ? 'mb-10' : ''}
      />
      {i === 0 && (
        <div className='timeline-start mr-3 text-xl font-medium'>Longest Run</div>
      )}
      <hr className={i < longestRun.length - 1 ? 'bg-primary' : 'bg-neutral'} />
    </li>
  ))

  const gapShowsJsx = gapShows.length ? (
    <>
      <li>
        {nothingLine}
        {somethingDot}
        <ShowLink setSong={gapShows[0]} className='mb-6' />
        <div className='timeline-start mb-6 mr-3 text-xl font-medium'>
          Longest Gap
        </div>
        {nothingLine}
      </li>
      <li>
        {nothingLine}
        {nothingDot}
        <div className='timeline-end mb-6 ml-3 text-primary/80'>
          {gapShows[1].gap} Shows
        </div>
        {nothingLine}
      </li>
      <li>
        {nothingLine}
        {somethingDot}
        <ShowLink setSong={gapShows[1]} className='mb-10' />
        {nothingLine}
      </li>
    </>
  ) : null

  return (
    <ul className='timeline timeline-vertical timeline-snap-icon -ml-24'>
      <li>
        {somethingDot}
        <div className='timeline-start mb-10 mr-3 text-xl font-medium'>Debut</div>
        <ShowLink setSong={debut} className='mb-10' />
        {nothingLine}
      </li>
      {filler}
      {gapShows[0]?.showdate < longestRun[0]?.showdate ? (
        <>
          {gapShowsJsx}
          {filler}
          {longestRunJsx}
        </>
      ) : (
        <>
          {longestRunJsx}
          {filler}
          {gapShowsJsx}
        </>
      )}
      {filler}
      {lastPlayed && (
        <li>
          {nothingLine}
          {somethingDot}
          <ShowLink setSong={lastPlayed} />
          <div className='timeline-start mr-3 text-xl font-medium'>Last Played</div>
        </li>
      )}
    </ul>
  )
}

function ShowLink({ setSong, className }: { setSong: SetSong; className?: string }) {
  return (
    <div className={`timeline-end ml-3 ${className}`}>
      <Link href={setSong.permalink} target='_blank'>
        {setSong.showdate}, {setSong.venue}
      </Link>
    </div>
  )
}
