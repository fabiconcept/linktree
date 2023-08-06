"use client"
import Image from "next/image";
import SocialCard from "./mini components/SocialCard";
import { useState } from "react";
import React from "react";

export const SocialContext = React.createContext();

export default function SocialSetting() {
    const [socialsArray, setSocialsArray] = useState([
        { id: "8f0033b8-ccd7-5762-a26b-666536f93ff8", type: 0 },
        { id: "59e6a60e-a396-566a-8d22-22ccb3b6431e", type: 1 },
    ]);
    return (
        <SocialContext.Provider value={{ setSocialsArray }}>
            <div className="w-full my-4 px-2" id="Settings--SocialLinks">
                <div className="flex items-center gap-3 py-4">
                    <Image
                        src={"https://linktree.sirv.com/Images/icons/social.svg"}
                        alt="icon"
                        height={24}
                        width={24}
                    />
                    <span className="text-xl font-semibold">Social Icons</span>
                </div>
                <div className="p-5 bg-white rounded-lg">
                    <div className="grid gap-1">
                        <span className="font-semibold">Be iconic</span>
                        <span className="opacity-90">Add icons linking to your social profiles, email and more.</span>
                    </div>
                    <div className="w-fit rounded-3xl bg-btnPrimary hover:bg-btnPrimaryAlt text-white py-3 px-4 my-6 cursor-pointer active:scale-90 select-none">Add Icon</div>
                    <SocialCard array={socialsArray} />
                </div>
            </div>
        </SocialContext.Provider>
    );
}