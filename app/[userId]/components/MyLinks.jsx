"use client"

import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import Button from "../elements/Button";
import { useRouter } from "next/navigation";

export default function MyLinks({ userId }) {
    const [myLinksArray, setMyLinksArray] = useState([]);
    const [displayLinks, setDisplayLinks] = useState([]);
    const [themeFontColor, setThemeFontColor] = useState("");
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
                const { links, themeFontColor } = docSnapshot.data();
                const rtLinks = links ? links : [];
                setMyLinksArray(rtLinks);
                setThemeFontColor(themeFontColor ? themeFontColor : "");
            });
        }

        fetchInfo();
    }, []);

    useEffect(() => {
        setDisplayLinks(
            myLinksArray.filter((link) => link.isActive !== false)
        );
    }, [myLinksArray]);
    return (
        <div className="flex-1 flex flex-col gap-5 my-4 w-full px-5 py-1 items-center">
            {displayLinks.map((link) => {
                if (link.type === 0) {
                    return (<span style={{color: `${themeFontColor}`}} className="mx-auto font-semibold text-sm mt-4">{link.title}</span>)
                }else{
                    return (<Button key={link.id} content={link.title} url={link.url} userId={userId} />)
                }
            })}
        </div>
    )
}