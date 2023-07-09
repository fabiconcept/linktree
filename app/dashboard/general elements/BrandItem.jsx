import Image from "next/image";

export default function BrandItem({imgSrc, imgAlt}) {
    return (
        <div className="min-w-[6rem] w-[6rem] min-h-[6rem] h-[6rem] rounded-3xl bg-black bg-opacity-[0.05] p-2 grid place-items-center cursor-pointer hover:scale-110 active:scale-90">
            <Image 
                src={`${imgSrc}`} 
                height={50} 
                width={50} 
                alt={`${imgAlt}`}
                className="drop-shadow w-[70%]"
            />
        </div>
    );
}