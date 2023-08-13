import Image from "next/image";
import { useContext } from "react";
import { addBtnContext } from "./addBtn";

export default function BrandAdd({btnData, imgAlt, imgSrc, title, p}) {
    const { addItem } = useContext(addBtnContext);

    const handleAddItem = () =>{
        addItem(btnData);
    }

    return (
        <div className="flex sm:min-w-[20rem] min-w-[15rem] flex-1 items-center gap-3 p-2 hover:bg-black hover:bg-opacity-[0.05] active:scale-90 rounded-xl cursor-pointer" onClick={handleAddItem}>
            <Image
                src={`${imgSrc}`} 
                height={40} 
                width={40} 
                alt={`${imgAlt}`}
            />

            <div className="flex-1 flex justify-between items-center pr-3 py-3 border-b">
                <div className="grid">
                    <span className="font-semibold">{title}</span>
                    <span className="opacity-60 md:text-sm text-xs sm:w-fit w-[10rem]">{p}</span>
                </div>
                <span className="hover:bg-white py-3 px-5 rounded-3xl text-btnPrimary font-semibold text-sm">Add</span>
            </div>
        </div>
    );
}