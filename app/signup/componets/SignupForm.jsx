"use client"
import { useDebounce } from "@/Local Hooks/useDebounce";
import { fireApp } from "@/important/firebase";
import { createAccountHandler } from "@/lib/authentication/createAccount";
import { getSessionCookie, setSessionCookie } from "@/lib/authentication/session";
import { validateEmail, validatePassword } from "@/lib/utilities";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaEye, FaEyeSlash, FaX } from "react-icons/fa6";

export default function SignUpForm() {
    const router = useRouter();
    const [seePassord, setSeePassord] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState({
        username: 0,
        email: 0,
        password: 0,
    });
    const [canProceed, setCanProceed] = useState(false);
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [existingEmail, setExistingEmail] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const debouncedUsername = useDebounce(username, 500);
    const debouncedPassword = useDebounce(password, 500);
    const debouncedEmail = useDebounce(email, 500);
    

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (canProceed && !isLoading) {
            const data = {
                username,
                email,
                password
            }
            const status = createAccountHandler(data);

            if (status.code === 400) {
                setIsLoading(false);
                setErrorMessage("something went wrong");
                setCanProceed(false);
                return;
            }

            setSessionCookie("adminLinker", `${status.userId}`, (60 * 5));
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (username !== "") {
            if (existingUsernames.includes(String(username).toLowerCase())) {
                setHasError({ ...hasError, username: 1 });
                setErrorMessage("This username is already taken.");
                return;
            }

            if (String(username).length < 3) {
                setHasError({ ...hasError, username: 1 });
                setErrorMessage("Username is too short.");
                return;
            }

            if (/[^a-zA-Z0-9\-_]/.test(username)) {
                setHasError({ ...hasError, username: 1 });
                setErrorMessage("Invalid username format");
                return;
            }


            setHasError({ ...hasError, username: 2 });
            return;

        } else {
            setHasError({ ...hasError, username: 0 });
        }
    }, [debouncedUsername]);

    useEffect(() => {
        if (email !== "") {
            if (existingEmail.includes(String(email).toLowerCase())) {
                setHasError({ ...hasError, email: 1 });
                setErrorMessage("You already have an account with us!");
                return;
            }

            if (!validateEmail(email)) {
                setHasError({ ...hasError, email: 1 });
                setErrorMessage("Invalid Email format!");
                return;
            }

            setHasError({ ...hasError, email: 2 });
            return;
        } else {
            setHasError({ ...hasError, email: 0 });
        }

    }, [debouncedEmail]);

    useEffect(() => {
        if (password !== "") {
            if (typeof (validatePassword(password)) !== "boolean") {
                setHasError({ ...hasError, password: 1 });
                setErrorMessage(validatePassword(password));
                return;
            }

            setHasError({ ...hasError, password: 2 });
            return;
        } else {
            setHasError({ ...hasError, password: 0 });
        }

    }, [debouncedPassword]);

    useEffect(() => {
        const sessionUsername = getSessionCookie("username");
        if (sessionUsername !== undefined) {
            setUsername(sessionUsername);
        }

        function fetchExistingUsername() {
            const existingUsernames = [];
            const existingEmails = [];
        
            const collectionRef = collection(fireApp, "accounts");
        
            onSnapshot(collectionRef, (querySnapshot) => {
                querySnapshot.forEach((credential) => {
                    const data = credential.data();
                    const { username, email } = data;
                    existingUsernames.push(username);
                    existingEmails.push(email);
                });
                
                setExistingUsernames(existingUsernames);
                setExistingEmail(existingEmail);
            });
        }

        fetchExistingUsername();
    }, []);

    useEffect(() => {
        if (hasError.email === 1) {
            setCanProceed(false);
            return
        }

        if (hasError.username === 1) {
            setCanProceed(false);
            return
        }

        if (hasError.password === 1) {
            setCanProceed(false);
            return
        }

        setCanProceed(true);
    }, [hasError]);

    return (
        <div className="flex-1 sm:p-12 py-8 p-2 flex flex-col">
            <Link href={'/'} className="sm:p-0 p-3">
                <Image src={"https://linktree.sirv.com/Images/full-logo.svg"} alt="logo" height={150} width={100} className="w-[7.05rem]" />
            </Link>
            <section className="mx-auto py-10 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 flex-1 flex flex-col justify-center">
                <p className="text-2xl sm:text-5xl font-extrabold text-center">Create your account</p>
                <form className="py-8 sm:py-12 flex flex-col gap-4 sm:gap-6 w-full" onSubmit={handleSubmit}>
                    <div className={`flex items-center py-2 sm:py-3 px-2 sm:px-6 rounded-md myInput ${hasError.username === 1 ? "hasError" : hasError.username === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg w-full`}>
                        <label className="opacity-40">mylinktree/</label>
                        <input
                            type="text"
                            placeholder="fabiconcept"
                            className="outline-none border-none bg-transparent ml-1 py-3 flex-1 text-sm sm:text-base"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {hasError.username === 1 ?
                            <FaX className="text-red-500 text-sm cursor-pointer" onClick={() => setUsername("")} />
                            :
                            hasError.username === 2 ?
                                <FaCheck className="text-themeGreen cursor-pointer" />
                                :
                                ""
                        }
                    </div>
                    <div className={`flex items-center py-2 sm:py-3 px-2 sm:px-6 rounded-md myInput ${hasError.email === 1 ? "hasError" : hasError.email === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg w-full`}>
                        <input
                            type="text"
                            placeholder="Email"
                            className="outline-none border-none bg-transparent ml-1 py-3 flex-1 text-sm sm:text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {hasError.email === 1 ?
                            <FaX className="text-red-500 text-sm cursor-pointer" onClick={() => setEmail("")} />
                            :
                            hasError.email === 2 ?
                                <FaCheck className="text-themeGreen cursor-pointer" />
                                :
                                ""
                        }
                    </div>
                    <div className={`flex items-center relative py-2 sm:py-3 px-2 sm:px-6 rounded-md  ${hasError.password === 1 ? "hasError" : hasError.password === 2 ? "good" : ""} bg-black bg-opacity-5 text-base sm:text-lg myInput`}>
                        <input
                            type={`${seePassord ? "password" : "text"}`}
                            placeholder="Password"
                            className="peer outline-none border-none bg-transparent py-3 ml-1 flex-1 text-sm sm:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {seePassord && <FaEyeSlash className="opacity-60 cursor-pointer" onClick={() => setSeePassord(!seePassord)} />}
                        {!seePassord && <FaEye className="opacity-60 cursor-pointer text-themeGreen" onClick={() => setSeePassord(!seePassord)} />}
                    </div>
                    <button type="submit" className="rounded-md py-4 sm:py-5 grid place-items-center bg-themeGreen mix-blend-screen font-semibold cursor-pointer active:scale-95 active:opacity-40 hover:scale-[1.025]">
                        {!isLoading && <span className="nopointer">submit</span>}
                        {isLoading && <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className=" mix-blend-screen" />}
                    </button>

                    {!canProceed && <span className="text-sm text-red-500 text-center">{errorMessage}</span>}
                </form>
                <p className="text-center"><span className="opacity-60">Already have an account?</span> <Link className="text-themeGreen" href={"/login"}>Log in</Link> </p>
            </section>

        </div>
    )
}