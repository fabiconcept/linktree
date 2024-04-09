import SignUpForm from "./componets/SignupForm"
import SideThing from "@/app/components/General Components/SideThing";
import { Toaster } from "react-hot-toast"

export const generateMetadata = () => {
    return {
        title: "Link Tree | Create an account",
        description: "Register your new account with us"
    }
}

export default function LoginPage() {

    return (
        <div className="flex h-screen w-screen">
            <Toaster />
            <SideThing />
            <SignUpForm />
        </div>
    )
}