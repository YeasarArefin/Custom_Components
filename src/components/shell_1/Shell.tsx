"use client"
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