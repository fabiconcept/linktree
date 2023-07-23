"use client"

import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateThemeGradientDirection } from "@/lib/update data/updateTheme";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

export default function GradientPicker() {
    const [pick, setPick] = useState(0);
    const [hasPicked, setHasPicked] = useState(false);

    const handleUpdateTheme = async() => {
        await updateThemeGradientDirection(pick);
    }

    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { gradientDirection } = docSnap.data();
                    setPick(gradientDirection ? gradientDirection : 0);
                }
            });
        }
        
        fetchTheme();
    }, []);

    useEffect(() => {
        if (!hasPicked) {
            setHasPicked(true);
            return;
        }
        handleUpdateTheme();
    }, [pick]);

    return (
        <div className="my-4 grid gap-3">
            <div className="cursor-pointer flex items-center gap-3 w-fit" onClick={()=>setPick(0)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 0 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <div className="h-8 w-8 rounded-lg mr-3" style={{ backgroundImage: 'linear-gradient(to bottom, #fff, rgba(0, 0, 0, 0.75))' }}></div>
                    <span className="opacity-80">Gradient up</span>
                </div>
            </div>
            <div className="cursor-pointer flex gap-3 w-fit" onClick={()=>setPick(1)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 1 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <div className="h-8 w-8 rounded-lg mr-3" style={{ backgroundImage: 'linear-gradient(to top, #fff, rgba(0, 0, 0, 0.75))' }}></div>                
                    <span className="opacity-80">Gradient up</span>
                </div>
            </div>
        </div>
    )
}