import { NavSheet } from './nav-sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { RandomThing } from './random-thing'
import { shirkhand } from '@/app/fonts/fonts'
import { SearchAllServer } from './search-all-server'
import Image from 'next/image'
import { BusIcon, MusicIcon, TicketIcon } from 'lucide-react'
import React, { cloneElement } from 'react'

export async function Navbar() {
  const links = [
    {
      name: 'Songs',
      href: '/songs',
      icon: <MusicIcon className='text-neutral-500' />,
    },
    {
      name: 'Venues',
      href: '/venues',
      icon: <TicketIcon className='text-neutral-500' />,
    },
    {
      name: 'Tours',
      href: '/tours',
      icon: <BusIcon className='text-neutral-500' />,
    },
  ]

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
              <NavigationMenuTrigger className='bg-primary text-base text-primary-foreground'>
                Browse
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='py-2'>
                  {links.map(x => {
                    const icon = cloneElement(x.icon, { size: 15 })
                    return (
                      <li key={x.name} className='px-2'>
                        <Link href={x.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={
                              '!w-full items-center !justify-start gap-2 !py-7 px-5 !text-base ' +
                              navigationMenuTriggerStyle()
                            }
                          >
                            {icon}
                            {x.name}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/about' legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    ' bg-primary !text-base text-primary-foreground'
                  }
                >
                  About
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
