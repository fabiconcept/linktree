import { removeSessionCookie } from '@/lib/authentication/session';

export default function LogoutPage() {
    try {
        async function logOff() {
            await removeSessionCookie("adminLinker");
            window.location.href = "/login";
        }
        logOff();
    } catch (error) {
        window.history.back();
        throw new Error(error);
    }
}