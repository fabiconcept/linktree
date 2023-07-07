"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6"

export default function SignUpForm() {
    const [seePassord, setSeePassord] = useState(true);
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [hasError, setHasError]= useState(0);
    return (
        <div className="flex-1 sm:p-12 p-8 flex flex-col">
            <Link href={'/'}>
                <Image src={"https://linktree.sirv.com/Images/full-logo.svg"} alt="logo" height={150} width={100} className="w-[7.05rem]" />
            </Link>
            <section className="mx-auto py-10 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 flex-1 flex flex-col justify-center">
                <p className="text-2xl sm:text-5xl font-extrabold text-center">Create your account</p>
                <form className="py-8 sm:py-12 flex flex-col gap-4 sm:gap-6 w-full">
                    <div className={`flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-md myInput ${hasError === 1 ? "hasError": hasError === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg w-full`}>
                        <label className="opacity-40">mylinktree/</label>
                        <input
                            type="text"
                            placeholder="fabiconcept"
                            className="outline-none border-none bg-transparent ml-1 py-3 flex-1 text-sm sm:text-base"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <FaCheck className="text-themeGreen cursor-pointer" />
                    </div>
                    <div className={`flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-md myInput ${hasError === 1 ? "hasError": hasError === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg w-full`}>
                        <input
                            type="text"
                            placeholder="Email"
                            className="outline-none border-none bg-transparent ml-1 py-3 flex-1 text-sm sm:text-base"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <FaCheck className="text-themeGreen cursor-pointer" />
                    </div>
                    <div className={`flex items-center relative py-2 sm:py-3 px-4 sm:px-6 rounded-md  ${hasError === 1 ? "hasError": hasError === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg myInput`}>
                        <input
                            type={`${seePassord ? "password": "text"}`}
                            placeholder="Password"
                            className="peer outline-none border-none bg-transparent py-3 ml-1 flex-1 text-sm sm:text-base"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        {seePassord && <FaEyeSlash className="opacity-60 cursor-pointer" onClick={()=>setSeePassord(!seePassord)} />}
                        {!seePassord && <FaEye className="opacity-60 cursor-pointer text-themeGreen" onClick={()=>setSeePassord(!seePassord)} />}
                    </div>
                    <div className="rounded-md py-4 sm:py-5 grid place-items-center bg-themeGreen mix-blend-screen font-semibold cursor-pointer active:scale-95 active:opacity-40 hover:scale-[1.025]">
                        <div>submit</div>
                    </div>
                </form>
                <p className="text-center"><span className="opacity-60">Already have an account?</span> <Link className="text-themeGreen" href={"/login"}>Log in</Link> </p>
            </section>

        </div>
    )
}