import { NavSheet } from './nav-sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { RandomThing } from './random-thing'
import { shirkhand } from '@/app/fonts/fonts'
import { SearchAllServer } from './search-all-server'
import Image from 'next/image'

export async function Navbar() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-primary px-4 text-primary-foreground shadow-2xl'>
      <div className='md:hidden'>
        <NavSheet />
      </div>
      <div className='flex items-center gap-20'>
        <Link href='/' className='flex items-end gap-6'>
          <Image
            src='/ai-thing.png'
            className='hidden rounded-xl md:block'
            width={35}
            height={35}
            alt='thing'
          />
          <span className={` ${shirkhand.className} text-2xl text-secondary`}>
            Dangled My Stats
          </span>
        </Link>
        <NavigationMenu className='hidden md:block'>
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
        <SearchAllServer isNavbar />
      </div>
    </header>
  )
}
