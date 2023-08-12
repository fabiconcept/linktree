"use client"
import React, { useEffect, useState } from "react";
import FontsGallery from "../components/FontsGallery";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { availableFonts_Classic } from "@/lib/FontsList";

export const selectedFontContext = React.createContext();
export default function SelectFonts() {
    const [openFontGallery, setOpenFontGallery] = useState(false);
    const [selectedFont, setSelectedFont] = useState("");
    
    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { fontType } = docSnap.data();
                    const fontName = availableFonts_Classic[fontType ? fontType-1 : 0]
                    setSelectedFont(fontName);
                }
            });
        }
        
        fetchTheme(); 
    }, []);
    
    return (
        <selectedFontContext.Provider value={{openFontGallery, setOpenFontGallery}}>
            <div className={`${selectedFont.class} w-full my-4 group rounded-lg py-5 px-4 border shadow-lg flex items-center gap-4 cursor-pointer hover:bg-black hover:bg-opacity-10 active:scale-95`} onClick={()=>setOpenFontGallery(true)}>
                <span className="p-3 rounded-md group-hover:bg-white group-hover:bg-opacity-100 bg-black bg-opacity-10 text-xl font-semibold">Aa</span>
                <span className="font-semibold flex-1 truncate">
                    {selectedFont.name}
                </span>
            </div>
            {openFontGallery && <FontsGallery />}
        </selectedFontContext.Provider>
    );
}