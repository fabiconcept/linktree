"use client"
import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateTheme } from "@/lib/update data/updateTheme";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function ThemeCard({ type, pic, text }) {
    const [isSelectedTheme, setIsSelectedTheme] = useState(false);
    const [themeColor, setThemeColor] = useState("");

    const handleUpdateTheme = async() => {
        await updateTheme(text ? text : "Custom", themeColor);
    }

    useEffect(() => {
        switch (text) {
            case 'Lake Black':
                setThemeColor("#fff");
                break;
            case 'Starry Night':
                setThemeColor("#fff");
                break;
            case '3D Blocks':
                setThemeColor("#fff");
                break;
        
            default:
                setThemeColor("#000");
                break;
        }
    }, [text]);
    
    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { selectedTheme } = docSnap.data();
                    setIsSelectedTheme(selectedTheme === text);
                }
            });
        }
        
        fetchTheme();
    }, [text]);

    return (
        <>
            <div className={`min-w-[8rem] flex-1 items-center flex flex-col group`} onClick={handleUpdateTheme}>
                {type !== 1 ?
                    <>
                        <div className="w-full h-[13rem] border border-dashed rounded-lg relative group-hover:bg-black group-hover:bg-opacity-[0.05] border-black grid place-items-center cursor-pointer">
                            <span className="uppercase max-w-[5rem] sm:text-xl text-base text-center">
                                Create Your Own
                            </span>
                            {isSelectedTheme && <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-[0.5] grid place-items-center z-10 text-white text-xl">
                                <FaCheck />
                            </div>}
                        </div>
                        <span className="py-3 text-sm">Custom</span>
                    </>
                    :
                    <>
                        <div className="w-full h-[13rem] border rounded-lg group-hover:scale-105 relative group-active:scale-90 grid place-items-center cursor-pointer overflow-hidden">
                            <Image src={pic} alt="bg-image" height={1000} width={1000} className="min-w-full h-full object-cover" />
                            {isSelectedTheme && <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-[0.5] grid place-items-center z-10 text-white text-xl">
                                <FaCheck />
                            </div>}
                        </div>
                        <span className="py-3 text-sm">{text}</span>
                    </>
                }
            </div>
        </>
    );
}