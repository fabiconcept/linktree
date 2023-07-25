"use client"
import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import LakeWhite from "../elements/themes/LakeWhite";
import LakeBlack from "../elements/themes/LakeBlack";
import PebbleBlue from "../elements/themes/PebbleBlue";
import PebbleYellow from "../elements/themes/PebbleYellow";
import PebblePink from "../elements/themes/PebblePink";
import BreezePink from "../elements/themes/BreezePink";
import BreezeOrange from "../elements/themes/BreezeOrange";
import BreezeGreen from "../elements/themes/BreezeGreen";

export default function BgDiv({userId}) {
    const [backgroundPicture, setBackgroundPicture] = useState(null);
    const [bgType, setBgType] = useState("");

    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName, selectedTheme } = docSnap.data();

                    setBgType(selectedTheme);
                    
                    if (profilePhoto !== '') {
                        setBackgroundPicture(
                            <Image
                                src={`${profilePhoto}`}
                                alt="profile"
                                height={1000}
                                width={1000}
                                className="min-w-full h-full object-cover scale-[1.25]"
                                priority
                            />
                        );
                    } else {
                        setBackgroundPicture(
                            <div className="h-full aspect-square w-full bg-gray-300 border grid place-items-center">
                                <span className="text-3xl font-semibold uppercase">
                                    {displayName === '' ? "" : displayName.split('')[0]}
                                </span>
                            </div>
                        );
                    }
                }
            });
        }
        fetchProfilePicture();
    }, []);
    return (
        <>
            {bgType === "Lake White" && <LakeWhite backgroundPicture={backgroundPicture}/>}
            {bgType === "Lake Black" && <LakeBlack backgroundPicture={backgroundPicture}/>}
            {bgType === "Pebble Blue" && <PebbleBlue />}
            {bgType === "Pebble Yellow" && <PebbleYellow />}
            {bgType === "Pebble Pink" && <PebblePink />}
            {bgType === "Breeze Pink" && <BreezePink />}
            {bgType === "Breeze Orange" && <BreezeOrange />}
            {bgType === "Breeze Green" && <BreezeGreen />}
        </>
    );
}
