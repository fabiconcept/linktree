"use client"
import { removeSessionCookie } from '@/lib/authentication/session';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect() {
    const router = useRouter();

    useEffect(() => {
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
    }, []);

}