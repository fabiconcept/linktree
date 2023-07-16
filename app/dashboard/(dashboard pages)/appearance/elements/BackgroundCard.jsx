import Image from "next/image";

export default function BackgroundCard({ text, colorValue, backImg }) {
    return (
        <div className="min-w-[8rem] flex-1 items-center flex flex-col group"> 
            <div className={`w-full h-[13rem] ${!colorValue && !backImg ? "border-dashed border-black" : ""} border rounded-lg group-hover:scale-105 group-active:scale-90 grid place-items-center cursor-pointer overflow-hidden`}>
                {colorValue ?
                    <div className="h-full w-full" style={{ backgroundColor: `${colorValue}` }}></div>
                    :
                backImg ?
                    <div className="h-full w-full bg-cover bg-no-repeat"
                        style={{ backgroundImage: `${backImg}` }}>
                    </div>
                    :
                    <div className="h-full w-full grid place-items-center">
                        <div className="bg-black bg-opacity-[0.1] rounded-lg p-1">
                                <Image src={"https://linktree.sirv.com/Images/icons/image.svg"} alt={text} height={27} width={27} />
                        </div>
                    </div>
                }
            </div>
            <span className="py-3 text-sm">{text}</span>
        </div>
    )
}