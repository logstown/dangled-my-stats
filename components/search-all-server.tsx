import { getAllShows, getAllSongs, getAllVenues } from '@/lib/phish-service'
import { map, uniqBy } from 'lodash'
import { SearchAll } from './search-all'

export async function SearchAllServer({ isNavbar }: { isNavbar?: boolean }) {
  const allSongsResp = await getAllSongs()
  if (!allSongsResp || allSongsResp.error) return
  const songs = uniqBy(allSongsResp.data, 'songid')

  const allVenuesResp = await getAllVenues()
  const venues = map(allVenuesResp.data, x => ({
    ...x,
    browse_name: `${x.city}: ${x.short_name || x.venuename}`,
  }))

  const allShowsResp = await getAllShows()
  const tours = uniqBy(allShowsResp.data, 'tourid').filter(x => x.tourid !== 61)

  return (
    <SearchAll
      isNavbar={isNavbar ?? false}
      songs={songs}
      venues={venues}
      tours={tours}
    />
  )
}
