"use client"
import Image from "next/image";
import { useState } from "react";

export default function MLink({myUrl}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (myUrl) {
            navigator.clipboard.writeText(myUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex items-center justify-between mx-3 mb-3 p-4 border gap-4 rounded-md hover:bg-black hover:bg-opacity-5 cursor-pointer active:scale-90" onClick={handleCopy}>
            <Image
                src={"https://linktree.sirv.com/Images/icons/Linktree%20Logo-2.svg"}
                alt="logo"
                width={24}
                height={24}
            />
            <span className="flex-1 text-sm w-[13rem] truncate">{myUrl}</span>
            <span className={`${copied ? "text-green-700" : "text-black"}`}>
                {copied ? "Copied" : "Copy"}
            </span>
        </div>
    )
}