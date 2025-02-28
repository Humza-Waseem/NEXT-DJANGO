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
import { useEffect, useState } from "react";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] Light items-center justify-items-center p-8 pb-20 ">
        <NavigationMenu> 
          <NavigationMenuList >
            <div className="flex items-center justify-center  mr-24">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={80} />
              </Link>
            </div>
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
                <ul className="grid w-[100px] gap-2 p-2 md:w-[100px] md:grid-cols-2 lg:w-[300px]">
                  {socialIcons.map((socialsIcon) => (
                    <li
                      key={socialsIcon.title}
                      title={socialsIcon.title}
                      className="flex items-center justify-center "
                    >
                      <Link legacyBehavior href={socialsIcon.href} passHref>
                        <a className="block p-2 hover:bg-gray-200 rounded  width-20 height-20">
                          <Image
                            src={socialsIcon.logo}
                            alt={socialsIcon.title}
                            width={20}
                            height={20}
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
            
              {isAuthenticated ? (
                // Show Logout button when authenticated
                <Button variant={"destructive"}
               
                 
                  onClick={() => {
                    localStorage.removeItem("access_token"); // Remove token
                    setIsAuthenticated(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                // Show Login button when not authenticated
                <Link href="/signin">
                  <Button >
                    Login
                  </Button>
                </Link>
              )}
            
            
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
