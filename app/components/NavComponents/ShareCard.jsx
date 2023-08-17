"use client"

import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../General Components/NavBar";
import Image from "next/image";
import ShareLiElement from "./elements/ShareLiElement";
import { ShareTo, addSocials, homePage, socialPage } from "@/lib/ShareCardArrays";
import MLink from "./elements/MLink";
import MyQrCode from "./elements/MyQrCode";

export const ShareContext = React.createContext();

export default function ShareCard() {
    const [currentPage, setCurrentPage] = useState([{ page: "home" }]);
    const {
        showShareCard,
        setShowShareCard,
        myLink,
    } = useContext(NavContext);

    useEffect(() => {
        setCurrentPage([{ page: "home" }]);
    }, [showShareCard]);

    const handleClose = () => {
        setShowShareCard(false);
    }

    const handleBack = () =>{
        setCurrentPage(currentPage.slice(0, -1));
    }

    return (
        <ShareContext.Provider value={{ currentPage, setCurrentPage, myLink }}>
            <div className="absolute -right-4 w-fit h-fit -translate-y-[5px] px-4 pt-2 pb-5 overflow-hidden navCard">
                <div
                    className={`sm:w-[365px] w-[310px] bg-white rounded-3xl border-b flex flex-col gap-2 border-l p-2 border-r text-sm max-h-[70vh] overflow-y-auto ${showShareCard ? "enterCard" : "leaveCard"}`}
                    style={{ boxShadow: `0 5px 25px 1px rgba(0, 0, 0, .05)` }}
                >
                    {currentPage[currentPage.length - 1].page === "home" && <>
                        <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                            {currentPage[currentPage.length - 1].page === "home" ? <span></span> : <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="rotate-90" alt="x" width={15} height={15} /></div>}
                            <span className="font-semibold text-center">Share your Linktree</span>
                            <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                        </div>
                        <p className="text-sm opacity-50 px-3">Get more visitors by sharing your Linktree everywhere.</p>
                        <div className="grid my-3">
                            {homePage.map((page) => (
                                <ShareLiElement nextPage={page.nextPage} key={page.nextPage}>
                                    <div className="flex-1 flex gap-3 items-center">
                                        <Image src={page.icon} priority alt="x" width={60} height={60} />
                                        <span className="font-semibold">{page.title}</span>
                                    </div>
                                    <Image
                                        src={page.arrowIcon}
                                        className={`${page.arrowIcon === "https://linktree.sirv.com/Images/icons/arrow.svg" ? "-rotate-90" : ""} mr-2`}
                                        alt="x"
                                        width={18}
                                        height={18}
                                    />
                                </ShareLiElement>
                            ))
                            }
                        </div>
                        <MLink myUrl={myLink} />
                    </>}

                    {currentPage[currentPage.length - 1].page === "addSocials" && <>
                        <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                            {currentPage[currentPage.length - 1].page === "home" ? <span></span> : <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="rotate-90" alt="x" width={15} height={15} /></div>}
                            <span className="font-semibold text-center">{homePage[0].title}</span>
                            <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                        </div>
                        <p className="text-sm opacity-50 px-3">{homePage[0].p}</p>
                        <div className="w-full px-3 my-2">
                            <Image priority src={"https://linktree.sirv.com/Images/icons/socials-hero.png"} alt="banner" width={1024} height={576} className="w-full object-contain" />
                        </div>
                        <div className="grid my-3">
                            {addSocials.map((page, index) => (
                                <ShareLiElement nextPage={{page:page.nextPage, index:index}} key={index}>
                                    <div className="flex-1 flex gap-3 items-center">
                                        <Image src={page.icon} alt="x" width={60} height={60} priority />
                                        <span className="font-semibold">{page.title}</span>
                                    </div>
                                    <Image
                                        src={page.arrowIcon}
                                        className={`${page.arrowIcon === "https://linktree.sirv.com/Images/icons/arrow.svg" ? "-rotate-90" : ""} mr-2`}
                                        alt="x"
                                        width={18}
                                        height={18}
                                    />
                                </ShareLiElement>
                            ))
                            }
                        </div>
                    </>}

                    {currentPage[currentPage.length - 1].page === "ShareTo" && <>
                        <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                            {currentPage[currentPage.length - 1].page === "home" ? <span></span> : <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="rotate-90" alt="x" width={15} height={15} /></div>}
                            <span className="font-semibold text-center">{homePage[1].title}</span>
                            <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                        </div>
                        <p className="text-sm opacity-50 px-3">{homePage[1].p}</p>
                        <div className="grid my-3">
                            {ShareTo.map((page, index) => (
                                <ShareLiElement nextPage={page.nextPage} key={index}>
                                    <div className="flex-1 flex gap-3 items-center">
                                        <Image src={page.icon} alt="x" width={60} height={60} />
                                        <span className="font-semibold">{page.title}</span>
                                    </div>
                                    <Image
                                        src={page.arrowIcon}
                                        className={`${page.arrowIcon === "https://linktree.sirv.com/Images/icons/arrow.svg" ? "-rotate-90" : ""} mr-2`}
                                        alt="x"
                                        width={18}
                                        height={18}
                                    />
                                </ShareLiElement>
                            ))
                            }
                        </div>
                        <MLink myUrl={myLink} />
                    </>}

                    {currentPage[currentPage.length - 1].page === "myQRCode" && <>
                        <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                            {currentPage[currentPage.length - 1].page === "home" ? <span></span> : <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="rotate-90" alt="x" width={15} height={15} /></div>}
                            <span className="font-semibold text-center">{homePage[2].title}</span>
                            <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                        </div>
                        <p className="text-sm opacity-50 px-3">{homePage[2].p}</p>
                        <div className="grid my-3 w-full">
                            <MyQrCode url={myLink} />
                        </div>
                    </>}

                    {currentPage.length === 3 && <>
                        <div className="grid grid-cols-[32px_auto_32px] items-center p-3">
                            {currentPage[currentPage.length - 1].page === "home" ? <span></span> : <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="rotate-90" alt="x" width={15} height={15} /></div>}
                            <span className="font-semibold text-center">{socialPage[currentPage[currentPage.length - 1].page?.index].title}</span>
                            <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                        </div>
                        <p className="text-sm opacity-50 px-3">{socialPage[currentPage[currentPage.length - 1].page?.index].description}</p>
                        <div className="w-full px-3 my-2">
                            <Image priority src={socialPage[currentPage[currentPage.length - 1].page?.index].bannerImg} alt="banner" width={1024} height={576} className="w-full object-contain" />
                        </div>
                        <MLink myUrl={myLink} />
                        <ShareLiElement nextPage={{type: socialPage[currentPage[currentPage.length - 1].page?.index].nextPage, goTo: socialPage[currentPage[currentPage.length - 1].page?.index].externalShare}}>
                            <div className="flex-1 flex gap-3 items-center">
                                <Image priority src={socialPage[currentPage[currentPage.length - 1].page?.index].icon} alt="x" width={60} height={60} />
                                <span className="font-semibold">{socialPage[currentPage[currentPage.length - 1].page?.index].title}</span>
                            </div>
                            <Image
                                src={"https://linktree.sirv.com/Images/icons/arrow.svg"}
                                className={`-rotate-90 mr-2`}
                                alt="icon"
                                width={18}
                                height={18}
                                priority
                            />
                        </ShareLiElement>
                    </>}
                </div>
            </div>
        </ShareContext.Provider>
    )
}