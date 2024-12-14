import { notFound } from 'next/navigation'
import { BrowseSongs } from './_components/BrowseSongs'
import { getAllShows, getAllSongs, getAllVenues } from '@/lib/phish-service'
import { countBy, filter, find, map, uniqBy } from 'lodash'
import { BrowseVenues } from './_components/BrowseVenues'
import { BrowseTours } from './_components/BrowseTours'

export default async function BrowseEntityPage({
  params,
}: {
  params: Promise<{ entity: string }>
}) {
  const { entity } = await params

  switch (entity) {
    case 'songs':
      const { data: allSongs, error } = await getAllSongs()
      if (error) {
        return 'Something went wrong'
      }
      const allUniqueSongs = uniqBy(allSongs, 'songid')
      return <BrowseSongs songs={allUniqueSongs} />
    case 'venues':
      const [{ data: allShows }, { data: allVenues }] = await Promise.all([
        getAllShows(),
        getAllVenues(),
      ])

      const allStatsShows = filter(allShows, { exclude_from_stats: 0 })
      const counts = countBy(allStatsShows, 'venueid')
      const venues = map(counts, (count, venueid) => {
        const foundVenue = find(allVenues, { venueid: Number(venueid) })!

        return {
          ...foundVenue,
          timesPlayed: count,
          browse_name: foundVenue.short_name || foundVenue.venuename || '',
        }
      })

      return <BrowseVenues venues={venues} />
    case 'tours':
      const { data } = await getAllShows()
      return <BrowseTours shows={data} />

    default:
      notFound()
  }
}
