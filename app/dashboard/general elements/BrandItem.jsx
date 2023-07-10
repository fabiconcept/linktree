import Image from "next/image";

export default function BrandItem({imgSrc, imgAlt}) {
    return (
        <div className="sm:w-[6rem] sm:h-[6rem] w-[3.5rem] h-[3.5rem] sm:rounded-3xl rounded-xl bg-black bg-opacity-[0.05] p-2 grid place-items-center cursor-pointer hover:scale-110 active:scale-90">
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