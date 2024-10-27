import { NavSheet } from "./nav-sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="md:hidden">
        <NavSheet />
      </div>
      <div className="text-xl font-semibold tracking-tight">Dangled My Stats</div>
      <NavigationMenu className="ml-14 hidden md:block">
        <NavigationMenuList className="flex-row">
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Songs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dfsd" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} active={true}>
                Venues
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dfsd" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tours</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
