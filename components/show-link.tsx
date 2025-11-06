import { SetSong } from '@/lib/models'
import Link from 'next/link'
import { HtmlText } from './html-text'

export function ShowLink({
  setSong,
  className,
}: {
  setSong: SetSong
  className?: string
}) {
  return (
    <Link
      href={setSong.permalink}
      target='0'
      className={`text-muted-foreground ${className || ''}`}
    >
      <span className='text-foreground'>{setSong.showdate}</span>
      <span className='ml-2 uppercase'>
        <HtmlText>{setSong.venue}</HtmlText>
      </span>
    </Link>
  )
}
