"use client"
import { removeSessionCookie } from '@/lib/authentication/session';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();
    try {
        async function logOff() {
            await removeSessionCookie("adminLinker");
            router.push("/login");
        }
        logOff();
    } catch (error) {
        router.back();
        throw new Error(error);
    }
}
