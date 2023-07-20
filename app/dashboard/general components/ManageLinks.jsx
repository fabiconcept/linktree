"use client"

import Image from "next/image";
import AddBtn from "../general elements/addBtn";
import DraggableList from "./Drag";
import React, { useEffect, useState } from "react";
import { generateRandomId } from "@/lib/utilities";
import { updateLinks } from "@/lib/updateLinks";
import { fetchLinks } from "@/lib/fetchLinks";

export const ManageLinksContent = React.createContext();
export default function ManageLinks() {
    const [data, setData] = useState([]);

    const addItem = () => {
        const newItem ={id: `${generateRandomId()}`, title: "", isActive: true, type: 0};
        setData(prevData => {
          return [newItem, ...prevData];
        });
    };
    
    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        updateLinks(data);
    }, [data]);

    useEffect(() => {
        async function getLinks() {
            const dataArray = await fetchLinks();

            console.log(dataArray);
            setData(dataArray ? dataArray : []);
        }
        getLinks();
    }, []);

    return (
        <ManageLinksContent.Provider value={{setData, data}}>
            <div className="max-h-full flex-col gap-4 py-1 flex overflow-y-auto px-2">
                <AddBtn />

                <div className={`flex items-center gap-3 justify-center rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] border hover:bg-black hover:bg-opacity-[0.05] w-fit text-sm p-3 mt-3`} onClick={addItem}>
                        <>
                            <Image src={"https://linktree.sirv.com/Images/icons/add.svg"} alt="links" height={15} width={15} />
                            <span>Add Header</span>
                        </>
                </div>

                {data.length === 0 && <div className="p-6 flex-col gap-4 flex items-center justify-center opacity-30">
                    <Image
                        src={"https://linktree.sirv.com/Images/logo-icon.svg"}
                        alt="logo"
                        height={100}
                        width={100}
                        className="opacity-50"
                    />
                    <span className="text-center max-w-[15rem] font-semibold">
                        Show the world who you are.
                        Add a link to get started.
                    </span>
                </div>}

                {data.length > 0 && <DraggableList array={data} />}
            </div>
        </ManageLinksContent.Provider>
    );
}