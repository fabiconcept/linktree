"use client"
import { FaEllipsis } from "react-icons/fa6";
import ProfilePic from "./components/ProfilePic";
import UserInfo from "./components/UserInfo";
import BgDiv from "./components/BgDiv";
import MyLinks from "./components/MyLinks";
import SupportBanner from "./components/SupportBanner";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export default function House({ userId }) {
    const [] = useState(false);
    const [] = useState(false);
    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { sensitiveStatus, sensitivetype  } = docSnap.data();
                }
            });
        }
        fetchProfilePicture();
    }, []);
    return (
        <>
            <BgDiv userId={userId} />

            <div className="relative z-20 md:w-[50rem] w-full flex flex-col items-center h-full mx-auto">
                <div className="absolute z-10 top-3 right-0 mt-7 mb-4 mr-4 bg-white hover:bg-opacity-80 active:scale-90 duration-100 cursor-pointer border rounded-full ml-auto h-[2.5rem] w-[2.5rem] grid place-items-center">
                    <FaEllipsis className="scale-80" />
                </div>

                <div className="flex flex-col items-center flex-1 overflow-auto py-6 px-3">
                    <ProfilePic userId={userId} />
                    <UserInfo userId={userId} />
                    <MyLinks userId={userId} />
                </div>
                <SupportBanner userId={userId} />
            </div>
        </>
    )
}