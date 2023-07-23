import Image from "next/image";
import { FaEllipsis } from "react-icons/fa6";
import ProfilePic from "./components/ProfilePic";
import UserInfo from "./components/UserInfo";
import BgDiv from "./components/BgDiv";

export const generateMetaData = ({ params: { userId } }) =>{
    return ({
        title: `${userId} links`
    });
};

export default function UserLinksPage({ params: { userId } }) {
    return (
        <div className="w-screen h-screen">
            <BgDiv/>
            <div className="fixed h-screen w-screen bg-gray-200 z-10 top-0 left-0 bg-opacity-[0.55] backdrop-blur-[50px]"></div>

            <div className="relative z-20 md:w-[50rem] w-full flex flex-col items-center h-full mx-auto">
                <div className="relative mt-7 mb-4 mr-4 bg-white hover:bg-opacity-70 active:scale-90 duration-100 cursor-pointer border rounded-full ml-auto h-[2.5rem] w-[2.5rem] grid place-items-center">
                    <FaEllipsis className="scale-80" />
                </div>

                <ProfilePic />
                <UserInfo userId={userId}/>
            </div>
        </div>
    );
}