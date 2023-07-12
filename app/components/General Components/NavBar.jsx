"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
    const router = usePathname();
    const [activePage, setActivePage] = useState();

    useEffect(()=>{
        switch (router) {
            case "/dashboard":
                setActivePage(0);
                break;
            case "/dashboard/appearance":
                setActivePage(1);
                break;
            case "/dashboard/analytics":
                setActivePage(2);
                break;
            case "/dashboard/settings":
                setActivePage(3);
                break;
            default:
                setActivePage(0);
                break;
        }
    }, [router]);
    return (
        <div className="w-full justify-between flex items-center rounded-[3rem] py-3 sticky top-0 z-[9999999999] px-6 mx-auto bg-white border backdrop-blur-lg">
            <div className="flex items-center gap-8">
                <Link href={"/"}>
                    <Image src={"https://linktree.sirv.com/Images/logo-icon.svg"} alt="logo" height={23} width={23} className="" />
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href={'/'} className={`flex items-center gap-2 text-sm font-semibold ${activePage === 0 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                        <Image src={"https://linktree.sirv.com/Images/icons/links.svg"} alt="links" height={15} width={15} />
                        Links
                    </Link>
                    <Link href={'/dashboard/appearance'} className={`flex items-center gap-2 text-sm font-semibold ${activePage === 1 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                        <Image src={"https://linktree.sirv.com/Images/icons/appearance.svg"} alt="links" height={15} width={15} />
                        Appearance
                    </Link>
                    <Link href={'/'} className={`flex items-center gap-2 text-sm font-semibold ${activePage === 2 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                        <Image src={"https://linktree.sirv.com/Images/icons/analytics.svg"} alt="links" height={15} width={15} />
                        analytics
                    </Link>
                    <Link href={'/'} className={`flex items-center gap-2 text-sm font-semibold ${activePage === 3 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                        <Image src={"https://linktree.sirv.com/Images/icons/setting.svg"} alt="links" height={15} width={15} />
                        settings
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-3 flex items-center gap-2 rounded-3xl border cursor-pointer hover:bg-gray-100 active:scale-90">
                    <Image src={"https://linktree.sirv.com/Images/icons/share.svg"} alt="links" height={15} width={15} />
                </div>
                <div className="grid place-items-center p-[2px] rounded-full border h-[2.5rem] w-[2.5rem] cursor-pointer hover:scale-110 active:scale-95">
                    <div className="h-full w-full bg-gray-100 grid place-items-center rounded-full">F</div>
                </div>
            </div>
        </div>
    );
}