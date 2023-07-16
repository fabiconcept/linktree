import Image from "next/image";

export default function ThemeCard({ type, pic, text }) {
    return (
        <>
            {type !== 1 ?
                <div className="min-w-[8rem] flex-1 items-center flex flex-col group">
                    <div className="w-full h-[13rem] border border-dashed rounded-lg group-hover:bg-black group-hover:bg-opacity-[0.05] border-black grid place-items-center cursor-pointer">
                        <span className="uppercase max-w-[5rem] text-xl text-center">
                            Create Your Own
                        </span>
                    </div>
                    <span className="py-3 text-sm">Custom</span>
                </div>
                :
                <div className="min-w-[8rem] flex-1 items-center flex flex-col group">
                    <div className="w-full h-[13rem] border rounded-lg group-hover:scale-105 group-active:scale-90 grid place-items-center cursor-pointer overflow-hidden">
                        <Image src={pic} alt="logo" height={1000} width={1000} className="min-w-full h-full h-full object-cover" />
                    </div>
                    <span className="py-3 text-sm">{text}</span>
                </div>
            }
        </>
    );
}