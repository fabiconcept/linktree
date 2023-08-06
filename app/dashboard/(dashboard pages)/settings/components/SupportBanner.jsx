"use client"
import Image from "next/image";
import SupportSwitch from "../elements/SupportSwitch";
import React, { useState } from "react";

export const SupportContext = React.createContext();
export default function SupportBanner() {
    const [showSupport, setShowSupport] = useState(false);

    return (
        <SupportContext.Provider value={{ showSupport, setShowSupport }}>
            <div className="w-full my-4 px-2" id="Settings--SupportBanner">
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
                    <SupportSwitch />
                </div>
            </div>
        </SupportContext.Provider>
    )
}