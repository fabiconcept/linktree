"use client"
import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function BgDiv() {
    const [backgroundPicture, setBackgroundPicture] = useState(null);

    useEffect(() => {
        function fetchProfilePicture() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName } = docSnap.data();

                    if (profilePhoto !== '') {
                        setBackgroundPicture(
                            <Image
                                src={`${profilePhoto}`}
                                alt="profile"
                                height={1000}
                                width={1000}
                                className="min-w-full h-full object-cover scale-[1.25]"
                                priority
                            />
                        );
                    } else {
                        setBackgroundPicture(
                            <div className="h-full aspect-square w-full bg-gray-300 border grid place-items-center">
                                <span className="text-3xl font-semibold uppercase">
                                    {displayName === '' ? "" : displayName.split('')[0]}
                                </span>
                            </div>
                        );
                    }
                }
            });
        }
        fetchProfilePicture();
    }, []);
    return (
        <div className="fixed h-screen w-screen z-0 top-0 left-0 opacity-70 overflow-hidden">
            {backgroundPicture}
        </div>
    )
}
