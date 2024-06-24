import { verifyResetKey } from "@/lib/authentication/verifyResetKey";

export default async function ResetPasswordPage({ params }) {

    try {
        await verifyResetKey(params.resetKey);
        return (
            <div className="p-8">
                Reset Key:{params.resetKey}
            </div>
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