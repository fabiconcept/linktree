import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
    return (
        <div className="w-[96%] justify-between flex items-center rounded-[3rem] py-3 absolute sm:top-4 top-2 z-[9999999999] mdpx-12 sm:px-6 px-3 mx-auto bg-white bg-opacity-[0.1] border backdrop-blur-xl hover:glow-white">
            <Link href={"/"}>
                <Image src={"https://linktree.sirv.com/Images/logo-icon.svg"} alt="logo" height={25} width={25} className="filter invert" priority />
            </Link>


            <Link href={'/login'} className="p-3 sm:px-6 px-3 bg-themeGreen flex items-center gap-2 rounded-3xl cursor-pointer hover:scale-105 hover:bg-gray-100 active:scale-90">
                Login
            </Link>
        </div>
    );
}