"use client"

import { SupportGroups } from "@/lib/SupportGroups";
import { useContext, useEffect, useState } from "react"
import { SupportContext } from "./SupportBanner";
import Image from "next/image";
import Link from "next/link";

export default function ChooseCause() {
    const { chosenGroup, setChosenGroup } = useContext(SupportContext);
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        setChoices([...SupportGroups]);
    }, []);

    return (
        <div className="">
            <div className="m-3 my-4">
                <div className="rounded-md relative focus-within:ring-2 focus-within:ring-black transition duration-75 ease-out hover:shadow-[inset_0_0_0_2px_#e0e2d9] hover:focus-within:shadow-none cursor-pointer bg-black bg-opacity-5">
                    <div className="flex rounded-[10px] leading-[48px] border-solid border-2 border-transparent">
                        <div className="flex w-full items-center bg-chalk rounded-sm px-3">
                            <div className="relative grow">
                                <select 
                                    className="placeholder-transparent peer px-0 text-sm leading-[48px] placeholder:leading-[48px] rounded-xl block py-5 w-full bg-chalk text-black transition duration-75 ease-out !outline-none bg-transparent pb-2"
                                    onChange={(e)=>setChosenGroup(e.target.value)}
                                >
                                    {chosenGroup !==null && choices.map((opt)=>(
                                        <option value={opt.type} selected={opt.type=== Number(chosenGroup)} key={opt.type}>{opt.caption}</option>
                                    ))}
                                </select>
                                <label
                                    className="absolute pointer-events-none text-sm text-concrete transition-all transform scale-[0.85] left-1 font-semibold origin-[0] top-1 opacity-50 max-w-[calc(100%-16px)] truncate"
                                >
                                    Choose a cause
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {choices[chosenGroup] && <div className="w-full flex sm:flex-row flex-col sm:items-start items-center p-5 gap-4 rounded-lg bg-black bg-opacity-90">
                <div className="rounded-full overflow-hidden h-fit w-fit grid place-items-center">
                    <Image src={"https://linktree.sirv.com/Images/icons/logo.gif"} alt="Logo" className="object-contain h-full" height={150} width={150} />
                </div>
                <div className="text-white text-sm">
                    <p className="font-semibold sm:text-left text-center">{`${choices[chosenGroup].cardTitle}`}</p>
                    <p className="text-white my-1 mr-2 sm:text-left text-center">{`${choices[chosenGroup].cardMessage}`}</p>
                    <p className="mt-2"><span className="opacity-40">Your banner will link to this</span> <Link href={choices[chosenGroup].linkTo} className="text-purple-600 underline">Linktree</Link> </p>
                </div>
            </div>}
        </div>
    );
}