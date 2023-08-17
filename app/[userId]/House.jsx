"use client"
import ProfilePic from "./components/ProfilePic";
import UserInfo from "./components/UserInfo";
import BgDiv from "./components/BgDiv";
import MyLinks from "./components/MyLinks";
import SupportBanner from "./components/SupportBanner";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import SensitiveWarning from "./components/SensitiveWarning";

export const HouseContext = React.createContext();

export default function House({ userId }) {
    const [sensitiveWarning, setSensitiveWarning] = useState(null);
    const [hasSensitiveContent, setHasSensitiveContent]= useState(false);
    const [sensitiveType, setSensitiveType] = useState(false);

    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
            const getDocRef = await getDoc(docRef);

            if (getDocRef.exists()) {
                const { sensitiveStatus, sensitivetype } = getDocRef.data();
                setSensitiveWarning(sensitiveStatus ? sensitiveStatus : false);
                setHasSensitiveContent(sensitiveStatus ? sensitiveStatus : false);
                setSensitiveType(sensitivetype ? sensitivetype : 3);
            }

        }
        fetchProfilePicture();
    }, [userId]);

    return (
        <HouseContext.Provider value={{ setSensitiveWarning, sensitiveType }}>
            {!sensitiveWarning ? <>
                <BgDiv userId={userId} />

                <div className="relative z-20 md:w-[50rem] w-full flex flex-col items-center h-full mx-auto">
                    {/* <div className="absolute z-10 top-3 right-0 mt-7 mb-4 mr-4 bg-white hover:bg-opacity-80 active:scale-90 duration-100 cursor-pointer border rounded-full ml-auto h-[2.5rem] w-[2.5rem] grid place-items-center">
                        <FaEllipsis className="scale-80" />
                    </div> */}

                    <div className="flex flex-col items-center flex-1 overflow-auto py-6">
                        <ProfilePic userId={userId} />
                        <UserInfo userId={userId} hasSensitiveContent={hasSensitiveContent} />
                        <MyLinks userId={userId} hasSensitiveContent={hasSensitiveContent} />
                    </div>
                </div>
                <SupportBanner userId={userId} />
            </>:
                <SensitiveWarning />}
        </HouseContext.Provider>
    )
}