"use client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";




import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../dark-mode/page";

export default function Navbar() {
  const navBarItems = {
    Home: "/",
    Pricing: "/pricing",
    Contact: "/contact",
  };
  const socialIcons = [
    {
      title: "Reddit",
      href: "https://www.reddit.com",
      logo: "/reddit.svg",
    },
    {
      title: "Twitter",
      href: "https://www.twitter.com",
      logo: "/twitter-x.svg",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com",
      logo: "/instagram.svg",
    },
    {
      title: "TikTok",
      href: "https://www.tiktok.com",
      logo: "/tiktok.svg",
    },
  ];

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] Light items-center justify-items-center p-8 pb-20">
        <NavigationMenu>
          <NavigationMenuList>
            {Object.entries(navBarItems).map(([label, linked]) => (
              <NavigationMenuItem key={label}>
                <Link href={linked} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>Communities</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {socialIcons.map((socialsIcon) => (
                    <li key={socialsIcon.title} title={socialsIcon.title}>
                      <Link legacyBehavior href={socialsIcon.href} passHref>
                        <a className="block p-2 hover:bg-gray-200 rounded">
                          <Image
                            src={socialsIcon.logo}
                            alt={socialsIcon.title}
                            width={32}
                            height={32}
                          />
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}