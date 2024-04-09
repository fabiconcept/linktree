import { Toaster } from "react-hot-toast"
import LoginForm from "./componets/LoginForm"
import SideThing from "@/app/components/General Components/SideThing";

export const generateMetadata = () =>{
    return {
        title: "Link Tree | Login Page",
        description: "Log into your account"
    }
}

export default function LoginPage() {

    return (
        <div className="flex h-screen w-screen">
            <Toaster />
            <LoginForm />
            <SideThing />
        </div>
    )
}