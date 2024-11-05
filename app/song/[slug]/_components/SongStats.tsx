import { SetSong } from '@/lib/models'
import { LongestGap } from './LongestGap'
import { LongestRun } from './LongestRun'
import { MostPlayedTour } from './MostPlayedTour'
import { MostPlayedVenue } from './MostPlayedVenue'
import { SegueBreakdown } from './SegueBreakdown'
import { SetBreakdown } from './SetBreakdown'

export function SongStats({ setSongs }: { setSongs: SetSong[] }) {
  return (
    <>
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='w-full lg:w-1/2'>
          <SetBreakdown setSongs={setSongs} />
        </div>
        <div className='w-full lg:w-1/2'>
          <SegueBreakdown setSongs={setSongs} />
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-evenly gap-6'>
        {/* <div>
        <LongestRun setSongs={setSongs} />
      </div>
      <div>
        <LongestGap setSongs={setSongs} />
      </div> */}
        <div>
          <MostPlayedVenue setSongs={setSongs} />
        </div>
        <div>
          <MostPlayedTour setSongs={setSongs} />
        </div>
      </div>
    </>
  )
}
