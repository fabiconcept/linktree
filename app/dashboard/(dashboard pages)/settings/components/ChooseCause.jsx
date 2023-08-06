"use client"

import { useState } from "react"

export default function ChooseCause() {
    const [] = useState([])
    return (
        <div className="">
            <div className="mx-5">
                <div className="rounded-[10px] relative focus-within:ring-2 focus-within:ring-black transition duration-75 ease-out hover:shadow-[inset_0_0_0_2px_#e0e2d9] hover:focus-within:shadow-none bg-black bg-opacity-[0.025]">
                    <div className="flex rounded-[10px] leading-[48px] border-solid border-2 border-transparent">
                        <div className="flex w-full items-center bg-chalk rounded-sm px-3">
                            <div className=""><Image src={"https://linktree.sirv.com/Images/icons/Search%20Icon.svg"} alt="x" width={30} height={30} /></div>
                            <div className="relative grow">
                                <select 
                                    className="placeholder-transparent peer px-0 text-base leading-[48px] placeholder:leading-[48px] rounded-xl block py-1 w-full bg-chalk text-black transition duration-75 ease-out !outline-none bg-transparent"
                                ></select>
                                <label
                                    className="absolute pointer-events-none text-sm text-concrete transition-all transform -translate-y-2.5 scale-[0.85] top-[13px] origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:tracking-normal peer-focus:scale-[0.85] peer-focus:-translate-y-2.5 max-w-[calc(100%-16px)] truncate"
                                >
                                    Search
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}