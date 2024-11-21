'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { SetSong } from '@/lib/models'
import Link from 'next/link'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Blockquote, BlockquoteAuthor } from '@/components/ui/blockquote'
import { ShowLink } from '@/components/show-link'

type Blurb = SetSong & { sentences: string[] }

export function SetNotesMentionsCarousel({ blurbs }: { blurbs: Blurb[] }) {
  const plugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {blurbs.map(blurb => (
          <CarouselItem
            key={blurb.uniqueid}
            className='flex flex-col justify-center px-6'
          >
            <Blockquote>
              <div dangerouslySetInnerHTML={{ __html: `${blurb.sentences[0]}` }} />
              <BlockquoteAuthor>
                <ShowLink setSong={blurb} />
              </BlockquoteAuthor>
            </Blockquote>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
