"use client"

import { useContext, useState } from "react";
import { NavContext } from "../General Components/NavBar";
import Image from "next/image";
import ShareLiElement from "./elements/ShareLiElement";
import { homePage } from "@/lib/ShareCardArrays";

export default function ShareCard() {
    const [currentPage, setCurrentPage] = useState([{page: "home"}]);

    const {
        showShareCard,
        setShowShareCard,
        myLink,
    } = useContext(NavContext);

    const handleClose = () =>{
        setShowShareCard(false);
    }

    return (
        <div className="absolute -right-4 sm:w-fit w-0 -translate-y-[5px] px-4 pt-2 pb-5 overflow-hidden">
            <div
                className={`w-[365px] bg-white rounded-3xl border-b flex flex-col gap-2 border-l p-2 border-r text-sm ${showShareCard ? "enterCard" : "leaveCard"}`}
                style={{ boxShadow: `0 5px 25px 1px rgba(0, 0, 0, .05)` }}
            >
                <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                    <span></span>
                    <span className="font-semibold text-center">Share your Linktree</span>
                    <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                </div>
                <p className="text-sm opacity-50 px-3">Get more visitors by sharing your Linktree everywhere.</p>
                <div className="grid my-5">
                    {currentPage[currentPage.length-1].page === "home" && homePage.map((page) => (
                        <ShareLiElement nextPage={"nextPage"}>
                            <div className="flex-1 flex gap-3 items-center">
                                <Image src={page.icon} alt="x" width={60} height={60} />
                                <span className="font-semibold">{page.title}</span>
                            </div>
                            <Image 
                                src={page.arrowIcon} 
                                className={`${page.arrowIcon ==="https://linktree.sirv.com/Images/icons/arrow.svg" ? "-rotate-90": ""}`}
                                alt="x" 
                                width={15} 
                                height={15} 
                            />
                        </ShareLiElement>
                    ))}
                </div>
            </div>
        </div>
    )
}