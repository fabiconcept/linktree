'use client'

import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateSocialPosition } from "@/lib/update data/updateSocials";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Position() {
    const [pick, setPick] = useState(0);
    const [hasPicked, setHasPicked] = useState(false);

    const handleUpdatePosition = async() => {
        await updateSocialPosition(pick);
    }

    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { socialPosition } = docSnap.data();
                    setPick(socialPosition ? socialPosition : 0);
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
        handleUpdatePosition();
    }, [pick]);


    return (
        <div className="my-5 grid gap-4 pl-5">
            <div className="cursor-pointer flex items-center gap-3 w-fit" onClick={() => setPick(0)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 0 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span className="opacity-80">Top</span>
                </div>
            </div>
            <div className="cursor-pointer flex gap-3 w-fit" onClick={() => setPick(1)}>
                <div className={`hover:scale-105 active:scale-95 h-6 w-6 bg-black rounded-full relative grid place-items-center bg-opacity-0 ${pick === 1 ? "after:absolute after:h-2 after:w-2 bg-opacity-100 after:bg-white after:rounded-full" : "border"} `}></div>
                <div className="flex items-center text-sm">
                    <span className="opacity-80">bottom</span>
                </div>
            </div>
        </div>
    )
}