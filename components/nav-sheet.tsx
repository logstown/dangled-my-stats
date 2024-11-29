'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import Link from 'next/link'
import { useState } from 'react'
import { RandomThing } from './random-thing'

export function NavSheet() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      aria-describedby='navigation'
      aria-description='navigation'
    >
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        aria-describedby='navigation'
        aria-description='navigation'
      >
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className='hidden'>dummy</SheetDescription>
        </SheetHeader>
        <NavigationMenu orientation='horizontal'>
          <NavigationMenuList className='flex-col items-start space-x-0'>
            <NavigationMenuItem>
              <Link href='/browse/songs' legacyBehavior passHref>
                <NavigationMenuLink
                  onClick={() => setOpen(false)}
                  className={navigationMenuTriggerStyle()}
                >
                  Songs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/browse/venues' legacyBehavior passHref>
                <NavigationMenuLink
                  onClick={() => setOpen(false)}
                  className={navigationMenuTriggerStyle()}
                >
                  Venues
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/browse/tours' legacyBehavior passHref>
                <NavigationMenuLink
                  onClick={() => setOpen(false)}
                  className={navigationMenuTriggerStyle()}
                >
                  Tours
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <RandomThing onClick={() => setOpen(false)} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
