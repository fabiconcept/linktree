"use client"
import React, { useState } from "react";
import FontsGallery from "../components/FontsGallery";

export const selectedFontContext = React.createContext();
export default function SelectFonts() {
    const [openFontGallery, setOpenFontGallery] = useState(false);
    return (
        <selectedFontContext.Provider value={{openFontGallery, setOpenFontGallery}}>
            <div className="w-full my-4 group rounded-lg py-5 px-4 border shadow-lg flex items-center gap-4 cursor-pointer hover:bg-black hover:bg-opacity-10 active:scale-95" onClick={()=>setOpenFontGallery(true)}>
                <span className="p-3 rounded-md group-hover:bg-white group-hover:bg-opacity-100 bg-black bg-opacity-10 text-xl font-semibold">Aa</span>
                <span className="font-semibold flex-1 truncate">
                    DM Sans
                </span>
            </div>
            {openFontGallery && <FontsGallery />}
        </selectedFontContext.Provider>
    );
}