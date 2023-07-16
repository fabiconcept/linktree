"use client"

import { useDebounce } from "@/Local Hooks/useDebounce";
import { isValidHexCode } from "@/lib/utilities";
import { useEffect, useRef, useState } from "react";

export default function ColorPicker() {
    const [colorText, setColorText] = useState("#e8edf5");
    const debounceColor = useDebounce(colorText, 500);
    const [validColor, setValidColor] = useState(1);
    const colorPickRef = useRef();

    useEffect(() => {
        if (colorText !== "") {
            setValidColor(isValidHexCode(colorText));
        }
    }, [debounceColor]);
    return (
        <div className="pt-6 flex items-center">
            <input 
                type="color" 
                className="relative h-0 w-0 overflow-hidden"
                value={colorText}
                ref={colorPickRef}
                onChange={(e) => setColorText(e.target.value)} 
            />
            <div className="h-12 w-12 mr-4 rounded-lg cursor-pointer hover:scale-[1.05] active:scale-90" style={{ background: `${colorText}` }} onClick={()=>colorPickRef.current.click()}></div>
            <div className={`w-auto relative pt-2 flex items-center hover:border rounded-lg bg-black bg-opacity-[0.05] ${validColor ? "focus-within:border-black border-transparent": "border-red-500" } focus-within:border-2 border`}>
                <input
                    type="text"
                    className="flex-1 px-4 placeholder-shown:px-3 py-2 text-base font-semibold outline-none opacity-100 bg-transparent peer appearance-none"
                    placeholder=" "
                    value={colorText}
                    onChange={(e) => setColorText(e.target.value)}
                />
                <label className="absolute px-3 pointer-events-none top-[.25rem] left-1 text-xs text-main-green peer-placeholder-shown:top-2/4 peer-placeholder-shown:pt-2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-500 peer-placeholder-shown:left-0 opacity-70 transition duration-[250] ease-linear">
                    Colour
                </label>
            </div>
        </div>
    )
}