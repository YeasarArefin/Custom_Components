# Custom-Components

Custom Components Made With Next.js, TailwindCSS, shadcn/ui

## Install Next.js + TailwindCSS

```sh $
npx create-next-app@latest
```

## Install shadcn/ui

```sh $
npx shadcn-ui@latest init
```

- Install Required `shadcn/ui` Component For Custom Components

```sh $
npx shadcn-ui@latest add button
```

- Install `React-Icons` Libaray

```sh $
yarn add react-icons
```

## Navbar - 1

- Create File `Navbar.tsx`

```
'use client'
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import NavItems from "./Navitems";
export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false)
    const links = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
        { name: 'Dashboard', to: '/dashboard' },
    ];

    return (
        <div className="sticky top-0">
            <nav className="relative border-b bg-white">
                <div className="container bg-white relative flex flex-col gap-y-5 md:flex-row items-start md:items-center md:justify-between z-20">
                    <div className="flex justify-between gap-x-2 items-center w-full text-lg py-2">
                        <div className="flex items-center gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                            <h1 className="font-bold">shadcn/navbar</h1>
                        </div>
                        <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu((open) => !open)}>{mobileMenu ? <IoMdClose className="text-2xl" /> : <HiMenuAlt2 className="text-2xl" />}</div>
                    </div>
                    <div className="hidden md:flex items-center gap-x-5">
                        <NavItems links={links} key="desktop" />
                    </div>
                </div>

                <div className={cn("flex flex-col md:hidden gap-y-5 pt-5 container absolute bg-white border-b transition-all duration-300 ease-in", { "-top-[500px]": !mobileMenu, "top-full": mobileMenu })}>
                    <NavItems links={links} key="mobile" />
                </div>
            </nav>
        </div>
    );
}
```

- Create File `Navitems.tsx`

```
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type Link = {
    name: string,
    to: string
}

export default function NavItems({ links }: { links: Link[] }) {

    const items = links.map(({ name, to }) => {
        const pathname = usePathname();
        const isActive = pathname.endsWith(to);
        return <Link key={to} href={to} className={cn("text-gray-600 text-sm font-medium", { "text-black font-bold": isActive })}>{name}</Link>
    })

    return (
        <>
            {items}
            <div>
                <Button className="mb-5 md:mb-0 text-sm w-[fit-content]">Sign In</Button>
            </div>
        </>
    )
}
```

- Demo : [Navbar-1](https://custom-components-chi.vercel.app/navbar/1)

## Navbar - 2

- Create File `Navbar.tsx`

```
'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import NavItems from "./Navitems";

export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);

    const links = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
        { name: 'Dashboard', to: '/dashboard' },
    ];

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            if (mobileMenu) {
                body.classList.add("overflow-hidden");
            } else {
                body.classList.remove("overflow-hidden");
            }
        }
    }, [mobileMenu]);

    return (
        <div className="sticky top-0 mb-5">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="border-b z-10 md:z-50">
                    <div className="container flex flex-col gap-y-5 md:flex-row items-start md:items-center md:justify-between ">
                        <div className="flex gap-x-5 items-center w-full text-lg py-2">
                            <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu(true)}><HiMenuAlt2 className="text-2xl" /></div>
                            <div className="flex items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                                <h1 className="font-bold">shadcn/navbar</h1>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-x-5">
                            <NavItems links={links} key="desktop" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("", { "bg-black/50 md:hidden z-30 fixed top-0 left-0 transition-all duration-300 h-[100%] w-full": mobileMenu })} onClick={() => setMobileMenu(false)}>
                <div className={cn("flex flex-col drop-shadow-2xl w-[300px] h-[100%] md:hidden gap-y-5 pt-5 container top-0 left-0 fixed bg-white transition-all duration-200 ease-in-out", { "-left-[500px]": !mobileMenu, "-left-[0px]": mobileMenu })} onClick={(e) => { e.stopPropagation(); }}>
                    <div className="flex justify-between gap-x-2 items-center w-full text-lg py-2">
                        <div className="flex items-center gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                            <h1 className="font-bold">shadcn/navbar</h1>
                        </div>
                        <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu(false)}><IoMdClose className="text-2xl" /></div>
                    </div>
                    <NavItems links={links} key="mobile" />
                </div>
            </div>
        </div>
    );
}
```

- Create File `Navitems.tsx`

```
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type Link = {
    name: string,
    to: string
}

export default function NavItems({ links }: { links: Link[] }) {

    const items = links.map(({ name, to }) => {
        const pathname = usePathname();
        const isActive = pathname.endsWith(to);
        return <Link key={to} href={to} className={cn("text-gray-600 text-sm font-medium", { "text-black font-bold": isActive })}>{name}</Link>
    })

    return (
        <>
            {items}
            <div>
                <Button className="mb-5 md:mb-0 text-sm w-[fit-content]">Sign In</Button>
            </div>
        </>
    )
}
```

- Demo : [Navbar-2](https://custom-components-chi.vercel.app/navbar/2)

## Shell - 1

- Create File `Shell.tsx`

```
'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { GoGear } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";

export default function Sidebar({ children }: { children: React.ReactNode }) {

    const [mobileMenu, setMobileMenu] = useState(false)

    const links = [
        { name: 'Dashboard', to: '/dashboard', icon: MdOutlineDashboard },
        { name: 'Users', to: '/users', icon: HiOutlineUsers },
        { name: 'Settings', to: '/settings', icon: GoGear },
    ];

    const items = links.map(({ name, to, icon: Icon }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const pathname = usePathname();
        const isActive = pathname.endsWith(to);
        return <Link key={to} href={to} className={cn("px-3 py-2 hover:bg-slate-200 transition-all duration-200 text-sm rounded-sm font-semibold flex items-center gap-x-2", { "bg-slate-200": isActive })}><Icon className="text-xl" /> <span>{name}</span></Link>
    })

    return (
        <div className="h-screen flex flex-col">
            <nav className="border-b flex gap-x-2 items-center px-5 py-3">
                <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu((open) => !open)}>{mobileMenu ? <IoMdClose className="text-2xl" /> : <HiMenuAlt2 className="text-2xl" />}</div>
                <div className="flex items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9">
                        <rect width="256" height="256" fill="none"></rect>
                        <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                        <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                    </svg>
                    <h1 className="font-bold">shadcn/sidebar</h1>
                </div>
            </nav>
            <div className="flex overflow-hidden relative h-full">
                <aside className={cn("w-[300px] h-full border-r p-5 absolute bg-white md:static flex flex-col gap-y-2 transition-all duration-300 ease-in-out overflow-y-auto", { "-left-[300px]": !mobileMenu, "-left-[0px] w-full md:w-[300px]": mobileMenu })}>{items}</aside>

                <main className="flex-1 p-5 overflow-y-auto">{children}</main>
            </div>
        </div>
    )
}
```

- Demo : [Shell-1](https://custom-components-chi.vercel.app/shell/1)
