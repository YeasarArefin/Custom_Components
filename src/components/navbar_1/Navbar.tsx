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