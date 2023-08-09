"use client"
import Image from "next/image";
import SupportSwitch from "../elements/SupportSwitch";
import React, { useEffect, useState } from "react";
import ChooseCause from "./ChooseCause";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { updateSupportBanner, updateSupportBannerStatus } from "@/lib/update data/updateSocials";

export const SupportContext = React.createContext();
export default function SupportBanner() {
    const [showSupport, setShowSupport] = useState(null);
    const [chosenGroup, setChosenGroup] = useState(null);

    useEffect(() => {
        if (chosenGroup ===null) {
            return;
        }

        updateSupportBanner(chosenGroup);
    }, [chosenGroup]);

    useEffect(() => {
        if (showSupport ===null) {
            return;
        }

        updateSupportBannerStatus(showSupport);
    }, [showSupport]);

    useEffect(() => {
        function fetchLinks() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { supportBanner, supportBannerStatus } = docSnap.data();
                    setChosenGroup(supportBanner ? supportBanner : 0);
                    setShowSupport(supportBannerStatus ? supportBannerStatus : false);
                }
            });
        }

        fetchLinks();
    }, []);

    return (
        <SupportContext.Provider value={{ showSupport, setShowSupport, chosenGroup, setChosenGroup }}>
            <div className="w-full my-4 px-2" id="Settings--SupportBanner">
                <div className="flex items-center gap-3 py-4">
                    <Image
                        src={"https://linktree.sirv.com/Images/icons/support.svg"}
                        alt="icon"
                        height={24}
                        width={24}
                    />
                    <span className="text-xl font-semibold">Support banner</span>
                </div>
                <div className="p-5 bg-white rounded-lg">
                    <SupportSwitch />
                    {showSupport && <ChooseCause />}
                </div>
            </div>
        </SupportContext.Provider>
    )
}