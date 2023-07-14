import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
    return (
        <div className="w-[97%] mx-auto justify-between flex items-center rounded-[3rem] py-3 absolute top-4 z-[9999999999] px-12 mx-auto bg-white bg-opacity-[0.1] border backdrop-blur-lg">
            <Link href={"/"}>
                <Image src={"https://linktree.sirv.com/Images/logo-icon.svg"} alt="logo" height={25} width={25} className="filter invert" />
            </Link>


            <Link href={'/login'} className="p-3 sm:px-6 px-3 bg-themeGreen flex items-center gap-2 rounded-3xl cursor-pointer hover:scale-105 hover:bg-gray-100 active:scale-90">
                Login
            </Link>
        </div>
    );
}