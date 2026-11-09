import { Badge } from '@/components/ui/badge'
import { formatUpdateDate, updates } from '@/lib/updates'
import { ArrowUpRight, History } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Updates | Dangled My Stats',
  description:
    'New features, improvements, and fixes to Dangled My Stats, all in one place.',
}

const changeStyles = {
  New: 'border-primary/20 bg-primary/10 text-primary',
  Improved: 'border-blue-200 bg-blue-50 text-blue-800',
  Fixed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
}

export default function UpdatesPage() {
  return (
    <main className='mx-auto max-w-3xl pb-16'>
      <header className='mb-12'>
        <div className='text-primary mb-5 flex items-center gap-2 text-sm font-medium'>
          <History className='size-4' aria-hidden='true' />A little better with every
          update
        </div>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>What’s new</h1>
        <p className='text-muted-foreground mt-4 max-w-xl text-lg'>
          New features, small improvements, and fixes to keep you exploring the
          music. Here’s what’s changed on Dangled My Stats.
        </p>
      </header>

      <ol className='space-y-10'>
        {updates.map((update, index) => (
          <li key={update.id}>
            <article
              id={update.id}
              aria-labelledby={`${update.id}-title`}
              className='scroll-mt-8'
            >
              <div className='mb-4 flex flex-wrap items-center gap-3 text-sm'>
                <time
                  dateTime={update.date}
                  className='text-muted-foreground font-medium'
                >
                  {formatUpdateDate(update.date)}
                </time>
                {index === 0 && <Badge variant='secondary'>Latest update</Badge>}
              </div>
              <div className='bg-card rounded-xl border p-6 shadow-sm sm:p-8'>
                <h2
                  id={`${update.id}-title`}
                  className='text-2xl font-semibold tracking-tight'
                >
                  <Link
                    href={`#${update.id}`}
                    className='hover:text-primary focus-visible:outline-ring rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4'
                  >
                    {update.title}
                  </Link>
                </h2>
                <p className='text-muted-foreground mt-2 leading-relaxed'>
                  {update.summary}
                </p>
                <div className='mt-7 space-y-6'>
                  {update.changes.map(change => (
                    <section key={change.type}>
                      <h3 className='mb-3'>
                        <Badge className={changeStyles[change.type]}>
                          {change.type}
                        </Badge>
                      </h3>
                      <ul className='text-muted-foreground marker:text-primary/50 list-disc space-y-2 pl-5 leading-relaxed'>
                        {change.items.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p className='text-muted-foreground mt-10 text-sm'>
        Spotted something that could be better?{' '}
        <Link
          href='mailto:ljoecks@gmail.com'
          className='text-primary focus-visible:outline-ring inline-flex items-center gap-1 rounded-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-4'
        >
          Let me know
          <ArrowUpRight className='size-3.5' aria-hidden='true' />
        </Link>
      </p>
    </main>
  )
}
