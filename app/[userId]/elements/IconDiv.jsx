"use client"
import { baseUrlIcons } from "@/lib/BrandLinks";
import { makeValidUrl } from "@/lib/utilities";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function IconDiv({url}) {
    const [iconToDisplay, setIconToDisplay] = useState("https://linktree.sirv.com/Images/brands/tiktok.svg");

    function getRootNameFromUrl(url) {
        try {
            const urlObj = new URL(makeValidUrl(url));
            const rootName = urlObj.hostname;
            return rootName;
        } catch (error) {
            console.log(error.message, url);
            throw new Error(error);
        }
    }

    function getIconUrlFromBaseUrl(baseUrl) {
        return baseUrlIcons[baseUrl.toLowerCase()] || 'https://linktree.sirv.com/Images/brands/link-svgrepo-com.svg';
    }
      
    useEffect(() => {
        const rootName = getRootNameFromUrl(url);
        setIconToDisplay(getIconUrlFromBaseUrl(rootName));
    }, [url]);

    return (
        <div className="h-[2rem] w-fit rounded-lg p-[2px] bg-white aspect-square">
            <Image src={iconToDisplay} alt="link Icon" height={50} width={50} className="object-fit h-full aspect-square" />
        </div>
    );
}