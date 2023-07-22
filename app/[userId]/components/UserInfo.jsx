"use client"

import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react"

export default function UserInfo({userId}) {
    const [displayName, setDisplayName] = useState("");
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
                const { displayName, bio: bioText } = docSnapshot.data();
                const bio = bioText ? bioText : "";
                setDisplayName(displayName);
                setMyBio(bio);
            });
        }

        fetchInfo();
    }, []);

    return (
        <>
            <span className="font-semibold text-lg py-2">@{displayName}</span>
            <span className="opacity-60 text-center max-w-[80%]">{myBio}</span>
        </>
    )
}