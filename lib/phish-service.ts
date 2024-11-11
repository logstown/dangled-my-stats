import { SetSong, Song, Venue, Show, SongDetail } from './models'

export interface PhishResponse<T> {
  error: boolean
  error_message: string
  data: T[]
}

export const getSongFromSets = async (
  songSlug: string,
): Promise<PhishResponse<SetSong>> => {
  return fetchFn(`setlists/slug/${songSlug}.json`, { revalidate: 60 * 60 * 24 })
}

export const getVenueSetSongs = async (
  venueid: string,
): Promise<PhishResponse<SetSong>> => {
  return fetchFn(`setlists/venueid/${venueid}.json`, { revalidate: 60 * 60 * 24 })
}

export const getTourSetSongs = async (
  tourid: string,
): Promise<PhishResponse<SetSong>> => {
  return fetchFn(`setlists/tourid/${tourid}.json`, { revalidate: 60 * 60 * 24 })
}

export const getAllSongs = async (): Promise<PhishResponse<Song>> => {
  return fetchFn('songs.json', { revalidate: 60 * 60 * 24 })
}

export const getAllVenues = async (): Promise<PhishResponse<Venue>> => {
  return fetchFn('venues.json', { revalidate: 60 * 60 * 24 })
}

export const getAllShows = async (): Promise<PhishResponse<Show>> => {
  return fetchFn('shows/artistid/1.json', { revalidate: 60 * 60 * 24 })
}

export const getSongDetail = async (songSlug: string): Promise<SongDetail> => {
  const resp = (await fetchFn(
    `songdata/slug/${songSlug}.json`,
  )) as PhishResponse<SongDetail>
  return resp.data[0]
}

const fetchFn = async (urlFrag: string, next: NextFetchRequestConfig = {}) => {
  return fetch(`https://api.phish.net/v5/${urlFrag}?apikey=BAFDD2FDAAC82574746F`, {
    method: 'GET',
    next,
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}
