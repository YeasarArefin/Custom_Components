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
npm i react-icons
```

```sh $
npm i react-icons
```

```sh $
npm i lucid-react
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

## Shell - 2

- Create File `Shell.tsx`

```
import {
    Bell,
    CircleUser,
    Menu,
    Package2,
    Search
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GoGear } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

export const description =
    "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";


const links = [
    { name: 'Dashboard', to: '/dashboard', icon: MdOutlineDashboard },
    { name: 'Users', to: '/users', icon: HiOutlineUsers },
    { name: 'Settings', to: '/settings', icon: GoGear },
];

const navigation = links.map(({ name, to, icon: Icon }) => (
    <Link
        key={name}
        href={to}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
        <Icon className="h-4 w-4" />
        {name}
    </Link>
));

export default function Shell_2({ children }: { children: React.ReactNode; }) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Acme Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navigation}
                        </nav>
                    </div>
                    {/* <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support
                                    team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                {navigation}
                            </nav>
                            <div className="mt-auto">
                                {/* <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card> */}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
```

- Demo : [Shell-2](https://custom-components-chi.vercel.app/shell/2)
