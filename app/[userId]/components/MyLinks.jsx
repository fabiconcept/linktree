"use client"

import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import Button from "../elements/Button";
import { useRouter } from "next/navigation";
import Socials from "../elements/Socials";
import Filter from "bad-words";

export default function MyLinks({ userId, hasSensitiveContent }) {
    const [myLinksArray, setMyLinksArray] = useState([]);
    const [displayLinks, setDisplayLinks] = useState([]);
    const [socialArray, setSocialArray] = useState([]);
    const [socialPosition, setSocialPosition] = useState(null);
    const [themeFontColor, setThemeFontColor] = useState("");
    const [supportGroupStatus, setSupportGroupStatus] = useState(false);
    const router = useRouter();
    const filter = new Filter();

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
                const { links, themeFontColor, socials, socialPosition, supportBannerStatus } = docSnapshot.data();
                setSupportGroupStatus(supportBannerStatus);
                const rtLinks = links ? links : [];
                setSocialArray(socials ? socials : []);
                setMyLinksArray(rtLinks);
                setSocialPosition(socialPosition ? socialPosition : 0);
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
        <div className={`flex flex-col gap-4 my-4 w-full px-5 py-1 items-center max-h-fit ${supportGroupStatus ? "pb-12" : ""}`}>
            {socialPosition === 0 && socialArray.length > 0 && <Socials themeFontColor={themeFontColor} socialArray={socialArray} />}
            {displayLinks.map((link) => {
                if (link.type === 0) {
                    return (<span style={{color: `${themeFontColor}`}} className="mx-auto font-semibold text-sm mt-2">{hasSensitiveContent ? link.title : filter.clean(link.title)}</span>);
                }else{
                    return (<Button key={link.id} content={hasSensitiveContent ? link.title : filter.clean(link.title)} url={link.url} userId={userId} />);
                }
            })}
            {socialPosition === 1 && socialArray.length > 0 && <Socials themeFontColor={themeFontColor} socialArray={socialArray} />}
        </div>
    )
}