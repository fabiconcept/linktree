"use client"
import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateThemeBackground } from "@/lib/update data/updateTheme";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { backgroundContext } from "../components/Backgrounds";

export default function BackgroundCard({ text, colorValue, backImg }) {
    const { setIsGradient } = useContext(backgroundContext);
    const [isSelected, setIsSelected] = useState(false);

    const handleUpdateTheme = async() => {
        await updateThemeBackground(text);
    }

    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { backgroundType } = docSnap.data();
                    setIsGradient(backgroundType === "Gradient");
                    setIsSelected(backgroundType === text);
                }
            });
        }
        
        fetchTheme();
    }, []);
    return (
        <div className="min-w-[8rem] flex-1 items-center flex flex-col group" onClick={handleUpdateTheme}> 
            <div className={`w-full h-[13rem] relative ${!colorValue && !backImg ? "border-dashed border-black" : ""} border rounded-lg group-hover:scale-105 group-active:scale-90 grid place-items-center cursor-pointer overflow-hidden`}>
                {isSelected && <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-[0.5] grid place-items-center z-10 text-white text-xl">
                    <FaCheck />
                </div>}
                {colorValue ?
                    <div className="h-full w-full" style={{ backgroundColor: `${colorValue}` }}></div>
                    :
                backImg ?
                    <div className="h-full w-full bg-cover bg-no-repeat"
                        style={{ backgroundImage: `${backImg}` }}>
                    </div>
                    :
                    <div className="h-full w-full grid place-items-center">
                        <div className="bg-black bg-opacity-[0.1] rounded-lg p-1">
                            <Image src={"https://linktree.sirv.com/Images/icons/image.svg"} alt={text} height={27} width={27} />
                        </div>
                    </div>
                }
            </div>
            <span className="py-3 text-sm">{text}</span>
        </div>
    )
}