import Image from "next/image";
import { useContext } from "react";
import { addBtnContext } from "./addBtn";

export default function BrandItem({imgSrc, imgAlt, btnData}) {
    const { addItem } = useContext(addBtnContext);

    const handleAddItem = () =>{
        addItem(btnData);
    }
    return (
        <div className="md:w-[6rem] md:h-[6rem] sm:w-[4rem] sm:h-[4rem] w-[3.5rem] sm:last:grid last:hidden h-[3.5rem] sm:rounded-3xl rounded-xl bg-black bg-opacity-[0.05] p-2 grid place-items-center cursor-pointer hover:scale-110 active:scale-90" onClick={handleAddItem}>
            <Image 
                src={`${imgSrc}`} 
                height={50} 
                width={50} 
                alt={`${imgAlt}`}
                className="drop-shadow sm:w-[80%]"
            />
        </div>
    );
}