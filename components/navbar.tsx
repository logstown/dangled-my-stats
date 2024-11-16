import { NavSheet } from './nav-sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { SearchAll } from './search-all'
import { getAllShows, getAllSongs, getAllVenues } from '@/lib/phish-service'
import { map, uniqBy } from 'lodash'
import { RandomThing } from './random-thing'
import { shirkhand } from '@/app/fonts/fonts'

export async function Navbar() {
  const allSongsResp = await getAllSongs()
  const songs = uniqBy(allSongsResp.data, 'songid')

  const allVenuesResp = await getAllVenues()
  const venues = map(allVenuesResp.data, x => ({
    ...x,
    browse_name: `${x.city}: ${x.short_name || x.venuename}`,
  }))

  const allShowsResp = await getAllShows()
  const tours = uniqBy(allShowsResp.data, 'tourid').filter(x => x.tourid !== '61')

  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-primary px-4 text-primary-foreground shadow-xl'>
      <div className='md:hidden'>
        <NavSheet />
      </div>
      <div className='flex items-center'>
        <Link href='/' className={` ${shirkhand.className} text-2xl text-secondary`}>
          Dangled My Stats
        </Link>
        <NavigationMenu className='ml-14 hidden md:block'>
          <NavigationMenuList className='flex-row'>
            <NavigationMenuItem>
              <Link href='/browse/songs' legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    ' bg-primary text-primary-foreground'
                  }
                >
                  Songs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/browse/venues' legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    ' bg-primary text-primary-foreground'
                  }
                >
                  Venues
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/browse/tours' legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    ' bg-primary text-primary-foreground'
                  }
                >
                  Tours
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex gap-4'>
        <div className='hidden md:block'>
          <RandomThing />
        </div>
        <SearchAll songs={songs} venues={venues} tours={tours} />
      </div>
    </header>
  )
}
