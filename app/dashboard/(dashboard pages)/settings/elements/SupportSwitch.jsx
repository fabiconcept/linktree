"use client"

import { useContext, useState } from "react";
import { SupportContext } from "../components/SupportBanner";

export default function SupportSwitch() {
    const { showSupport, setShowSupport } = useContext(SupportContext);

    const handleCheckboxChange = (event) => {
        const checkedStatus = event.target.checked;
        setShowSupport(checkedStatus);
    };

    return (
        <section className="flex gap-3">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">Show your support</span>
                <span className="opacity-70 sm:text-base text-sm">Show your support for important causes with a profile banner. Only one banner can be active at a time.</span>
            </div>
            <div>
                <label className="cursor-pointer relative flex justify-between items-center group p-2 text-xl">
                    <input type="checkbox" onChange={handleCheckboxChange} checked={showSupport} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                    <span className="cursor-pointer w-9 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-[2px]"></span>
                </label>
            </div>
        </section>
    );
}