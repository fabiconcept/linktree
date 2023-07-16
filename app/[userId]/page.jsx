import Image from "next/image";
import { FaEllipsis } from "react-icons/fa6";

export const generateMetaData = ({ params: { userId } }) =>{
    return ({
        title: `${userId} links`
    });
};

export default function UserLinksPage({ params: { userId } }) {
    return (
        <div className="w-screen h-screen">
            <div className="fixed h-screen w-screen z-0 top-0 left-0 opacity-70 overflow-hidden">
                <Image src={"https://linktree.sirv.com/Images/profile/1658454113690.jpg"} alt="logo" height={1000} width={1000} className="min-w-full h-full object-cover scale-[1.25]" />
            </div>
            <div className="fixed h-screen w-screen bg-gray-200 z-10 top-0 left-0 bg-opacity-[0.55] backdrop-blur-[50px]"></div>

            <div className="relative z-20 md:w-[50rem] w-full flex flex-col items-center h-full mx-auto">
                <div className="relative mt-7 mb-4 mr-4 bg-white hover:bg-opacity-70 active:scale-90 duration-100 cursor-pointer border rounded-full ml-auto h-[2.5rem] w-[2.5rem] grid place-items-center">
                    <FaEllipsis className="scale-80" />
                </div>

                <div className="h-[6rem] w-[6rem] mb-2 rounded-full border overflow-hidden bg-white grid place-items-center">
                    <Image src={"https://linktree.sirv.com/Images/profile/1658454113690.jpg"} alt="logo" height={1000} width={1000} className="w-full object-contain" />
                </div>
                <span className="font-bold text-xl py-2">@{userId}</span>
                <span className="opacity-60 text-center max-w-[80%]">Fabiconcept!</span>
            </div>
        </div>
    );
}