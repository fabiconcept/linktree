"use client"
import MyBtn from "../general elements/btn";
import Image from "next/image";
import AddBtn from "../general elements/addBtn";
import DraggableList from "./Drag";
import React, { useState } from "react";

export const ManageLinksContent = React.createContext();
export default function ManageLinks() {
    const [data, setData] = useState([
        { id: 'abe6e89e-1ca2-5b06-9c17-7aac2ef2a6d9', content: '100', isActive: false },
        { id: '48889665-120f-57cf-b244-e1e3a4588b50', content: '200', isActive: false },
        { id: '9ef792cd-ac8c-5ba1-afdf-14a18340b0df', content: '300', isActive: false },
        { id: '8e4436ee-ff8d-5bfe-b4c9-f7f0670afb13', content: '400', isActive: false },
    ]);

    return (
        <ManageLinksContent.Provider value={{setData, data}}>
            <div className="flex-1 flex-col gap-4 py-3 max-h-[100%] flex overflow-y-auto px-2">
                <AddBtn />
                <MyBtn
                    extraClass={"border hover:bg-black hover:bg-opacity-[0.05] w-fit text-sm p-3 mt-3"}
                    content={
                        <>
                            <Image src={"https://linktree.sirv.com/Images/icons/add.svg"} alt="links" height={15} width={15} />
                            <span>Add Header</span>
                        </>
                    }
                />


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