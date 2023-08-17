"use client"

import Image from "next/image";
import AddBtn from "../general elements/addBtn";
import DraggableList from "./Drag";
import React, { useEffect, useState } from "react";
import { generateRandomId } from "@/lib/utilities";
import { updateLinks } from "@/lib/update data/updateLinks";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const ManageLinksContent = React.createContext();
export default function ManageLinks() {
    const [data, setData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    const addItem = () => {
        const newItem ={id: `${generateRandomId()}`, title: "", isActive: true, type: 0};
        setData(prevData => {
          return [newItem, ...prevData];
        });
    };
    
    useEffect(() => {
        if (!hasLoaded) {
            setHasLoaded(true);
            return;
        }
        updateLinks(data);
    }, [data]);

    useEffect(() => {
        function fetchLinks() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { links } = docSnap.data();
                    setData(links ? links : []);
                }
            });
        }

        fetchLinks();
    }, []);

    return (
        <ManageLinksContent.Provider value={{setData, data}}>
            <div className="h-full flex-col gap-4 py-1 flex sm:px-2 px-1 transition-[min-height]">
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
                        className="opacity-50 sm:w-24 w-16"
                    />
                    <span className="text-center sm:text-base text-sm max-w-[15rem] font-semibold">
                        Show the world who you are.
                        Add a link to get started.
                    </span>
                </div>}

                {data.length > 0 && <DraggableList array={data} />}
            </div>
        </ManageLinksContent.Provider>
    );
}