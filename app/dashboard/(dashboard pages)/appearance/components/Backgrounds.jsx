"use client"
import React, { useState } from "react";
import BackgroundCard from "../elements/BackgroundCard";
import ColorPicker from "../elements/ColorPicker";
import GradientPicker from "../elements/GradientPicker";

export const backgroundContext = React.createContext();
export default function Backgrounds() {
    const [isGradient, setIsGradient] = useState(false);
    return (
        <backgroundContext.Provider value={{ setIsGradient }}>
            <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
                <div className="flex flex-wrap gap-4 w-full">
                    <BackgroundCard text={"Flat Colour"} colorValue={"#3d444b"} />
                    <BackgroundCard text={"Gradient"} backImg={"linear-gradient(to top, #3d444b, #686d73)"} />
                    <BackgroundCard text={"Image"} />
                    <BackgroundCard text={"Video"} />
                    <BackgroundCard text={"Polka"} backImg={'url("https://linktree.sirv.com/Images/gif/selector-polka.51162b39945eaa9c181a.gif")'} />
                    <BackgroundCard text={"Stripe"} backImg={'url("https://linktree.sirv.com/Images/gif/selector-stripe.19d28e1aac1e5a38452e.gif")'} />
                    <BackgroundCard text={"Waves"} backImg={'url("https://linktree.sirv.com/Images/gif/selector-waves.5cf0a8a65908cd433192.gif")'} />
                    <BackgroundCard text={"Zig Zag"} backImg={'url("https://linktree.sirv.com/Images/gif/selector-zigzag.0bfe34b10dd92cad79b9.gif")'} />
                </div>
                {isGradient && <GradientPicker />}
                <ColorPicker />
            </div>
        </backgroundContext.Provider>
    );
}