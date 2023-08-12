"use client"

import { useContext, useEffect, useState } from "react";
import { SocialContext } from "../components/SocialSetting";
import Image from "next/image";
import { useDebounce } from "@/Local Hooks/useDebounce";
import { SocialsList } from "@/lib/SocialsList";

export default function AddIconModal() {
    const { setAddIconModalOpen, setSettingIconModalOpen, socialsArray } = useContext(SocialContext);
    const [searchParam, setSearchParam] = useState("");
    const [showSocials, setShowSocials] = useState([]);
    const debouceSearchParam = useDebounce(searchParam, 500);

    useEffect(() => {
        setShowSocials([...SocialsList]);
    }, []);

    useEffect(() => {
        if (searchParam === "") {
            setShowSocials([...SocialsList]);
            return
        }

        const tempArr = [];
        SocialsList.forEach(element => {
            if (String(element.title).toLowerCase().includes(String(searchParam).toLowerCase())) {
                tempArr.push(element);
            }
        });

        setShowSocials(tempArr);
    }, [debouceSearchParam]);

    const handleSelect = (item) =>{
        const selectedItem = item;
        setSettingIconModalOpen({
            status: true,
            type: selectedItem.type,
            operation: 0,
            value: "",
            active: false
        });
        handleClose();
    }

    const handleClose = () => {
        setAddIconModalOpen(false);
    }
    
    return (
        <div className="fixed top-0 left-0 h-screen w-screen grid place-items-center z-[99999999999]">
            <div className="absolute h-full w-full bg-black bg-opacity-25 top-0 left-0" onClick={handleClose}></div>

            <div className="relative z-10 sm:h-[33rem] flex flex-col h-60vh sm:w-[32rem] w-full enter pb-2 bg-white rounded-3xl">
                <div className="grid grid-cols-[32px_auto_32px] p-5 items-center">
                    <span></span>
                    <span className="text-center font-semibold">Add Icon</span>
                    <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                </div>

                <div className="mx-5">
                    <div className="rounded-[10px] relative focus-within:ring-2 focus-within:ring-black transition duration-75 ease-out hover:shadow-[inset_0_0_0_2px_#e0e2d9] hover:focus-within:shadow-none bg-black bg-opacity-[0.025]">
                        <div className="flex rounded-[10px] leading-[48px] border-solid border-2 border-transparent">
                            <div className="flex w-full items-center bg-chalk rounded-sm px-3">
                                <div className=""><Image src={"https://linktree.sirv.com/Images/icons/Search%20Icon.svg"} alt="x" width={30} height={30} /></div>
                                <div className="relative grow">
                                    <input
                                        name="searchTerm"
                                        placeholder="Search"
                                        className="placeholder-transparent peer px-0 text-base leading-[48px] placeholder:leading-[48px] rounded-xl block py-1 w-full bg-chalk text-black transition duration-75 ease-out !outline-none bg-transparent"
                                        value={searchParam}
                                        type="search"
                                        onChange={(e)=>setSearchParam(e.target.value)}
                                    />
                                    <label
                                        className="absolute pointer-events-none text-sm text-concrete transition-all transform -translate-y-2.5 scale-[0.85] top-[13px] origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:tracking-normal peer-focus:scale-[0.85] peer-focus:-translate-y-2.5 max-w-[calc(100%-16px)] truncate"
                                    >
                                        Search
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="mx-5 my-3 overflow-y-auto flex-1">
                    {/* <div className="font-semibold py-2">All</div> */}
                    <section className="grid">
                        {showSocials.length > 0 && showSocials.map((socialItem) => {
                            if (socialsArray.some(item => item.id === socialItem.id)) {
                                return (
                                    <div key={socialItem.id} className="flex justify-between p-4 hover:bg-black hover:bg-opacity-5 cursor-pointer items-center rounded-lg active:scale-95 active:opacity-60 hover:border-black hover:border-opacity-20 border border-transparent">
                                        <div className="flex gap-3 items-center">
                                            <Image src={socialItem.icon} alt="x" width={25} height={25} />
                                            <span className="font-semibold">{socialItem.title}</span>
                                        </div>
                                        <div>
                                            <span className="text-green-700 text-sm font-semibold">Already Added</span>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={socialItem.id} className="flex justify-between p-4 hover:bg-black hover:bg-opacity-5 cursor-pointer items-center rounded-lg active:scale-95 active:opacity-60 hover:border-black hover:border-opacity-20 border border-transparent" onClick={()=>handleSelect(socialItem)}>
                                    <div className="flex gap-3 items-center">
                                        <Image src={socialItem.icon} alt="x" width={25} height={25} />
                                        <span className="font-semibold">{socialItem.title}</span>
                                    </div>
                                    <div>
                                        <Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="transform -rotate-90" alt="x" width={15} height={15} />
                                    </div>
                                </div>
                            );

                        })}

                        {showSocials.length === 0 && <div className="text-sm text-center p-3">
                            <span>No icons found. Try something else?</span>
                        </div>}
                    </section>
                </section>

            </div>
        </div>
    );
}