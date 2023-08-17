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
    const [themeTextColour, setThemeTextColour] = useState("");
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
                const { displayName, bio: bioText, themeFontColor, themeTextColour } = docSnapshot.data();
                const bio = bioText ? bioText : "";
                setThemeTextColour(themeTextColour ? themeTextColour : "");
                setDisplayName(hasSensitiveContent ? displayName : filterProperly(`${displayName ? displayName : ""}`));
                setThemeFontColor(themeFontColor ? themeFontColor: "");
                setMyBio(hasSensitiveContent ? bio : filterProperly(bio));
            });
        }

        fetchInfo();
    }, [userId, hasSensitiveContent]);

    return (
        <>
            {String(displayName).length > 0 && <span style={{color: `${themeFontColor === "#000" ? themeTextColour: themeFontColor}`}} className="font-semibold text-lg py-2">{displayName.split(" ").length > 1 ? displayName : `@${displayName}`}</span>}
            {String(myBio).length > 0 && <span style={{color: `${themeFontColor === "#000" ? themeTextColour: themeFontColor}`}} className="opacity-80 text-center text-base max-w-[85%]">{myBio}</span>}
        </>
    )
}