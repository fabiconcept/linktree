"use client"
import { getSessionCookie } from "@/lib/session"
import { useEffect, useState } from "react";

export default function page() {
    const [userIdValue, setUserIdValue] = useState("")
    useEffect(()=>{
        const userId = getSessionCookie("adminLinker");
        setUserIdValue(userId)
    }, [])

    return (
        <div>
            {userIdValue !== undefined && <div>{userIdValue}</div>}
            {userIdValue === undefined && <div>{"Not signed in"}</div>}
        </div>
    )
}