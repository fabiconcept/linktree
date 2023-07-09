import Image from "next/image";

export default function BrandAdd({addFunction, imgAlt, imgSrc, title, p}) {
    return (
        <div className="flex min-w-[20rem] flex-1 items-center gap-3">
            <Image
                src={`${imgSrc}`} 
                height={40} 
                width={40} 
                alt={`${imgAlt}`}
            />

            <div className="flex-1 flex justify-between items-center pr-3 py-3 border-b">
                <div className="grid">
                    <span className="font-semibold">{title}</span>
                    <span className="opacity-60 md:text-sm text-xs">{p}</span>
                </div>
                <span className="cursor-pointer text-btnPrimary font-semibold text-sm active:scale-90">Add</span>
            </div>
        </div>
    );
}