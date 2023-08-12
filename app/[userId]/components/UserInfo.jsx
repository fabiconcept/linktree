"use client"

import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { filterProperly } from "@/lib/utilities";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function UserInfo({userId, hasSensitiveContent}) {
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
                setDisplayName(hasSensitiveContent ? displayName : filterProperly(`${displayName ? displayName : ""}`));
                setThemeFontColor(themeFontColor ? themeFontColor: "");
                setMyBio(hasSensitiveContent ? bio : filterProperly(bio));
            });
        }

        fetchInfo();
    }, [userId, hasSensitiveContent]);

    return (
        <>
            {String(displayName).length > 0 && <span style={{color: `${themeFontColor}`}} className="font-semibold sm:text-lg text-base py-2">@{displayName}</span>}
            {String(myBio).length > 0 && <span style={{color: `${themeFontColor}`}} className="opacity-80 text-center text-sm max-w-[80%]">{myBio}</span>}
        </>
    )
}