"use client"
import { LinkTabs } from "@/lib/LinkTabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DropDown() {
    const [currentTab, setCurrentTab] = useState(0);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const dropCardRef = useRef(null);
    const router = useRouter();

    const handleSHowProfileCard = () => {
        setDropDownOpen(!dropDownOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropCardRef.current && !dropCardRef.current.contains(event.target)) {
                setDropDownOpen(false);
            }
        };

        if (dropDownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownOpen, setDropDownOpen]);


    const handleNavigation = (id, tab) => {
        router.push(`${tab}`);
        setCurrentTab(id);
        setDropDownOpen(false);
    };

    return (
        <div className="relative flex-1" ref={dropCardRef}>
            <div className={`cursor-pointer p-3 rounded-xl flex justify-between items-center w-[100%] bg-blue-950 bg-opacity-5 ${dropDownOpen ? "border-2 border-black" : "border-transparent border-2 cursor-pointer hover:border-black hover:border-opacity-10"} select-none`} onClick={handleSHowProfileCard}>
                <div className="flex items-center gap-3">
                    <Image src={LinkTabs[currentTab].imgActive} alt="icon" height={24} width={24} />
                    <span>{LinkTabs[currentTab].text}</span>
                </div>
                <Image
                    src={"https://linktree.sirv.com/Images/icons/arr.svg"}
                    className={`${dropDownOpen ? "rotate-0" : "rotate-180"}`}
                    alt="icon"
                    height={10}
                    width={10}
                />
            </div>
            <div className={`absolute top-14 left-0 bg-white z-10 w-full p-4 grid gap-3 rounded-md ${dropDownOpen ? "enterCard" : "leaveCard"}`} style={{ boxShadow: `0 5px 25px 1px rgba(0, 0, 0, .05)` }}>
                {LinkTabs.map((tab, index) => (
                    <div key={index} className="px-2 py-3 flex items-center cursor-pointer gap-2 rounded-md hover:bg-blue-950 hover:bg-opacity-10" onClick={()=>handleNavigation(index, tab.tag)}>
                        <Image src={index === currentTab ? tab.imgActive : tab.img} alt="icon" height={24} width={24} />
                        <span>{tab.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}