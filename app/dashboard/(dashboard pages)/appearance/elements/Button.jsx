"use client"

import { updateThemeButton } from "@/lib/update data/updateTheme";

export default function Button({modifierClass, modifierStyles, type}) {
    const handleUpdateTheme = async() => {
        await updateThemeButton(type ? type : 0);
    }
    return (
        <div 
            onClick={handleUpdateTheme}
            className={`${modifierClass} cursor-pointer hover:scale-105 active:scale-95 min-w-[30%] h-10 flex-1`}
            style={modifierStyles}
        ></div>
    );
}