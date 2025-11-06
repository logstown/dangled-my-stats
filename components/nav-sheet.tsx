'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import Image from 'next/image'

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
          <SheetDescription className='hidden'>Browse</SheetDescription>
        </SheetHeader>
        <NavigationMenu orientation='vertical'>
          <NavigationMenuList className='flex-col items-start space-x-0'>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                onClick={() => setOpen(false)}
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/songs'>Songs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                onClick={() => setOpen(false)}
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/venues'>Venues</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                onClick={() => setOpen(false)}
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/tours'>Tours</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <RandomThing onClick={() => setOpen(false)} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                onClick={() => setOpen(false)}
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/about'>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}
