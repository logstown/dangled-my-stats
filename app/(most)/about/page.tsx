import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Our Website',
  description: 'Learn more about our website, its author, and our data sources',
}

export default function AboutPage() {
  return (
    <div className='container mx-auto flex flex-col items-center px-4 py-8'>
      <div className='flex flex-col gap-10'>
        <h1 className='text-4xl font-bold'>About</h1>

        <Card className='max-w-2xl'>
          <CardHeader>
            <CardTitle>What is this?</CardTitle>
            <CardDescription>...you asked rhetorically</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='mb-4 text-muted-foreground'>
              This is just a passion project of mine that sprang from the discovery
              that{' '}
              <Link
                href='https://phish.net/'
                className='text-primary hover:underline'
                target='_blank'
              >
                phish.net
              </Link>{' '}
              offered a{' '}
              <Link
                href='https://docs.phish.net/'
                className='text-primary hover:underline'
                target='_blank'
              >
                public API
              </Link>{' '}
              on all Phish show data. The site has some stats here and there, but I
              thought I'd dig a little deeper into the data and create some unique
              charts and other vizualizations not found anywhere else. Hope you
              enjoy!
            </p>
            {/* <Separator className='my-4' /> */}
            {/* <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Data provided by:
              </span>
              <Link
                href='https://docs.phish.net/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-primary hover:underline'
              >
                Phish.net
                <ExternalLink className='ml-1 h-4 w-4' />
              </Link>
            </div> */}
          </CardContent>
        </Card>
        <Card className='max-w-2xl'>
          <CardHeader>
            <CardTitle>Who are you?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4 text-muted-foreground'>
              Thanks for asking! My name is Logan, and I'm a web developer based in
              the Boston area. Check out my website below for other projects.
            </p>
            {/* <p className='mb-4 text-muted-foreground'>
              The ODI provides a wealth of datasets across various domains, ensuring
              that our insights are based on up-to-date and accurate information.
            </p> */}
            <Separator className='my-4' />
            <div className='flex items-center justify-between'>
              <Link
                href='https://loganjoecks.com/'
                target='_blank'
                className='flex items-center text-primary hover:underline'
              >
                loganjoecks.com
                <ExternalLink className='ml-1 h-4 w-4' />
              </Link>
              <Link
                href='mailto:ljoecks@gmail.com'
                className='text-primary hover:underline'
              >
                Contact Me
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mt-8 text-center text-sm text-muted-foreground'>
        <p>© {new Date().getFullYear()} DangledMyStats All rights reserved.</p>
      </div>
    </div>
  )
}
