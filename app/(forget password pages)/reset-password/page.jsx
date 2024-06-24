"use client"
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    router.push("/login");
    
    return (
        <div>page</div>
    )
}