"use client"
import { useDebounce } from "../../../../../Local Hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheck, FaX } from "react-icons/fa6";

export default function ResetPasswordForm() {
    const router = useRouter();

    const [mainPasswordText, setMainPasswordText]= useState("");
    const [confirmPasswordText, setConfirmPasswordText]= useState("");
    const [canProceed, setCanProceed] = useState(false);

    const debouncedPassword_main = useDebounce(mainPasswordText, 500);
    const debouncedPassword_confirm = useDebounce(confirmPasswordText, 500);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [hasError, setHasError]= useState({
            password: 0,
            password_confirm: 0,
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!canProceed && isLoading) return;
        setIsLoading(true);

    }


    useEffect(()=>{
        if (hasError.password <= 1) {
            setCanProceed(false);
            return;
        }
        
        if (hasError.password_confirm <= 1) {
            setCanProceed(false);
            return;
        }

        setCanProceed(true);
        setErrorMessage("");
    }, [hasError]);
    
    return (
        <div className="flex-1 sm:p-12 px-4 py-8 flex flex-col overflow-y-auto">
            <Link href={'/'} className="sm:p-0 p-3">
                <Image src={"https://linktree.sirv.com/Images/full-logo.svg"} alt="logo" height={150} width={100} className="w-[7.05rem]" />
            </Link>
            <section className="mx-auto py-10 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 flex-1 flex flex-col justify-center">
                <p className="text-2xl sm:text-5xl md:text-3xl font-extrabold text-center">Request password reset link</p>
                <form className="py-8 sm:py-12 flex flex-col gap-4 sm:gap-6 w-full" onSubmit={handleSubmit}>
                    <div className={`flex items-center py-2 sm:py-3 px-2 sm:px-6 rounded-md myInput ${hasError.email === 1 ? "hasError" : hasError.username === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg w-full`}>
                        <input
                            type=""
                            placeholder="Provide your email address"
                            className="outline-none border-none bg-transparent ml-1 py-3 flex-1 text-sm sm:text-base"
                            value={emailText}
                            name="email"
                            onChange={(e) => setMainPasswordText(e.target.value)}
                            required
                        />
                        {hasError.email === 1 ?
                            <FaX className="text-red-500 text-sm cursor-pointer" onClick={() => setMainPasswordText("")} />
                            :
                            hasError.email === 2 ?
                                <FaCheck className="text-themeGreen cursor-pointer" />
                                :
                                ""
                        }
                    </div>

                    <Link href={"/login"} className="w-fit hover:rotate-2 hover:text-themeGreen origin-left">Remembered your password?</Link>

                    <button type="submit" className={
                        `rounded-md py-4 sm:py-5 grid place-items-center font-semibold ${canProceed? "cursor-pointer active:scale-95 active:opacity-40 hover:scale-[1.025] bg-themeGreen mix-blend-screen" : "cursor-default opacity-50 "}`
                    }>
                        {!isLoading && <span className="nopointer">Send request</span>}
                        {isLoading && <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className=" mix-blend-screen" />}
                    </button>

                    {!isLoading && <span className="text-sm text-red-500 text-center">{errorMessage}</span>}
                </form>
                <p className="text-center sm:text-base text-sm"><span className="opacity-60">Don&apos;t have an account?</span> <Link href={"/signup"} className="text-themeGreen">Sign up</Link> </p>
            </section>

        </div>
    )
}