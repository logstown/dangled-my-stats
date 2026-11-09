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
      icon: <MusicIcon size={18} />,
    },
    {
      name: 'Venues',
      href: '/venues',
      icon: <TicketIcon size={18} />,
    },
    {
      name: 'Tours',
      href: '/tours',
      icon: <BusIcon size={18} />,
    },
  ]

  return (
    <header className='bg-primary text-primary-foreground flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 shadow-2xl'>
      <div className='lg:hidden'>
        <NavSheet />
      </div>
      <div className='flex items-center gap-6 xl:gap-16'>
        <Link href='/' className='flex items-end gap-6'>
          <Image
            src='/ai-thing.png'
            className='hidden rounded-xl lg:block'
            width={35}
            height={35}
            alt='thing'
          />
          <span
            className={` ${shirkhand.className} text-secondary text-2xl whitespace-nowrap`}
          >
            Dangled My Stats
          </span>
        </Link>
        <NavigationMenu className='hidden lg:block'>
          <NavigationMenuList className='flex-row'>
            {/* <NavigationMenuItem>
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
                              'w-full! items-center justify-start! gap-2 py-7! px-5 text-base! ' +
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
            </NavigationMenuItem> */}
            {links.map(x => (
              <NavigationMenuItem key={x.name}>
                <NavigationMenuLink
                  asChild
                  className={
                    navigationMenuTriggerStyle() +
                    ' bg-primary text-primary-foreground items-center gap-2 text-base!'
                  }
                >
                  <Link href={x.href}>
                    {x.icon}
                    {x.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className='border-primary-foreground/25 ml-6 border-l pl-6'>
              <NavigationMenuLink
                asChild
                className={
                  navigationMenuTriggerStyle() +
                  ' bg-primary text-primary-foreground/80 text-sm!'
                }
              >
                <Link href='/updates'>Updates</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={
                  navigationMenuTriggerStyle() +
                  ' bg-primary text-primary-foreground/80 text-sm!'
                }
              >
                <Link href='/about'>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex gap-4'>
        <div className='hidden lg:block'>
          <RandomThing />
        </div>
        <SearchAllServer isNavbar />
      </div>
    </header>
  )
}
