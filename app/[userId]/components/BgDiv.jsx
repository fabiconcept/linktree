"use client"
import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import LakeWhite from "../elements/themes/LakeWhite";
import LakeBlack from "../elements/themes/LakeBlack";
import PebbleBlue from "../elements/themes/PebbleBlue";
import PebbleYellow from "../elements/themes/PebbleYellow";
import PebblePink from "../elements/themes/PebblePink";
import BreezePink from "../elements/themes/BreezePink";
import BreezeOrange from "../elements/themes/BreezeOrange";
import BreezeGreen from "../elements/themes/BreezeGreen";
import Confetti from "../elements/themes/Confetti";
import CloudRed from "../elements/themes/CloudRed";
import CloudGreen from "../elements/themes/CloudGreen";
import CloudBlue from "../elements/themes/CloudBlue";
import Rainbow from "../elements/themes/Rainbow";
import StarryNight from "../elements/themes/StarryNight";
import Blocks3D from "../elements/themes/3DBlocks";
import CustomTheme from "../elements/themes/CustomTheme";

export const BgContext = React.createContext();

export default function BgDiv({ userId }) {
    const [backgroundPicture, setBackgroundPicture] = useState(null);
    const [bgType, setBgType] = useState("");
    const [bgTheme, setBgTheme] = useState('Flat Colour');
    const [gradientDirection, setGradientDirection]= useState("");
    const [bgColor, setBgColor] = useState("#e8edf5");
    const [bgImage, setBgImage] = useState('');
    const [bgVideo, setBgVideo] = useState('');

    useEffect(() => {
        async function fetchProfilePicture() {
            const currentUser = await fetchUserData(userId);;
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName, selectedTheme, backgroundType, gradientDirection, backgroundColor, backgroundImage, backgroundVideo } = docSnap.data();

                    setBgType(selectedTheme);
                    setBgTheme(backgroundType ? backgroundType : "Flat Colour");
                    setGradientDirection(gradientDirection ? gradientDirection : 0);
                    setBgColor(backgroundColor ? backgroundColor : "#e8edf5");
                    setBgVideo(backgroundVideo);
                    setBgImage(backgroundImage);

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
    }, [userId]);
    
    return (
        <BgContext.Provider value={{bgTheme, bgColor, gradientDirection, bgImage, bgVideo}}>

            {bgType === "Lake White" && <LakeWhite backgroundPicture={backgroundPicture} />}
            {bgType === "Lake Black" && <LakeBlack backgroundPicture={backgroundPicture} />}
            {bgType === "Pebble Blue" && <PebbleBlue />}
            {bgType === "Pebble Yellow" && <PebbleYellow />}
            {bgType === "Pebble Pink" && <PebblePink />}
            {bgType === "Breeze Pink" && <BreezePink />}
            {bgType === "Breeze Orange" && <BreezeOrange />}
            {bgType === "Breeze Green" && <BreezeGreen />}
            {bgType === "Confetti" && <Confetti />}
            {bgType === "Cloud Red" && <CloudRed />}
            {bgType === "Cloud Green" && <CloudGreen />}
            {bgType === "Cloud Blue" && <CloudBlue />}
            {bgType === "Rainbow" && <Rainbow />}
            {bgType === "Starry Night" && <StarryNight />}
            {bgType === "3D Blocks" && <Blocks3D />}
            {bgType === "Custom" && <CustomTheme />}
        </BgContext.Provider>
    );
}
