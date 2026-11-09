type Update = {
  id: string
  date: string
  title: string
  summary: string
  changes: {
    type: 'New' | 'Improved' | 'Fixed'
    items: string[]
  }[]
}

// Add new entries at the top, using the date the changes go live (YYYY-MM-DD).
// Keep the copy focused on what changed for visitors, rather than implementation.
export const updates: [Update, ...Update[]] = [
  {
    id: 'search-is-back-on-track',
    date: '2026-11-09',
    title: 'Search is back on track',
    summary: 'Finding your next song, venue, or tour should be a little easier now.',
    changes: [
      {
        type: 'Fixed',
        items: [
          'Matching songs, venues, and tours now appear correctly in search results.',
          'Search handles special characters in names and ignores extra spaces at the beginning or end of your search.',
          'Clearer prompts let you know when to keep typing or when there are no matches.',
        ],
      },
      {
        type: 'New',
        items: [
          'This Updates page! Check back here for new features, improvements, and fixes to Dangled My Stats.',
        ],
      },
    ],
  },
]

export function formatUpdateDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
