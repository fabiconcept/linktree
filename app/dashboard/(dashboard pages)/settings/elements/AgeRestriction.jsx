'use client'

import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateSensitiveType } from "@/lib/update data/updateSocials";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AgeRestriction() {
    const [pick, setPick] = useState(null);

    const handleUpdateType = async() => {
        await updateSensitiveType(pick);
    }

    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { sensitivetype } = docSnap.data();
                    setPick(sensitivetype ? sensitivetype : 3);
                }
            });
        }
        
        fetchTheme();
    }, []);

    useEffect(() => {
        if (pick === null) {
            return;
        }
        
        handleUpdateType();
    }, [pick]);


    return (
        <div className="my-5 grid gap-4">
            <span className="text-sm font-semibold">Please select one:</span>
            <div className="cursor-pointer flex items-center gap-3 w-fit" onClick={() => setPick(0)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 0 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span>18+</span>
                </div>
            </div>
            <div className="cursor-pointer flex gap-3 w-fit" onClick={() => setPick(1)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 1 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span>21+</span>
                </div>
            </div>
            <div className="cursor-pointer flex gap-3 w-fit" onClick={() => setPick(2)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 2 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span>25+</span>
                </div>
            </div>
            <div className="cursor-pointer flex gap-3 w-fit" onClick={() => setPick(3)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 3 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span>Sensitive Content</span>
                </div>
            </div>
        </div>
    )
}