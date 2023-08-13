"use client"

import { SocialsList } from "@/lib/SocialsList";
import Image from "next/image";
import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { SocialContext } from "../components/SocialSetting";

export default function SocialElement({ item, index }) {
    const { setSettingIconModalOpen, setSocialsArray } = useContext(SocialContext);
    const [checkboxChecked, setCheckboxChecked] = useState(item.active);

    const handleCheckboxChange = (event) => {
        const checkedStatus = event.target.checked;
        setSocialsArray((previousItems) =>
            previousItems.map(
                pItem => pItem.id === item.id ? { ...pItem, active: checkedStatus } : pItem
            )
        );
        setCheckboxChecked(checkedStatus);
    };

    const handleEdit = () =>{
        setSettingIconModalOpen({
            status: true,
            type: item.type,
            operation: 1,
            value: item.value,
        });
    }


    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided, snapshot) => (
                <div 
                    className={`flex items-center gap-3 ${snapshot.isDragging ? "shadow-lg" : ""} bg-white`}
                    style={{ boxShadow: `0 5px 25px 1px rgba(0, 0, 0, .05)` }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div 
                        className="select-none "
                        {...provided.dragHandleProps}
                    >
                        <Image src={"https://linktree.sirv.com/Images/icons/elipsis.svg"} className='select-none cursor-grab active:cursor-grabbing' alt='elipsis-v icon' width={15} height={15} />
                    </div>
                    
                    <div className='flex-1 flex items-center justify-between p-3 hover:bg-black hover:bg-opacity-5 cursor-pointer rounded-lg active:scale-95 active:opacity-60' onClick={handleEdit}>
                        <div className='flex-1 flex items-center gap-3'>
                            <Image src={SocialsList[item.type].icon} alt='icon' height={25} width={25} />
                            <span className='font-semibold sm:text-base text-sm'>{SocialsList[item.type].title}</span>
                        </div>
                        <Image src={"https://linktree.sirv.com/Images/icons/pen.svg"} alt='edit' height={15} width={15} />
                    </div>
                    <div className={`scale-[0.8]`}>
                        <label className="cursor-pointer relative flex justify-between items-center group p-2 text-xl">
                            <input type="checkbox" onChange={handleCheckboxChange} checked={checkboxChecked} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                            <span className="cursor-pointer w-9 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-700 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-[2px]"></span>
                        </label>
                    </div>
                </div>
            )}
        </Draggable>
    )
}