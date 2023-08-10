"use client"
import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function ProfilePic({userId}) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [hasProfilePic, setHasProfilePic] = useState(false);

    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName } = docSnap.data();

                    if (profilePhoto !== '') {
                        setProfilePicture(
                            <Image
                                src={`${profilePhoto}`}
                                alt="profile"
                                height={1000}
                                width={1000}
                                className="min-w-full h-full object-contain pointer-events-none"
                                priority
                            />
                        );

                        setHasProfilePic(true);
                    } else {
                        setHasProfilePic(false);
                        setProfilePicture(
                            <div className="h-[95%] aspect-square w-[95%] rounded-full bg-gray-300 border grid place-items-center">
                                <span className="text-3xl font-semibold uppercase">
                                    {displayName === '' ? "" :displayName.split('')[0]}
                                </span>
                            </div>
                        );
                    }
                }
            });
        }
        fetchProfilePicture();
    }, [userId]);
    
    return (
        <div className={`min-h-[6rem] w-[6rem] mb-2 rounded-full overflow-hidden ${hasProfilePic ? '' : 'bg-white border'} grid place-items-center pointer-events-none select-none`}>
            {profilePicture}
        </div>
    )
}
