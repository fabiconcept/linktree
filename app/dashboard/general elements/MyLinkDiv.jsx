"use client"
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyLinkDiv() {
    const [myUrl, setMyUrl] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (myUrl) {
            navigator.clipboard.writeText(myUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        async function fetchLinks() {
            const currentUser = testForActiveSession();
            const userName = await fetchUserData(currentUser);
            const { username } = userName;
            setMyUrl(`https://mylinks.fabiconcept.online/${username}`);
        }

        fetchLinks();
    }, []);

    return (
        <>
            {myUrl && <div className="w-full p-3 rounded-3xl border-b bg-white mb-4 flex justify-between items-center sticky top-0 z-10">
                <span className="text-sm flex">
                    <span className="font-semibold sm:block hidden">
                        Your Linktree is live:
                    </span>
                    <Link
                        href={`${myUrl}`}
                        target="_blank"
                        className="underline ml-2 w-[10rem] truncate"
                    >{myUrl}</Link>
                </span>
                <div
                    className={`font-semibold sm:text-base text-sm py-3 px-4 rounded-3xl border cursor-pointer hover:bg-black hover:bg-opacity-5 active:scale-90 ${copied ? "text-green-600" : ""}`}
                    onClick={handleCopy}
                >
                    {copied ? "Copied!" : "Copy URL"}
                </div>
            </div>}
        </>
    );
}