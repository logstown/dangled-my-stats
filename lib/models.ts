export type Song = {
  songid: number
  song: string
  slug: string
  abbr: string
  artist: string
  debut: string
  last_played: string
  times_played: number
  last_permalink: string
  debut_permalink: string
  gap: number
}

export type SetSong = {
  showid: number
  showdate: string
  permalink: string
  showyear: string
  uniqueid: number
  meta: string
  reviews: string
  exclude: number
  setlistnotes: string
  soundcheck: string
  songid: number
  position: number
  transition: number
  footnote: string
  set: string
  isjam: number
  isreprise: number
  isjamchart: number
  jamchart_description: string
  tracktime: any
  gap: number
  tourid: number
  tourname: string
  tourwhen: string
  song: string
  nickname: string
  slug: string
  is_original: number
  venueid: number
  venue: string
  city: string
  state: string
  country: string
  trans_mark: string
  artistid: number
  artist_slug: string
  artist_name: string
}

export type SongDetail = {
  songid: string
  song: string
  nickname: string
  slug: string
  lyrics: string
  history: string
  historian: string
}

export type Venue = {
  venueid: number
  venuename: string
  city: string
  state: string
  country: string
  venuenotes: string
  alias: number
  short_name: string
}

export interface VenueBrowse extends Venue {
  browse_name: string
  timesPlayed?: number
}

export type Show = {
  showid: number
  showyear: string
  showmonth: number
  showday: number
  showdate: string
  permalink: string
  exclude_from_stats: number
  venueid: number
  setlist_notes: string
  venue: string
  city: string
  state: string
  country: string
  artistid: number
  artist_name: string
  tourid: number
  tour_name: string
  created_at: string
  updated_at: string
}
