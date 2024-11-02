import { SetSong, Song } from '@/lib/models'
import { LongestGap } from './LongestGap'
import { LongestRun } from './LongestRun'
import { MostPlayedTour } from './MostPlayedTour'
import { MostPlayedVenue } from './MostPlayedVenue'
import { SegueBreakdown } from './SegueBreakdown'
import { SetBreakdown } from './SetBreakdown'
import { TimesPlayed } from './TimesPlayed'
import { maxBy } from 'lodash'

export function SongStats({
  song,
  allSongs,
  setSongs,
}: {
  song: Song
  allSongs: Song[]
  setSongs: SetSong[]
}) {
  const mostPlayedSongCount = maxBy(allSongs, x =>
    Number(x.times_played),
  )!.times_played

  return (
    <div className='flex flex-wrap items-center justify-around gap-6'>
      <div>
        <TimesPlayed
          timesPlayed={Number(song.times_played)}
          mostPlayedSongCount={Number(mostPlayedSongCount)}
        />
      </div>
      <div>
        <LongestRun setSongs={setSongs} />
      </div>
      <div>
        <LongestGap setSongs={setSongs} />
      </div>
      <div>
        <SetBreakdown setSongs={setSongs} />
      </div>
      <div>
        <SegueBreakdown setSongs={setSongs} />
      </div>
      <div>
        <MostPlayedVenue setSongs={setSongs} />
      </div>
      <div>
        <MostPlayedTour setSongs={setSongs} />
      </div>
    </div>
  )
}
