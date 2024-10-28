export type Song = {
  songid: string
  song: string
  slug: string
  abbr: string
  artist: string
  debut: string
  last_played: string
  times_played: string
  last_permalink: string
  debut_permalink: string
  gap: string
}

export type SetSong = {
  showid: string
  showdate: string
  permalink: string
  showyear: string
  uniqueid: string
  meta: string
  reviews: string
  exclude: string
  setlistnotes: string
  soundcheck: string
  songid: string
  position: string
  transition: string
  footnote: string
  set: string
  isjam: string
  isreprise: string
  isjamchart: string
  jamchart_description: string
  tracktime: any
  gap: string
  tourid: string
  tourname: string
  tourwhen: string
  song: string
  nickname: string
  slug: string
  is_original: string
  venueid: string
  venue: string
  city: string
  state: string
  country: string
  trans_mark: string
  artistid: string
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
  venueid: string
  venuename: string
  city: string
  state: string
  country: string
  venuenotes: string
  alias: string
  short_name: string
}

export interface VenueBrowse extends Venue {
  browse_name: string
}

export type Show = {
  showid: string
  showyear: string
  showmonth: string
  showday: string
  showdate: string
  permalink: string
  exclude_from_stats: string
  venueid: string
  setlist_notes: string
  venue: string
  city: string
  state: string
  country: string
  artistid: string
  artist_name: string
  tourid: string
  tour_name: string
  created_at: string
  updated_at: string
}
