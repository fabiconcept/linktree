import { verifyResetKey } from "../../../../lib/authentication/verifyResetKey";
import ResetPasswordForm from "./components/ResetPassword";

export default async function ResetPasswordPage({ params }) {

    try {
        const [userId, timePassed] = await verifyResetKey(params.resetKey);
        return (
            <>
                <ResetPasswordForm user={userId} resetKey={params.resetKey} />
            </>
        );
    } catch (error) {
        if (error.known){
            return (
                <div className="p-8">
                    {error.known}
                </div>
            );
        }
    }
    return (
        <div className="p-8">
            An error Occured
        </div>
    );

}