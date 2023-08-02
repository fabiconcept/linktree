"use client"

import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react"

export default function UserInfo({userId}) {
    const [displayName, setDisplayName] = useState("");
    const [themeFontColor, setThemeFontColor] = useState("");
    const [myBio, setMyBio] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchInfo() {
            const currentUser = await fetchUserData(userId);

            if (!currentUser) {
                router.push("/");
                return;
            }

            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnapshot) => {
                if (!docSnapshot.exists()) {
                    return;
                }
                const { displayName, bio: bioText, themeFontColor } = docSnapshot.data();
                const bio = bioText ? bioText : "";
                setDisplayName(displayName);
                setThemeFontColor(themeFontColor ? themeFontColor: "");
                setMyBio(bio);
            });
        }

        fetchInfo();
    }, []);

    return (
        <>
            {displayName && <span style={{color: `${themeFontColor}`}} className="font-semibold sm:text-lg text-base py-2">@{displayName}</span>}
            {myBio && <span style={{color: `${themeFontColor}`}} className="opacity-60 text-center text-sm max-w-[80%]">{myBio}</span>}
        </>
    )
}