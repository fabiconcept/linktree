import { FaPlus } from "react-icons/fa6";
import ProfileImageManager from "../elements/ProfileImageHandler";
import TextDetails from "../elements/TextDetails";
import Link from "next/link";

export default function ProfileCard() {
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col">
            <ProfileImageManager />

            <TextDetails />

            <div className="w-full border-t px-6 py-4">
                <Link href={"/dashboard/settings#Settings--SocialLinks"} className={`flex w-fit items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] text-btnPrimary font-semibold`}>
                    <FaPlus/>
                    <span>Add social icons</span>
                </Link>
            </div>
        </div>
    );
}