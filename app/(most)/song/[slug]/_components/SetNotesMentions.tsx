import { Card, CardContent } from '@/components/ui/card'
import { SetSong } from '@/lib/models'
import { filter, map, split } from 'lodash'
import sanitizeHtml from 'sanitize-html'
// import { BlurbsCarousel } from './BlurbsCarousel'
import { AtSignIcon } from 'lucide-react'
import { StatCardHeader } from '@/components/stat-card-header'
import { SetNotesMentionsCarousel } from './SetNotesMentionsCarousel'

const boldString = (str: string, substr: string) =>
  str.replaceAll(substr, `<strong>${substr}</strong>`)

export function SetNotesMentions({ setSongs }: { setSongs: SetSong[] }) {
  const notes = filter(setSongs, x => x.setlistnotes.includes(x.song))
  const blurbs = map(notes, note => {
    let sentences = split(note.setlistnotes, '.')
    sentences = sentences
      .filter(x => x.includes(note.song))
      .map(x => sanitizeHtml(x))
      .map(x => x.replace(/(<([^>]+)>)/gi, '').trim())
      .map(x => boldString(x, note.song))

    return {
      sentences,
      ...note,
    }
  })

  return (
    <Card>
      <StatCardHeader Icon={AtSignIcon}>Set Notes Mentions</StatCardHeader>
      <CardContent>
        <SetNotesMentionsCarousel blurbs={blurbs} />
      </CardContent>
    </Card>
  )
}
