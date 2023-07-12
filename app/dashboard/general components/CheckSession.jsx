"use client"
import { getSessionCookie } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckSession() {
    const [username, setUsername] = useState("nobody");
    const router = useRouter();
    
    useEffect(() => {
        const sessionUsername = getSessionCookie("adminLinker");
        if (sessionUsername !== undefined) {
            setUsername(sessionUsername);
        }else{
            router.push("/login");
        }
    }, []);

    
}