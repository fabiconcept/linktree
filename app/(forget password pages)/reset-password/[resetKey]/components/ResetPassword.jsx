"use client"
import { validatePassword } from "@/lib/utilities";
import { useDebounce } from "@/Local Hooks/useDebounce";
import { changePassword } from "@/lib/authentication/changePassword";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash} from "react-icons/fa6";

export default function ResetPasswordForm({user, resetKey}) {
    const router = useRouter();
    
    const [seePassord, setSeePassord] = useState(true);
    const [seePassord2, setSeePassord2] = useState(true);
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
    
    useEffect(() => {
        if (debouncedPassword_main === "") {
            setHasError((prevData) => ({ ...prevData, password: 0 }));
            setErrorMessage("")
            return;
        }

        if (typeof (validatePassword(debouncedPassword_main)) !== "boolean") {
            setHasError((prevData) => ({ ...prevData, password: 1 }));
            setErrorMessage(validatePassword(debouncedPassword_main));
            return;
        }

        setHasError((prevData) => ({ ...prevData, password: 2 }));
        setErrorMessage("");
    }, [debouncedPassword_main]);

    useEffect(() => {
        if (debouncedPassword_confirm === "") {
            setHasError((prevData) => ({ ...prevData, password_confirm: 0 }));
            setErrorMessage("");
            return;
        }
        

        setHasError((prevData) => ({ ...prevData, password_confirm: 2 }));
    }, [debouncedPassword_confirm]);
    
    useEffect(() => {
        if (debouncedPassword_confirm === "") {
            return;
        }
        if (debouncedPassword_confirm !== debouncedPassword_main) {
            setHasError((prevData) => ({ ...prevData, password_confirm: 1 }));
            setErrorMessage("Both password must match!");
            return;
        }
    }, [debouncedPassword_confirm, debouncedPassword_main]);

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        if (!canProceed) return;
        if (isLoading) return;
        setIsLoading(true);
        setCanProceed(false);

        const promise = changePassword(
            resetKey,
            debouncedPassword_main,
            debouncedPassword_confirm,
            user
        );

        toast.promise(promise, {
            loading: "Setting up your new Password...",
            error: "Oops! Something went wrong!",
            success: "Password changed! ✨✔"
        }).then(()=>{
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        }).catch((error)=>{
            setIsLoading(false);
            setCanProceed(false);
    
            if (error.custom){
                console.error(error.custom);
                setHasError((prevData) => ({ ...prevData, password: 1 }));
                setErrorMessage(`${error.custom}`);
                return;
            }
            console.error(error);
            setErrorMessage(`Oops! Something went wrong!`);
        });
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
                <p className="text-2xl sm:text-5xl md:text-3xl font-extrabold text-center">Enter your new password</p>
                <p className="opacity-40 mt-4 max-w-sm mx-auto text-center">I&apos;ll advice that your new password be different from your previous password.</p>
                <form className="py-8 sm:py-12 flex flex-col gap-4 sm:gap-6 w-full" onSubmit={handleSubmit}>
                    <div className={`flex items-center relative py-2 sm:py-3 px-2 sm:px-6 rounded-md  ${hasError.password === 1 ? "hasError" : hasError.password === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg myInput`}>
                        <input
                            type={`${seePassord ? "password" : "text"}`}
                            placeholder="Password"
                            className="peer outline-none border-none bg-transparent py-3 ml-1 flex-1 text-sm sm:text-base"
                            value={mainPasswordText}
                            onChange={(e) => setMainPasswordText(e.target.value)}
                            required
                        />
                        {seePassord && <FaEyeSlash className="opacity-60 cursor-pointer" onClick={() => setSeePassord(!seePassord)} />}
                        {!seePassord && <FaEye className="opacity-60 cursor-pointer text-themeGreen" onClick={() => setSeePassord(!seePassord)} />}
                    </div>
                    <div className={`flex items-center relative py-2 sm:py-3 px-2 sm:px-6 rounded-md  ${hasError.password_confirm === 1 ? "hasError" : hasError.password_confirm === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg myInput`}>
                        <input
                            type={`${seePassord2 ? "password" : "text"}`}
                            placeholder="Retype assword"
                            className="peer outline-none border-none bg-transparent py-3 ml-1 flex-1 text-sm sm:text-base"
                            value={confirmPasswordText}
                            onChange={(e) => setConfirmPasswordText(e.target.value)}
                            required
                        />
                        {seePassord2 && <FaEyeSlash className="opacity-60 cursor-pointer" onClick={() => setSeePassord2(!seePassord2)} />}
                        {!seePassord2 && <FaEye className="opacity-60 cursor-pointer text-themeGreen" onClick={() => setSeePassord2(!seePassord2)} />}
                    </div>

                    <button type={canProceed ? "submit" : "button"} className={
                        `border rounded-md py-4 sm:py-5 grid place-items-center font-semibold ${canProceed? "cursor-pointer active:scale-95 active:opacity-40 hover:scale-[1.025] bg-themeGreen mix-blend-screen border-transparent" : "cursor-default opacity-50 border-black/20"}`
                    }>
                        {!isLoading && <span className="nopointer">Change password</span>}
                        {isLoading && <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className={canProceed? "mix-blend-multiply": "mix-blend-screen"} />}
                    </button>
                    {!isLoading && <span className="text-sm text-red-500 text-center">{errorMessage}</span>}
                </form>
            </section>

        </div>
    )
}