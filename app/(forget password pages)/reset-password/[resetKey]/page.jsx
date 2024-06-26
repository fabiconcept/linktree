import Link from "next/link";
import { verifyResetKey } from "@/lib/authentication/verifyResetKey";
import ResetPasswordForm from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";

export default async function ResetPasswordPage({ params }) {

    try {
        const [userId, timePassed] = await verifyResetKey(params.resetKey);
        return (
            <>
                <Toaster />
                <ResetPasswordForm user={userId} resetKey={params.resetKey} />
            </>
        );
    } catch (error) {
        if (error.known){
            return (
                <div className="p-8">
                    {error.known} <Link href={"/login"} className="font-semibold text-themeGreen">Go back to login</Link>
                </div>
            );
        }
        return (
            <div className="p-8">
                An error Occured <Link href={"/"} className="font-semibold text-themeGreen">Go to homepage</Link>
            </div>
        );
    }

}