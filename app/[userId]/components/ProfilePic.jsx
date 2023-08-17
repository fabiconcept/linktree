"use client"
import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Head from "next/head";

export default function ProfilePic({userId}) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [hasProfilePic, setHasProfilePic] = useState(false);
    const [isElementVisible, setIsElementVisible] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const profilePicRef = useRef();

    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName } = docSnap.data();

                    setProfileImageUrl(profilePhoto)

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

    const intersectionCallback = (entries) => {
        const entry = entries[0];
        setIsElementVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, {
            threshold: 0.5,
        });

        if (profilePicRef.current) {
            observer.observe(profilePicRef.current);
        }

        return () => {
            if (profilePicRef.current) {
                observer.unobserve(profilePicRef.current);
            }
        };
    }, [profilePicRef]);
    
    return (
        <>
            {profileImageUrl && <Head>
                <meta property="og:image" content={`${profileImageUrl}`} />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="300" />
                <meta name="twitter:image" content={`${profileImageUrl}`} />
                <meta name="twitter:image:width" content="300" />
                <meta name="twitter:image:height" content="300" />
            </Head>}
            {isElementVisible !== null && !isElementVisible && <div className="fixed z-[300] md:w-[50rem] w-[calc(100%-1rem)] flex flex-col items-center p-2 rounded-[3rem] border bg-white bg-opacity-10 backdrop-blur-[10px] top-2 left-1/2 -translate-x-1/2">
                <div ref={profilePicRef} className={`min-h-[3rem] w-[3rem] sm:min-h-[4rem] sm:w-[4rem] rounded-full overflow-hidden ${hasProfilePic ? '' : 'bg-white border'} grid place-items-center pointer-events-none select-none`}>
                    {profilePicture}
                </div>
            </div>}
            <div ref={profilePicRef} className={`min-h-[5rem] w-[5rem] sm:min-h-[6rem] sm:w-[6rem] mb-2 rounded-full overflow-hidden ${hasProfilePic ? '' : 'bg-white border'} grid place-items-center pointer-events-none select-none`}>
                {profilePicture}
            </div>
        </>
    )
}
